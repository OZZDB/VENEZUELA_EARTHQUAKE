import Database from 'better-sqlite3';
import { resolve } from 'path';
import { existsSync } from 'fs';
import bcrypt from 'bcryptjs';

const DB_PATH = resolve(process.cwd(), 'data', 'ayudave.db');

export function initDatabase() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Tabla de reportes (sincronizada con la app PWA)
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL, -- 'person' | 'damage'
      fields_json TEXT NOT NULL, -- JSON con todos los campos del formulario
      photos_json TEXT, -- JSON array de fotos comprimidas
      status TEXT DEFAULT 'pending', -- 'pending' | 'sent' | 'synced' | 'verified'
      source TEXT DEFAULT 'pwa', -- 'pwa' | 'whatsapp' | 'sms' | 'admin'
      wa_message_id TEXT UNIQUE, -- ID de mensaje de WhatsApp para dedup
      cedula_hash TEXT, -- Hash de cédula para detectar duplicados sin almacenar la real
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      synced_at INTEGER,
      verified_by TEXT,
      verified_at INTEGER
    );
  `);

  // Índices para consultas rápidas
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
    CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
    CREATE INDEX IF NOT EXISTS idx_reports_cedula_hash ON reports(cedula_hash);
    CREATE INDEX IF NOT EXISTS idx_reports_created ON reports(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_reports_wa_msg ON reports(wa_message_id);
  `);

  // Tabla de usuarios admin
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'operator', -- 'operator' | 'supervisor' | 'admin'
      active INTEGER DEFAULT 1,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      last_login INTEGER
    );
  `);

  // Tabla de sesiones/tokens
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token_hash TEXT UNIQUE NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (user_id) REFERENCES admin_users(id)
    );
  `);

  // Tabla de configuración del webhook WhatsApp
  db.exec(`
    CREATE TABLE IF NOT EXISTS wa_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    );
  `);

  // Insertar usuario admin por defecto si no existe
  const defaultUser = db.prepare('SELECT * FROM admin_users WHERE username = ?').get('admin');
  if (!defaultUser) {
    const hash = bcrypt.hashSync('cambiar123', 12);
    db.prepare('INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)')
      .run('admin', hash, 'admin');
    console.log('✅ Usuario admin creado (usuario: admin, pass: cambiar123)');
  }

  // Insertar config WhatsApp por defecto
  const defaults = {
    'verify_token': process.env.WA_VERIFY_TOKEN || 'cambiar_token_verificacion',
    'phone_number_id': process.env.WA_PHONE_NUMBER_ID || '',
    'access_token': process.env.WA_ACCESS_TOKEN || '',
    'app_secret': process.env.WA_APP_SECRET || '',
  };

  const stmt = db.prepare('INSERT OR IGNORE INTO wa_config (key, value) VALUES (?, ?)');
  for (const [k, v] of Object.entries(defaults)) {
    stmt.run(k, v);
  }

  console.log('✅ Base de datos inicializada en:', DB_PATH);
  return db;
}

export function getDb() {
  if (!existsSync(DB_PATH)) {
    return initDatabase();
  }
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}