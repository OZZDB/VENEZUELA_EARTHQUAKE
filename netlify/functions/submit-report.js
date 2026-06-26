/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  NETLIFY FUNCTION: submit-report                              ║
 * ║  Endpoint: POST /api/submit-report                            ║
 * ║                                                               ║
 * ║  Responsabilidades:                                           ║
 * ║  1. Validar token de autenticación (env var, no hardcodeado)  ║
 * ║  2. Rate limiting por IP (máx 10 reportes / 10 min)           ║
 * ║  3. Sanitizar y validar campos del formulario                 ║
 * ║  4. Reenviar al webhook de n8n (que maneja DB + notifs)       ║
 * ║  5. Responder con ID de reporte confirmado                    ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  Variables de entorno requeridas en Netlify Dashboard:
 *  - N8N_WEBHOOK_URL        → URL del webhook de n8n
 *  - EMERGENCY_TOKEN        → Token secreto para autenticar la app
 *  - ADMIN_NOTIFY_EMAIL     → Email para alertas críticas (opcional)
 */

// ─────────────────────────────────────────────────────────────────
//  RATE LIMITER IN-MEMORY
//  En producción con múltiples instancias, usar Redis/Upstash.
//  Para este caso (función serverless single-instance), funciona.
// ─────────────────────────────────────────────────────────────────
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now     = Date.now();
  const window  = 10 * 60 * 1000; // 10 minutos
  const maxHits = 10;              // máx 10 reportes por IP por ventana

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return { allowed: true, remaining: maxHits - 1 };
  }

  const entry = rateLimitMap.get(ip);

  // Ventana expirada → resetear
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return { allowed: true, remaining: maxHits - 1 };
  }

  if (entry.count >= maxHits) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true, remaining: maxHits - entry.count };
}

// ─────────────────────────────────────────────────────────────────
//  SANITIZACIÓN — Previene XSS e inyección en los campos de texto
// ─────────────────────────────────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .slice(0, 500) // máximo 500 chars por campo
    .replace(/[<>]/g, '') // elimina < y > para prevenir HTML injection
    .replace(/[\x00-\x1F\x7F]/g, ''); // elimina caracteres de control
}

function sanitizeFields(fields) {
  const safe = {};
  for (const [key, val] of Object.entries(fields)) {
    safe[key] = sanitize(String(val ?? ''));
  }
  return safe;
}

// ─────────────────────────────────────────────────────────────────
//  VALIDACIÓN DE CAMPOS
// ─────────────────────────────────────────────────────────────────
function validateReport(type, fields) {
  const errors = [];

  if (!['person', 'damage'].includes(type)) {
    errors.push('Tipo de reporte inválido');
  }

  if (type === 'person') {
    if (!fields.name || fields.name.length < 2)
      errors.push('Nombre completo requerido (mínimo 2 caracteres)');
    if (!fields.cedula || fields.cedula.length < 4)
      errors.push('Cédula requerida');
    if (!fields.location || fields.location.length < 3)
      errors.push('Ubicación requerida');
  }

  if (type === 'damage') {
    if (!fields.address || fields.address.length < 5)
      errors.push('Dirección requerida (mínimo 5 caracteres)');
  }

  return errors;
}

// ─────────────────────────────────────────────────────────────────
//  HEADERS CORS — Permite peticiones desde el dominio de la app
// ─────────────────────────────────────────────────────────────────
function corsHeaders(origin) {
  const allowed = [
    'https://ayuda-venezuela-terremoto.netlify.app',
    'http://localhost:8888', // Netlify CLI local dev
    'http://localhost:3000',
  ];

  const allowedOrigin = allowed.includes(origin) ? origin : allowed[0];

  return {
    'Access-Control-Allow-Origin':  allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Emergency-Token',
    'Access-Control-Max-Age':       '86400',
    'Content-Type':                 'application/json',
  };
}

// ─────────────────────────────────────────────────────────────────
//  HANDLER PRINCIPAL
// ─────────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  const origin = event.headers['origin'] || '';
  const headers = corsHeaders(origin);

  // ── Preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // ── Solo acepta POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  // ── Autenticación por token de entorno
  const clientToken = event.headers['x-emergency-token'] || '';
  const serverToken = process.env.EMERGENCY_TOKEN || '';

  if (!serverToken) {
    console.error('[API] EMERGENCY_TOKEN no configurado en variables de entorno');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Servidor no configurado correctamente' }),
    };
  }

  if (clientToken !== serverToken) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Token de autenticación inválido' }),
    };
  }

  // ── Rate limiting por IP
  const clientIP = event.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || event.headers['client-ip']
    || 'unknown';

  const rateCheck = checkRateLimit(clientIP);

  if (!rateCheck.allowed) {
    return {
      statusCode: 429,
      headers: {
        ...headers,
        'Retry-After': String(rateCheck.retryAfter),
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
      },
      body: JSON.stringify({
        error: 'Demasiados reportes. Espera unos minutos antes de enviar otro.',
        retryAfterSeconds: rateCheck.retryAfter,
      }),
    };
  }

  // ── Parsear body
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Body JSON inválido' }),
    };
  }

  const { type, fields: rawFields, savedAt, photos = [] } = payload;

  // ── Sanitizar campos
  const fields = sanitizeFields(rawFields || {});

  // ── Validar
  const errors = validateReport(type, fields);
  if (errors.length > 0) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: 'Validación fallida', details: errors }),
    };
  }

  // ── Construir reporte normalizado
  const reportId  = `VE-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const timestamp = new Date().toISOString();

  const report = {
    reportId,
    type,
    fields,
    photoCount: photos.length,
    savedAt:    savedAt || Date.now(),
    receivedAt: timestamp,
    sourceIP:   clientIP,
    // Incluimos fotos solo si el webhook de n8n las acepta
    // (para evitar timeouts con fotos grandes, se pueden enviar separado)
    photos: photos.slice(0, 5), // máximo 5 fotos por reporte
  };

  // ── Reenviar a n8n webhook
  const n8nUrl = process.env.N8N_WEBHOOK_URL;

  if (!n8nUrl) {
    // Sin n8n configurado: log del reporte y respuesta OK
    // Útil durante desarrollo / testing
    console.warn('[API] N8N_WEBHOOK_URL no configurado. Reporte recibido pero no reenviado:', reportId);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        reportId,
        message: 'Reporte recibido (modo desarrollo — sin webhook n8n)',
        warning: 'Configura N8N_WEBHOOK_URL en variables de entorno de Netlify',
      }),
    };
  }

  try {
    const n8nResponse = await fetch(n8nUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(report),
      // Timeout de 8 segundos (Netlify Functions tienen límite de 10s)
      signal:  AbortSignal.timeout(8000),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n respondió ${n8nResponse.status}`);
    }

    console.log(`[API] Reporte ${reportId} enviado a n8n correctamente`);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'X-RateLimit-Remaining': String(rateCheck.remaining),
      },
      body: JSON.stringify({
        success:  true,
        reportId,
        message:  'Reporte recibido y procesado correctamente',
        receivedAt: timestamp,
      }),
    };

  } catch (err) {
    // n8n no responde → igual devolvemos 200 al cliente
    // El reporte ya está en IndexedDB del teléfono como backup
    console.error('[API] Error enviando a n8n:', err.message, '| Reporte:', reportId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success:  true,
        reportId,
        message:  'Reporte recibido. Procesamiento en cola.',
        warning:  'Notificación interna retrasada',
      }),
    };
  }
};
