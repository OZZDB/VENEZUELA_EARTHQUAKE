/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  NETLIFY FUNCTION: get-stats                                  ║
 * ║  Endpoint: GET /api/get-stats                                 ║
 * ║                                                               ║
 * ║  Devuelve estadísticas del día actual desde Google Sheets     ║
 * ║  (vía n8n) para mostrar el contador real en el home screen.   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  Variables de entorno:
 *  - N8N_STATS_URL  → Webhook de n8n que devuelve el conteo del día
 */

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type':                 'application/json',
  'Cache-Control':                'public, max-age=60', // cache 1 minuto
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  const statsUrl = process.env.N8N_STATS_URL;

  // Sin URL configurada → devolver datos demo
  if (!statsUrl) {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        today:   0,
        total:   0,
        persons: 0,
        damages: 0,
        note:    'Configura N8N_STATS_URL para datos reales',
      }),
    };
  }

  try {
    const res  = await fetch(statsUrl, { signal: AbortSignal.timeout(5000) });
    const data = await res.json();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        today:   data.today   ?? 0,
        total:   data.total   ?? 0,
        persons: data.persons ?? 0,
        damages: data.damages ?? 0,
      }),
    };
  } catch (err) {
    console.error('[get-stats] Error:', err.message);
    return {
      statusCode: 200, // No rompemos la app si las stats fallan
      headers: corsHeaders,
      body: JSON.stringify({ today: 0, total: 0, persons: 0, damages: 0 }),
    };
  }
};
