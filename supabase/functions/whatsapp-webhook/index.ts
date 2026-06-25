import { createClient } from 'npm:@supabase/supabase-js@2';
import { crypto } from 'https://deno.land/std@0.224.0/crypto/mod.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const WA_VERIFY_TOKEN = Deno.env.get('WA_VERIFY_TOKEN')!;
const WA_ACCESS_TOKEN = Deno.env.get('WA_ACCESS_TOKEN')!;
const WA_APP_SECRET = Deno.env.get('WA_APP_SECRET')!;
const EMERGENCY_TOKEN = Deno.env.get('EMERGENCY_TOKEN')!;
const WA_PHONE_NUMBER_ID = Deno.env.get('WA_PHONE_NUMBER_ID')!;

const sb = createClient(SUPABASE_URL, SERVICE_ROLE);

// ─── Helpers ──────────────────────────────────────────────
async function hashCedula(cedula: string) {
  const buf = new TextEncoder().encode(cedula.trim().toUpperCase());
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0,16);
}

async function verifySignature(payload: string, signature: string) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(WA_APP_SECRET),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );
  const sigBytes = Uint8Array.from(signature.match(/.{2}/g)!.map(b => parseInt(b,16)));
  return crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload));
}

function genCaseId() {
  const d = new Date();
  return `VE-${d.getFullYear().toString().slice(-2)}${(d.getMonth()+1).toString().padStart(2,'0')}${d.getDate().toString().padStart(2,'0')}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;
}
// ─── Flujo WhatsApp (estado en memoria simple) ────────────
const sessions = new Map<string, { step: number; data: any; flow: 'person'|'damage' }>();

const FLOW_PERSON = ['name','cedula','age','phone','location','status','desc','confirm'];
const FLOW_DAMAGE = ['type','level','address','trapped','phone','desc','confirm'];

const PROMPTS = {
  start: `🇻🇪 *Ayuda Venezuela - Emergencias*\n\n1️⃣ Persona desaparecida/herida/atrapada\n2️⃣ Daño estructural\n3️⃣ Mis reportes\n\nResponde con el número:`,
  person: {
    name: '📋 *Persona* - Nombre completo:',
    cedula: 'Cédula (ej: V-12345678):',
    age: 'Edad (número, opcional):',
    phone: 'Tel. familiar (+58 412 000 0000):',
    location: 'Última ubicación (o envía 📍 ubicación):',
    status: 'Estado:\n1️⃣ Desaparecido\n2️⃣ Herido\n3️⃣ Atrapado\n4️⃣ Localizado\nNúmero:',
    desc: 'Descripción física (opcional):',
    confirm: (d: any) => `✅ *Confirmar Persona*\nNombre: ${d.name}\nCédula: ${d.cedula}\nEdad: ${d.age||'N/A'}\nTel: ${d.phone||'N/A'}\nUbicación: ${d.location}\nEstado: ${d.status}\nDesc: ${d.desc||'Sin detalles'}\n\n1️⃣ Sí, enviar\n2️⃣ Cancelar`,
  },
  damage: {
    type: '🏗️ *Daño Estructural* - Tipo:\n1️⃣ Edificio\n2️⃣ Puente\n3️⃣ Vialidad\n4️⃣ Vivienda\n5️⃣ Servicio Público\nNúmero:',
    level: 'Nivel:\n1️⃣ Leve\n2️⃣ Moderado\n3️⃣ Grave\n4️⃣ Colapso\nNúmero:',
    address: 'Dirección exacta (o 📍 ubicación):',
    trapped: '¿Personas atrapadas?\n1️⃣ No\n2️⃣ Posiblemente\n3️⃣ Sí, confirmado\nNúmero:',
    phone: 'Tu tel. contacto:',
    desc: 'Describe el daño:',
    confirm: (d: any) => `✅ *Confirmar Daño*\nTipo: ${d.type}\nNivel: ${d.level}\nDirección: ${d.address}\nAtrapados: ${d.trapped}\nTel: ${d.phone||'N/A'}\nDesc: ${d.desc||'Sin detalles'}\n\n1️⃣ Sí, enviar\n2️⃣ Cancelar`,
  },
};

const MAPS = {
  person: { status: ['','desaparecido','herido','atrapado','localizado'] },
  damage: { type: ['','edificio','puente','vialidad','vivienda','servicio'], level: ['','leve','moderado','grave','colapso'], trapped: ['','no','si_desconocido','si_confirmado'] },
};

// ─── Procesamiento en background (no bloquea respuesta a Meta) ───
async function processMessage(payload: any) {
  try {
    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const msg = value?.messages?.[0];
    if (!msg) return;

    const from = msg.from;
    const waMsgId = msg.id;
    let text = msg.text?.body?.trim() || '';
    const isLocation = msg.type === 'location';

    const { data: existing } = await sb.from('reports').select('id').eq('wa_message_id', waMsgId).maybeSingle();
    if (existing) return;

    let sess = sessions.get(from);
    if (!sess) {
      if (['1','2','3','hola','inicio','menu'].includes(text.toLowerCase())) {
        if (text === '1') { sessions.set(from, { step: 0, data: {}, flow: 'person' }); await sendWA(from, PROMPTS.person.name); }
        else if (text === '2') { sessions.set(from, { step: 0, data: {}, flow: 'damage' }); await sendWA(from, PROMPTS.damage.type); }
        else if (text === '3') { await sendMyReports(from); }
        else { await sendWA(from, PROMPTS.start); }
      } else { await sendWA(from, PROMPTS.start); }
      return;
    }

    const flow = sess.flow;
    const currentField = (flow === 'person' ? FLOW_PERSON : FLOW_DAMAGE)[sess.step];

    if (isLocation && (currentField === 'location' || currentField === 'address')) {
      text = `${msg.location.latitude},${msg.location.longitude}`;
    }

    if (currentField === 'confirm') {
      if (text === '1') { await saveReport(from, sess, waMsgId); sessions.delete(from); return; }
      if (text === '2') { sessions.delete(from); await sendWA(from, '❌ Cancelado. Escribe HOLA para empezar.'); return; }
      await sendWA(from, '❌ Opción inválida. 1️⃣ Sí / 2️⃣ No'); return;
    }

    let valueToSave = text;
    if (currentField === 'status') valueToSave = MAPS.person.status[parseInt(text)] || text;
    if (currentField === 'type') valueToSave = MAPS.damage.type[parseInt(text)] || text;
    if (currentField === 'level') valueToSave = MAPS.damage.level[parseInt(text)] || text;
    if (currentField === 'trapped') valueToSave = MAPS.damage.trapped[parseInt(text)] || text;

    sess.data[currentField] = valueToSave;
    sess.step++;

    const nextField = (flow === 'person' ? FLOW_PERSON : FLOW_DAMAGE)[sess.step];
    if (nextField === 'confirm') {
      await sendWA(from, PROMPTS[flow].confirm(sess.data));
    } else {
      await sendWA(from, PROMPTS[flow][nextField]);
    }
  } catch (e) {
    console.error('processMessage error:', e);
  }
}

async function saveReport(from: string, sess: any, waMsgId: string) {
  const { data, error } = await sb.from('reports').insert({
    type: sess.flow,
    fields_json: sess.data,
    source: 'whatsapp',
    wa_message_id: waMsgId,
    cedula_hash: sess.data.cedula ? await hashCedula(sess.data.cedula) : null,
    status: 'sent',
  }).select('case_id').single();

  if (error) { await sendWA(from, '❌ Error guardando. Intenta de nuevo.'); return; }
  await sendWA(from, `✅ *Reporte enviado*\nCaso: *${data.case_id}*\nProtección Civil lo recibirá.`);
}

async function sendMyReports(from: string) {
  const { data } = await sb.from('reports_dashboard').select('case_id,type,fields_json,status,created_at').eq('wa_message_id', from).limit(5);
  if (!data?.length) { await sendWA(from, '📭 Sin reportes.'); return; }
  let txt = '📋 *Tus reportes:*\n\n';
  data.forEach(r => { txt += `• ${r.case_id} - ${r.type} - ${r.status}\n`; });
  await sendWA(from, txt);
}

async function sendWA(to: string, body: string) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);
  try {
    await fetch(`https://graph.facebook.com/v20.0/${WA_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } }),
      signal: controller.signal,
    });
  } catch (e) { console.error('sendWA failed:', e); }
  finally { clearTimeout(t); }
}

// ─── Handler principal ────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    if (url.searchParams.get('hub.verify_token') === WA_VERIFY_TOKEN) {
      return new Response(url.searchParams.get('hub.challenge'), { status: 200 });
    }
    return new Response('Forbidden', { status: 403 });
  }

  if (req.method === 'POST') {
    const signature = req.headers.get('x-hub-signature-256')?.replace('sha256=','');
    const body = await req.text();
    
    if (signature && !(await verifySignature(body, signature))) {
      return new Response('Invalid signature', { status: 401 });
    }

    const payload = JSON.parse(body);
    
    // ACK INMEDIATO a Meta (evita timeout y reintentos)
    processMessage(payload).catch(console.error);
    
    return new Response('OK', { status: 200 });
  }

  return new Response('Method not allowed', { status: 405 });
});
