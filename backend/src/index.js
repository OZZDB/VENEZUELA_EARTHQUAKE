import 'dotenv/config';
import crypto from 'crypto';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getDb, initDatabase } from './db/init.js';
import { BOT_RESPONSES, FLOW_STEPS } from './wa/schemas.js';
import { generateCaseId, hashCedula, parseCompactSMS } from './wa/utils.js';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-change-me';
const EMERGENCY_TOKEN = process.env.EMERGENCY_TOKEN || '';
const UPLOAD_DIR = resolve(process.cwd(), 'uploads', 'reports');
const MAX_PHOTOS = Number(process.env.MAX_REPORT_PHOTOS || 6);
const MAX_PHOTO_SIZE = Number(process.env.MAX_PHOTO_SIZE || 2 * 1024 * 1024);

mkdirSync(UPLOAD_DIR, { recursive: true });
initDatabase();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PHOTO_SIZE, files: MAX_PHOTOS },
});

app.set('trust proxy', 1);
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({
  limit: '1mb',
  verify: (req, _res, buf) => {
    req.rawBody = buf.toString('utf8');
  },
}));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(resolve(process.cwd(), 'uploads')));
app.use(express.static(resolve(process.cwd(), '..')));

const apiLimiter = rateLimit({
  windowMs: 60_000,
  max: Number(process.env.RATE_LIMIT_PER_MINUTE || 120),
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60_000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const waSessions = new Map();

app.use('/v1', apiLimiter);

function nowMs() {
  return Date.now();
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function normalizeCitizenId(value) {
  const raw = String(value || '').trim().toUpperCase();
  const digits = raw.replace(/\D/g, '');
  if (!digits) return null;

  const isPassport = raw.startsWith('P') || digits.length === 9;
  const max = isPassport ? 9 : 8;
  if (digits.length > max) return null;

  return { raw, digits, kind: isPassport ? 'passport' : 'cedula' };
}

function requireEmergencyToken(req, res, next) {
  if (!EMERGENCY_TOKEN) return next();
  if (req.get('X-Emergency-Token') === EMERGENCY_TOKEN) return next();
  return res.status(401).json({ error: 'invalid_emergency_token' });
}

function signAdminToken(user) {
  return jwt.sign(
    { sub: String(user.id), username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' },
  );
}

function requireAdmin(req, res, next) {
  const header = req.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'missing_token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const session = getDb().prepare(`
      SELECT s.*, u.username, u.role, u.active
      FROM sessions s
      JOIN admin_users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND s.expires_at > ?
    `).get(sha256(token), nowMs());

    if (!session || !session.active) return res.status(401).json({ error: 'invalid_session' });
    req.user = { id: Number(payload.sub), username: session.username, role: session.role };
    return next();
  } catch {
    return res.status(401).json({ error: 'invalid_token' });
  }
}

function parseReportData(req) {
  const type = String(req.body.type || '').trim();
  if (!['person', 'damage'].includes(type)) {
    const err = new Error('type must be person or damage');
    err.status = 400;
    throw err;
  }

  let fields = req.body.data || req.body.fields || {};
  if (typeof fields === 'string') {
    try {
      fields = JSON.parse(fields);
    } catch {
      const err = new Error('data must be valid JSON');
      err.status = 400;
      throw err;
    }
  }

  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    const err = new Error('data must be an object');
    err.status = 400;
    throw err;
  }

  if (type === 'person') {
    const id = normalizeCitizenId(fields.cedula || fields.identification || fields.passport);
    if (!id) {
      const err = new Error('cedula/passport must contain up to 8 digits for cedula or up to 9 digits for passport');
      err.status = 400;
      throw err;
    }
    fields.identificationKind = id.kind;
    fields.identificationDigits = id.digits;
  }

  return { type, fields };
}

function persistPhotos(files, caseId) {
  if (!files?.length) return [];
  const dir = resolve(UPLOAD_DIR, caseId);
  mkdirSync(dir, { recursive: true });

  return files.map((file, index) => {
    const ext = extensionForMime(file.mimetype);
    const name = `photo_${index + 1}${ext}`;
    const path = resolve(dir, name);
    writeFileSync(path, file.buffer);
    return {
      name,
      mime: file.mimetype,
      size: file.size,
      url: `/uploads/reports/${caseId}/${name}`,
    };
  });
}

function extensionForMime(mime) {
  if (mime === 'image/png') return '.png';
  if (mime === 'image/jpeg') return '.jpg';
  if (mime === 'image/webp') return '.webp';
  return '.bin';
}

function insertReport({ type, fields, photos = [], status = 'sent', source = 'pwa', waMessageId = null, caseId = generateCaseId() }) {
  const timestamp = nowMs();
  const citizenId = normalizeCitizenId(fields.cedula || fields.identification || fields.passport);
  const cedulaHash = citizenId ? hashCedula(citizenId.digits) : null;

  getDb().prepare(`
    INSERT INTO reports (
      type, fields_json, photos_json, status, source, wa_message_id,
      cedula_hash, case_id, created_at, updated_at, synced_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    type,
    JSON.stringify(fields),
    JSON.stringify(photos),
    status,
    source,
    waMessageId,
    cedulaHash,
    caseId,
    timestamp,
    timestamp,
    status === 'sent' || status === 'synced' ? timestamp : null,
  );

  return { caseId, cedulaHash };
}

function rowToReport(row) {
  const fields = safeJson(row.fields_json, {});
  return {
    id: row.id,
    caseId: row.case_id,
    type: row.type,
    fields,
    photos: safeJson(row.photos_json, []),
    status: row.status,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncedAt: row.synced_at,
    verifiedBy: row.verified_by,
    verifiedAt: row.verified_at,
    priority: reportPriority(row.type, fields),
  };
}

function safeJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function reportPriority(type, fields) {
  if (fields.trapped === 'si_confirmado' && fields.damageLevel === 'colapso') return 1;
  if (fields.trapped === 'si_confirmado') return 2;
  if (fields.damageLevel === 'colapso' && ['vialidad', 'puente'].includes(fields.structureType)) return 3;
  if (fields.damageLevel === 'grave' && fields.trapped === 'si_desconocido') return 4;
  if (type === 'person' && ['herido', 'atrapado'].includes(fields.status)) return 5;
  return 10;
}

function verifyWhatsAppSignature(req) {
  const appSecret = process.env.WA_APP_SECRET || '';
  const signature = req.get('x-hub-signature-256')?.replace('sha256=', '');
  if (!appSecret || !signature || !req.rawBody) return true;

  const expected = crypto.createHmac('sha256', appSecret).update(req.rawBody).digest('hex');
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function sendWhatsApp(to, body) {
  const phoneId = process.env.WA_PHONE_NUMBER_ID;
  const token = process.env.WA_ACCESS_TOKEN;
  if (!phoneId || !token) {
    console.log('[wa] Missing WA_PHONE_NUMBER_ID or WA_ACCESS_TOKEN; response skipped:', body);
    return;
  }

  await axios.post(
    `https://graph.facebook.com/v20.0/${phoneId}/messages`,
    { messaging_product: 'whatsapp', to, type: 'text', text: { body } },
    { headers: { Authorization: `Bearer ${token}` }, timeout: 8000 },
  );
}

async function processWhatsAppPayload(payload) {
  const value = payload.entry?.[0]?.changes?.[0]?.value;
  const msg = value?.messages?.[0];
  if (!msg) return;

  const from = msg.from;
  const waMessageId = msg.id;
  let text = msg.text?.body?.trim() || '';
  const lower = text.toLowerCase();

  const duplicate = getDb().prepare('SELECT id FROM reports WHERE wa_message_id = ?').get(waMessageId);
  if (duplicate) return;

  let session = waSessions.get(from);
  if (!session) {
    if (lower === '1') {
      waSessions.set(from, { flow: 'person', step: 0, data: {} });
      await sendWhatsApp(from, BOT_RESPONSES.ASK_PERSON_NAME);
      return;
    }
    if (lower === '2') {
      waSessions.set(from, { flow: 'damage', step: 0, data: {} });
      await sendWhatsApp(from, BOT_RESPONSES.ASK_DAMAGE_TYPE);
      return;
    }
    if (lower === '3') {
      await sendMyWhatsAppReports(from);
      return;
    }
    await sendWhatsApp(from, BOT_RESPONSES.WELCOME);
    return;
  }

  const steps = session.flow === 'person' ? FLOW_STEPS.PERSON : FLOW_STEPS.DAMAGE;
  const current = steps[session.step];
  if ((current === 'location' || current === 'address') && msg.location) {
    text = `${msg.location.latitude},${msg.location.longitude}`;
  }

  if (current === 'confirm') {
    if (text === '2') {
      waSessions.delete(from);
      await sendWhatsApp(from, BOT_RESPONSES.CANCELLED);
      return;
    }
    if (text !== '1') {
      await sendWhatsApp(from, BOT_RESPONSES.INVALID_OPTION);
      return;
    }

    const { caseId } = insertReport({
      type: session.flow,
      fields: { ...session.data, waFrom: from },
      status: 'sent',
      source: 'whatsapp',
      waMessageId,
    });
    waSessions.delete(from);
    await sendWhatsApp(from, BOT_RESPONSES.SUCCESS.replace('{caseId}', caseId));
    return;
  }

  const normalized = normalizeWhatsAppAnswer(session.flow, current, text);
  if (session.flow === 'person' && current === 'cedula' && !normalizeCitizenId(normalized)) {
    await sendWhatsApp(from, 'Identificacion invalida. Cedula: maximo 8 digitos. Pasaporte: maximo 9 digitos.');
    return;
  }

  session.data[current] = normalized;
  session.step += 1;
  const next = steps[session.step];
  await sendWhatsApp(from, nextPrompt(session.flow, next, session.data));
}

function normalizeWhatsAppAnswer(flow, field, text) {
  const maps = {
    person: { status: ['', 'desaparecido', 'herido', 'atrapado', 'localizado'] },
    damage: {
      type: ['', 'edificio', 'puente', 'vialidad', 'vivienda', 'servicio_publico'],
      level: ['', 'leve', 'moderado', 'grave', 'colapso'],
      trapped: ['', 'no', 'si_desconocido', 'si_confirmado'],
    },
  };
  const value = maps[flow]?.[field]?.[Number.parseInt(text, 10)];
  return value || text;
}

function nextPrompt(flow, next, data) {
  if (flow === 'person') {
    const prompts = {
      name: BOT_RESPONSES.ASK_PERSON_NAME,
      cedula: BOT_RESPONSES.ASK_PERSON_CEDULA,
      age: BOT_RESPONSES.ASK_PERSON_AGE,
      phone: BOT_RESPONSES.ASK_PERSON_PHONE,
      location: BOT_RESPONSES.ASK_PERSON_LOCATION,
      status: BOT_RESPONSES.ASK_PERSON_STATUS,
      desc: BOT_RESPONSES.ASK_PERSON_DESC,
      confirm: BOT_RESPONSES.CONFIRM_PERSON(data),
    };
    return prompts[next];
  }

  const prompts = {
    type: BOT_RESPONSES.ASK_DAMAGE_TYPE,
    level: BOT_RESPONSES.ASK_DAMAGE_LEVEL,
    address: BOT_RESPONSES.ASK_DAMAGE_ADDRESS,
    trapped: BOT_RESPONSES.ASK_DAMAGE_TRAPPED,
    phone: BOT_RESPONSES.ASK_DAMAGE_PHONE,
    desc: BOT_RESPONSES.ASK_DAMAGE_DESC,
    confirm: BOT_RESPONSES.CONFIRM_DAMAGE(data),
  };
  return prompts[next];
}

async function sendMyWhatsAppReports(from) {
  const rows = getDb().prepare(`
    SELECT case_id, type, status, created_at
    FROM reports
    WHERE fields_json LIKE ?
    ORDER BY created_at DESC
    LIMIT 5
  `).all(`%"waFrom":"${from}"%`);

  if (!rows.length) {
    await sendWhatsApp(from, BOT_RESPONSES.MY_REPORTS_EMPTY);
    return;
  }

  const body = rows.reduce(
    (text, row) => `${text}- ${row.case_id} - ${row.type} - ${row.status}\n`,
    BOT_RESPONSES.MY_REPORTS_HEADER,
  );
  await sendWhatsApp(from, body);
}

app.get(['/health', '/v1/health'], (_req, res) => {
  res.json({ ok: true, service: 'ayuda-ve-backend', time: new Date().toISOString() });
});

app.post('/v1/reports', requireEmergencyToken, upload.any(), (req, res, next) => {
  try {
    const { type, fields } = parseReportData(req);
    const caseId = generateCaseId();
    const photos = persistPhotos(req.files || [], caseId);
    insertReport({ type, fields, photos, status: 'sent', source: 'pwa', caseId });
    res.status(201).json({ ok: true, id: caseId, caseId, status: 'sent', photos });
  } catch (err) {
    next(err);
  }
});

app.get('/v1/reports/:caseId', (req, res) => {
  const row = getDb().prepare('SELECT * FROM reports WHERE case_id = ?').get(req.params.caseId);
  if (!row) return res.status(404).json({ error: 'not_found' });
  return res.json(rowToReport(row));
});

app.post('/v1/sms', requireEmergencyToken, (req, res) => {
  const text = String(req.body.text || req.body.message || '');
  const parsed = parseCompactSMS(text);
  if (!parsed) return res.status(400).json({ error: 'invalid_sms_format' });

  const { caseId } = insertReport({
    type: 'damage',
    fields: {
      structureType: parsed.tipo,
      damageLevel: parsed.gravedad,
      address: parsed.loc,
      reporterPhone: parsed.tlf,
      rawSms: text,
    },
    status: 'sent',
    source: 'sms',
  });
  res.status(201).json({ ok: true, caseId });
});

app.post('/v1/admin/login', authLimiter, (req, res) => {
  const { username, password } = req.body || {};
  const user = getDb().prepare('SELECT * FROM admin_users WHERE username = ? AND active = 1').get(username);
  if (!user || !bcrypt.compareSync(String(password || ''), user.password_hash)) {
    return res.status(401).json({ error: 'invalid_credentials' });
  }

  const token = signAdminToken(user);
  const expiresAt = nowMs() + 8 * 60 * 60 * 1000;
  const db = getDb();
  db.prepare('INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)')
    .run(user.id, sha256(token), expiresAt);
  db.prepare('UPDATE admin_users SET last_login = ? WHERE id = ?').run(nowMs(), user.id);
  return res.json({ token, expiresAt, user: { username: user.username, role: user.role } });
});

app.get('/v1/admin/reports', requireAdmin, (req, res) => {
  const status = req.query.status ? String(req.query.status) : null;
  const type = req.query.type ? String(req.query.type) : null;
  const limit = Math.min(Number(req.query.limit || 100), 500);
  const clauses = [];
  const params = [];

  if (status) { clauses.push('status = ?'); params.push(status); }
  if (type) { clauses.push('type = ?'); params.push(type); }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = getDb().prepare(`
    SELECT * FROM reports
    ${where}
    ORDER BY created_at DESC
    LIMIT ?
  `).all(...params, limit);

  res.json({ reports: rows.map(rowToReport).sort((a, b) => a.priority - b.priority || b.createdAt - a.createdAt) });
});

app.get('/v1/admin/stats', requireAdmin, (_req, res) => {
  const db = getDb();
  const byStatus = db.prepare('SELECT status, COUNT(*) as count FROM reports GROUP BY status').all();
  const byType = db.prepare('SELECT type, COUNT(*) as count FROM reports GROUP BY type').all();
  const total = db.prepare('SELECT COUNT(*) as count FROM reports').get().count;
  res.json({ total, byStatus, byType });
});

app.patch('/v1/admin/reports/:caseId', requireAdmin, (req, res) => {
  const allowed = ['pending', 'sent', 'synced', 'verified'];
  const status = String(req.body.status || '');
  if (!allowed.includes(status)) return res.status(400).json({ error: 'invalid_status' });

  const timestamp = nowMs();
  const info = getDb().prepare(`
    UPDATE reports
    SET status = ?, updated_at = ?, verified_by = ?, verified_at = ?
    WHERE case_id = ?
  `).run(status, timestamp, req.user.username, status === 'verified' ? timestamp : null, req.params.caseId);

  if (!info.changes) return res.status(404).json({ error: 'not_found' });
  const row = getDb().prepare('SELECT * FROM reports WHERE case_id = ?').get(req.params.caseId);
  return res.json(rowToReport(row));
});

app.get('/webhooks/whatsapp', (req, res) => {
  const verifyToken = process.env.WA_VERIFY_TOKEN || 'cambiar_token_verificacion';
  if (req.query['hub.verify_token'] !== verifyToken) return res.status(403).send('Forbidden');
  return res.status(200).send(req.query['hub.challenge'] || '');
});

app.post('/webhooks/whatsapp', async (req, res) => {
  if (!verifyWhatsAppSignature(req)) return res.status(401).send('Invalid signature');
  res.status(200).send('OK');
  processWhatsAppPayload(req.body).catch(err => console.error('[wa] process error:', err));
});

app.get('*', (_req, res) => {
  res.sendFile(resolve(process.cwd(), '..', 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'internal_error' });
});

app.listen(PORT, HOST, () => {
  console.log(`Ayuda VE backend escuchando en http://${HOST}:${PORT}`);
});
