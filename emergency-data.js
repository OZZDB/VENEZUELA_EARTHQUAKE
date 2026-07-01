/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — Emergency Data v4.0                        ║
 * ║  7 días después del terremoto — 30 junio 2026                 ║
 * ║  Fuentes: FUNVISIS · MPPS · Cruz Roja · Cáritas · SOUTHCOM   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
'use strict';

const EMERGENCY_DATA = {
  generated_at: "2026-06-30T21:20:00-04:00",
  event:        "Terremoto Venezuela — 24 junio 2026",
  days_elapsed: 7,
  epicenter:    "Yaracuy (M 7.2 y M 7.5)",
  status: {
    sismicity:                   "active_monitoring",
    humanitarian_response:       "active_extended",
    health_response:             "reinforced",
    international_military_support: "deployed",
    risk_level:                  "elevated",
  },

  // ── CIFRAS OFICIALES ─────────────────────────────────────────
  official_stats: {
    injured:           3150,
    attended:          12049,
    hospitals_affected: 38,
    filiales_cruz_roja: 41,
    us_personnel_inside: 900,
    us_personnel_hubs:   800,
    ifrc_appeal_chf:     50000000,
    source:   "MPPS / Cruz Roja IFRC / SOUTHCOM — 27–30 jun 2026",
  },

  // ── CONTACTOS NACIONALES ─────────────────────────────────────
  national: [
    { org: "Emergencias",                         phone: "911",            type: "emergency" },
    { org: "Emergencias",                         phone: "171",            type: "emergency" },
    { org: "Protección Civil",                    phone: "0800-558.84.27", type: "civil"     },
    { org: "Protección Civil",                    phone: "0800-266.84.46", type: "civil"     },
    { org: "Protección Civil",                    phone: "0800-262.43.68", type: "civil"     },
    { org: "FUNVISIS",                            phone: "0800-836.25.67", type: "seismic"   },
    { org: "Cruz Roja — Caracas",                 phone: "0212-571.47.13", type: "redcross"  },
    { org: "Cruz Roja — Caracas",                 phone: "0212-578.25.16", type: "redcross"  },
    { org: "Cruz Roja — Caracas",                 phone: "0212-571.24.11", type: "redcross"  },
    { org: "Gas Directo",                         phone: "0212-708.13.14", type: "utility"   },
    { org: "TAP Telemedicina",                    phone: "0212-822.12.62", type: "medical"   },
    { org: "Cáritas Venezuela — Acopio Nacional", phone: null,             type: "civil",
      url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/" },
  ],

  // ── COMUNICADOS OFICIALES (5 fuentes) ───────────────────────
  official_updates: [
    {
      source:  "FUNVISIS",
      date:    "2026-06-29",
      badge:   "📡 Monitoreo activo",
      title:   "Secuencia sísmica activa — réplicas en occidente",
      summary: "25 eventos M 1.9–4.5 en Portuguesa, Trujillo y Lara. Monitoreo permanente. Consultar canales oficiales FUNVISIS.",
      type:    "seismic",
      source_url: "http://www.funvisis.gob.ve/noticias.php",
    },
    {
      source:  "MPPS",
      date:    "2026-06-27",
      badge:   "🏥 Balance sanitario oficial",
      title:   "3.150 heridos · 12.049 atendidos · 38 hospitales afectados",
      summary: "Despliegue sanitario ampliado en todo el territorio nacional. Red hospitalaria reforzada.",
      type:    "medical",
      source_url: "https://mpps.gob.ve/balance-oficial-destaca-despliegue-sanitario-y-acciones-de-rescate-ante-contingencia-nacional/",
    },
    {
      source:  "Cruz Roja / IFRC",
      date:    "2026-06-30",
      badge:   "🏥 Respuesta extendida 24 meses",
      title:   "Hospitales campaña + llamamiento CHF 50M + 41 filiales",
      summary: "Cruz Roja Española y Finlandesa con hospitales de campaña en La Guaira. Respuesta planificada por 24 meses. IFRC moviliza CHF 50 millones.",
      type:    "medical",
      source_url: "https://cruzroja.ve/informate/",
    },
    {
      source:  "Cáritas Venezuela",
      date:    "2026-06-27",
      badge:   "📦 Acopio nacional activo",
      title:   "Centro de acopio en Montalbán — agua, alimentos, medicinas",
      summary: "Sede Conferencia Episcopal, Montalbán. Donaciones centralizadas. Posibles centros diocesanos adicionales.",
      type:    "civil",
      source_url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/",
    },
    {
      source:  "SOUTHCOM / EE.UU.",
      date:    "2026-06-30",
      badge:   "🛡 Apoyo militar-humanitario",
      title:   "900 efectivos desplegados + C-17, C-130, USS Fort Lauderdale",
      summary: "Operación de alivio no permanente: SAR, logística aérea, reapertura aeropuerto, drones MQ-9 para evaluación de daños. ~800 adicionales en Puerto Rico y Curazao.",
      type:    "international",
      source_url: "https://www.southcom.mil/Media/Special-Coverage/US-Military-Support-to-Venezuela-Earthquake-Relief/",
    },
  ],

  // ── APOYO INTERNACIONAL ──────────────────────────────────────
  international_support: [
    {
      org:    "EE.UU. / SOUTHCOM",
      type:   "Militar-humanitario",
      assets: ["C-17 Globemaster", "C-130 Hercules", "USS Fort Lauderdale", "USS Billings", "MQ-9 Reaper", "Imágenes satelitales"],
      actions:["SAR", "Logística aérea", "Reapertura aeropuerto", "Evaluación de daños"],
      personnel: "900 dentro de VE + 800 en hubs del Caribe",
      status: "Operación de alivio no permanente",
    },
    {
      org:    "Cruz Roja Española",
      type:   "Hospital de campaña",
      assets: ["Hospital de campaña móvil"],
      actions:["Atención médica de emergencia", "Cirugía de trauma"],
      personnel: "Equipo médico especializado",
      status: "Desplegado en La Guaira",
    },
    {
      org:    "Cruz Roja Finlandesa",
      type:   "Hospital de campaña",
      assets: ["Hospital de campaña móvil"],
      actions:["Atención médica", "Apoyo psicosocial"],
      personnel: "Equipo médico especializado",
      status: "Desplegado en La Guaira",
    },
  ],

  // ── MAPAS COLABORATIVOS ──────────────────────────────────────
  collaborative_maps: [
    { name: "VE Earthquake Response Hub", url: "https://vzla-response-hub.vercel.app",          desc: "Mapa interactivo de zonas afectadas" },
    { name: "SOS Venezuela 2026",         url: "https://sosvenezuela2026.com",                   desc: "Mapa colaborativo ciudadano" },
    { name: "Ayuda Venezuela — Acopio",   url: "https://ayudavenezuela.app/acopio",              desc: "Centros de acopio verificados" },
    { name: "Hero Venezuela",             url: "https://herovenezuela.com/es/mapa-acopios.php",  desc: "Voluntarios y acopios" },
    { name: "Cáritas Venezuela",          url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/", desc: "Acopio Montalbán" },
    { name: "FUNVISIS Monitor",           url: "http://www.funvisis.gob.ve/monitor.html",        desc: "Tablero sísmico en tiempo real" },
  ],

  // ── REGIONES (14 + nacional-humanitario) ─────────────────────
  regions: [
    {
      slug: "yaracuy", name: "Yaracuy", subname: "San Felipe — Zona Epicentral",
      priority: "critica", last_updated: "2026-06-30",
      contacts: [{ org: "Protección Civil Yaracuy", phone: "0254-231.66.55" }],
      machinery: ["Excavadoras (2–4)", "Retroexcavadoras (2)", "Motosierras", "Generadores", "Camiones para escombros"],
      sar: [{ type: "SAR colapso estructural", priority: "muy alta" }, { type: "Equipos K9 (3–5)", priority: "muy alta" }, { type: "Extracción pesada", priority: "alta" }],
      medical: ["Kits de trauma", "Férulas para fracturas", "Analgesia IV", "Sueros IV", "Antibióticos IV"],
      seismic_alert: { active: true, events: 25, range: "M 1.9–4.5", note: "Réplicas activas. Mantener alerta.", source: "FUNVISIS" },
    },
    {
      slug: "la-guaira", name: "La Guaira", subname: "Macuto, Catia La Mar, Maiquetía",
      priority: "critica", last_updated: "2026-06-30",
      contacts: [
        { org: "Protección Civil La Guaira", phone: "0212-331.16.11" },
        { org: "Protección Civil La Guaira", phone: "0424-207.53.35" },
      ],
      machinery: ["Excavadoras hidráulicas (3+)", "Retroexcavadoras (2–3)", "Plantas eléctricas portátiles", "Motosierras", "Herramientas de corte"],
      sar: [{ type: "SAR urbano", priority: "alta" }, { type: "K9 (3–5)", priority: "alta" }, { type: "Especialistas colapso estructural", priority: "alta" }, { type: "Apuntalamiento", priority: "alta" }],
      medical: ["✅ Hospital campaña — Cruz Roja Española", "✅ Hospital campaña — Cruz Roja Finlandesa", "Kits trauma", "Antibióticos IV", "Fluidos IV", "Oxígeno portátil"],
      hospitals_campaign: [
        { org: "Cruz Roja Española",   status: "Activo", date: "2026-06-26" },
        { org: "Cruz Roja Finlandesa", status: "Activo", date: "2026-06-26" },
      ],
    },
    {
      slug: "distrito-capital", name: "Distrito Capital", subname: "Gran Caracas",
      priority: "alta", last_updated: "2026-06-30",
      contacts: [
        { org: "Bomberos DC",          phone: "0212-545.74.11" },
        { org: "Protección Civil DC",  phone: "0212-481.92.91" },
      ],
      acopio_points: [{ name: "Cáritas Venezuela — Sede Nacional", address: "Conferencia Episcopal, Montalbán, Caracas", items: ["Agua", "Alimentos no perecederos", "Medicinas esenciales"] }],
      machinery: ["Generadores para hospitales", "Camillas y extracción ligera", "Vehículos 4×4", "Bombas de achique"],
      sar: [{ type: "SAR urbano", priority: "alta" }, { type: "K9 (2–4)", priority: "alta" }, { type: "Iluminación nocturna", priority: "alta" }],
      medical: ["Kits trauma", "Suturas y hemostáticos", "Fluidos IV", "Material de inmovilización", "Antitetánico"],
    },
    {
      slug: "miranda", name: "Miranda", subname: "Valles del Tuy y zonas residenciales",
      priority: "alta", last_updated: "2026-06-30",
      contacts: [
        { org: "Protección Civil Miranda", phone: "0212-379.92.92" },
        { org: "Bomberos del Este",        phone: "0212-242.04.11" },
      ],
      machinery: ["Retroexcavadoras (1–2)", "Camiones volquete", "Motosierras", "Generadores pequeños"],
      sar: [{ type: "Rescatistas urbanos", priority: "alta" }, { type: "K9 (1–2)", priority: "media" }, { type: "Especialistas estructuras colapsadas", priority: "media" }],
      medical: ["Kits trauma", "Analgesia", "Antibióticos", "Sueros IV"],
    },
    {
      slug: "aragua", name: "Aragua", subname: "Maracay y zonas costeras interiores",
      priority: "alta", last_updated: "2026-06-30",
      contacts: [
        { org: "Bomberos Maracay",        phone: "0243-233.20.20" },
        { org: "Protección Civil Aragua", phone: "0243-554.13.13" },
      ],
      machinery: ["Excavadoras pequeñas (1–2)", "Herramientas manuales de remoción", "Plantas eléctricas"],
      sar: [{ type: "SAR urbano", priority: "alta" }, { type: "Apuntalamiento estructural", priority: "media" }, { type: "K9 (1–2)", priority: "media" }],
      medical: ["Triage", "Analgesia", "Suturas", "Sueros IV"],
    },
    {
      slug: "carabobo", name: "Carabobo", subname: "Valencia, Puerto Cabello",
      priority: "alta", last_updated: "2026-06-30",
      contacts: [
        { org: "Bomberos Valencia",         phone: "0241-857.85.85" },
        { org: "Protección Civil Carabobo", phone: "0241-823.83.83" },
        { org: "Bomberos Puerto Cabello",   phone: "0242-361.36.36" },
      ],
      machinery: ["Retroexcavadoras (2)", "Grúas pequeñas (1–2)", "Generadores", "Motosierras"],
      sar: [{ type: "SAR urbano", priority: "alta" }, { type: "Especialistas portuarios", priority: "media" }, { type: "K9 (1–2)", priority: "media" }],
      medical: ["Kits trauma", "Antibióticos", "Sueros IV", "Vendas estériles"],
    },
    {
      slug: "portuguesa", name: "Portuguesa", subname: "Corredor sísmico occidental",
      priority: "alta", last_updated: "2026-06-30",
      contacts: [],
      machinery: ["Evaluación estructural", "Generadores", "Remoción ligera"],
      sar: [{ type: "SAR preventivo en standby", priority: "media" }, { type: "Evaluación estructural rápida", priority: "alta" }],
      medical: ["Primeros auxilios", "Triage"],
      seismic_alert: { active: true, events: 25, range: "M 1.9–4.5", note: "Secuencia sísmica activa. Seguir canales FUNVISIS.", source: "FUNVISIS" },
    },
    {
      slug: "lara", name: "Lara", subname: "Corredor sísmico occidental",
      priority: "alta", last_updated: "2026-06-30",
      contacts: [],
      machinery: ["Evaluación estructural", "Generadores", "Remoción ligera"],
      sar: [{ type: "SAR preventivo", priority: "media" }, { type: "Técnicos de estructuras", priority: "alta" }, { type: "K9", priority: "media" }],
      medical: ["Triage", "Kits trauma"],
      seismic_alert: { active: true, events: 25, range: "M 1.9–4.5", note: "Secuencia sísmica activa. Seguir canales FUNVISIS.", source: "FUNVISIS" },
    },
    {
      slug: "trujillo", name: "Trujillo", subname: "",
      priority: "media", last_updated: "2026-06-30",
      contacts: [{ org: "Protección Civil Trujillo", phone: "0272-236.20.20" }],
      machinery: ["Equipos de remoción", "Generadores", "Motosierras"],
      sar: [{ type: "SAR urbano", priority: "media" }, { type: "Técnicos estructuras", priority: "media" }],
      medical: ["Kits primeros auxilios", "Suturas", "Sueros IV"],
      seismic_alert: { active: true, events: 25, range: "M 1.9–4.5", note: "Zona del corredor sísmico activo.", source: "FUNVISIS" },
    },
    {
      slug: "merida", name: "Mérida", subname: "",
      priority: "media", last_updated: "2026-06-30",
      contacts: [
        { org: "Protección Civil Mérida", phone: "0274-244.64.34" },
        { org: "Protección Civil Mérida", phone: "0800-726.37.43" },
      ],
      machinery: ["Excavadoras pequeñas", "Plantas eléctricas", "Herramientas manuales"],
      sar: [{ type: "SAR local", priority: "media" }, { type: "Técnicos evacuación", priority: "media" }],
      medical: ["Triage", "Analgesia", "Sueros IV"],
    },
    {
      slug: "falcon", name: "Falcón", subname: "Zonas costeras",
      priority: "media", last_updated: "2026-06-30",
      contacts: [],
      machinery: ["Camiones volquete", "Excavadoras ligeras", "Generadores"],
      sar: [{ type: "SAR costero", priority: "media" }, { type: "K9 (1–2)", priority: "media" }],
      medical: ["Primeros auxilios", "Antibióticos", "Sueros IV"],
    },
    {
      slug: "zulia", name: "Zulia", subname: "",
      priority: "media", last_updated: "2026-06-30",
      contacts: [],
      machinery: ["Generadores", "Evaluación infraestructura", "Remoción"],
      sar: [{ type: "SAR local", priority: "media" }, { type: "K9", priority: "media" }],
      medical: ["Triage", "Oxígeno"],
    },
    {
      slug: "sucre", name: "Sucre", subname: "",
      priority: "media", last_updated: "2026-06-30",
      contacts: [],
      machinery: ["Generadores", "Evaluación", "Remoción ligera"],
      sar: [{ type: "SAR preventivo", priority: "media" }],
      medical: ["Primeros auxilios"],
    },
    {
      slug: "cojedes", name: "Cojedes", subname: "",
      priority: "media", last_updated: "2026-06-30",
      contacts: [],
      machinery: ["Generadores", "Evaluación", "Remoción ligera"],
      sar: [{ type: "SAR preventivo", priority: "media" }],
      medical: ["Primeros auxilios"],
    },
    {
      slug: "nacional-humanitario", name: "Nacional / Humanitario", subname: "Cruz Roja · Cáritas · ONG",
      priority: "media", last_updated: "2026-06-30",
      contacts: [
        { org: "Cruz Roja Venezolana", phone: null, url: "https://cruzroja.ve/informate/" },
        { org: "Cáritas Venezuela",    phone: null, url: "https://caritasvenezuela.org/contactanos/" },
      ],
      machinery: [],
      sar: [{ type: "Coordinación voluntariado", priority: "media" }, { type: "Apoyo psicosocial", priority: "media" }, { type: "Gestión de acopios", priority: "media" }],
      medical: ["Agua potable", "Alimentos no perecederos", "Medicinas esenciales"],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
function getPriorityColor(p) {
  return {'critica':'#e63946','muy-alta':'#e63946','alta':'#f4a261','media':'#4cc9f0','baja':'#888'}[p]||'#888';
}
function getPriorityLabel(p) {
  return {'critica':'🔴 Crítica','muy-alta':'🔴 Muy Alta','alta':'🟠 Alta','media':'🟡 Media','baja':'⚪ Baja'}[p]||p;
}
function getContactIcon(type) {
  const icons = {
    emergency:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>`,
    civil:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    redcross: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    seismic:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    medical:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    utility:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`,
    international:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  };
  return icons[type]||icons.emergency;
}

// ── Tab state ────────────────────────────────────────────────
const _activeTab = {};
function setTab(slug, tab) {
  _activeTab[slug] = tab;
  ['contactos','maquinaria','sar','medico'].forEach(t => {
    const btn  = document.getElementById(`tab-btn-${slug}-${t}`);
    const pane = document.getElementById(`tab-pane-${slug}-${t}`);
    const color = getPriorityColor(
      EMERGENCY_DATA.regions.find(r=>r.slug===slug)?.priority || 'alta'
    );
    if (btn)  btn.style.cssText = tabBtnStyle(t===tab, color);
    if (pane) pane.style.display = t===tab ? 'block' : 'none';
  });
}
function tabBtnStyle(active, color) {
  return active
    ? `padding:6px 10px;border-radius:20px;border:none;font-size:11px;font-weight:700;cursor:pointer;background:${color};color:#fff;touch-action:manipulation;`
    : `padding:6px 10px;border-radius:20px;border:1px solid var(--border);font-size:11px;font-weight:600;cursor:pointer;background:var(--bg-input);color:var(--text-muted);touch-action:manipulation;`;
}
function toggleRegion(slug) {
  const content = document.getElementById(`region-${slug}`);
  const chevron = document.getElementById(`chevron-${slug}`);
  if (!content) return;
  const isOpen = content.style.display !== 'none';
  content.style.display = isOpen ? 'none' : 'block';
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
  if (!isOpen && !_activeTab[slug]) setTab(slug, 'contactos');
}

// ═══════════════════════════════════════════════════════════════
//  RENDERER
// ═══════════════════════════════════════════════════════════════
function renderDirectorio() {
  const container = document.getElementById('directorioContent');
  if (!container) return;

  if (!document.getElementById('jsonld-emergency')) {
    const s = document.createElement('script');
    s.id = 'jsonld-emergency'; s.type = 'application/ld+json';
    s.text = JSON.stringify({
      "@context":"https://schema.org","@type":"EmergencyService",
      "name":"Directorio Emergencias — Terremoto Venezuela 2026",
      "description": EMERGENCY_DATA.event,
      "areaServed":{"@type":"Country","name":"Venezuela"},
      "telephone": EMERGENCY_DATA.national.filter(c=>c.type==='emergency').map(c=>c.phone),
      "dateModified": EMERGENCY_DATA.generated_at,
    });
    document.head.appendChild(s);
  }

  const phoneIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>`;
  const chevronR  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
  const extIcon   = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  const typeColors = { seismic:'rgba(76,201,240,0.12)', medical:'rgba(45,198,83,0.10)', civil:'rgba(244,162,97,0.10)', international:'rgba(230,57,70,0.08)' };
  const typeBorders= { seismic:'rgba(76,201,240,0.3)',  medical:'rgba(45,198,83,0.25)', civil:'rgba(244,162,97,0.25)', international:'rgba(230,57,70,0.25)' };
  const typeAccents= { seismic:'#4cc9f0', medical:'#2dc653', civil:'#f4a261', international:'#e63946' };

  const updatesHTML = EMERGENCY_DATA.official_updates.map(u=>`
    <div style="background:${typeColors[u.type]||'rgba(255,255,255,0.04)'};border:1px solid ${typeBorders[u.type]||'rgba(255,255,255,0.1)'};border-radius:8px;padding:11px 13px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
        <span style="font-size:10px;font-weight:700;color:${typeAccents[u.type]||'#888'};text-transform:uppercase;letter-spacing:0.5px;">${u.source}</span>
        <span style="font-size:10px;color:var(--text-muted);">${u.date}</span>
      </div>
      <div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:3px;">${u.badge} ${u.title}</div>
      <div style="font-size:11px;color:var(--text-muted);line-height:1.5;">${u.summary}</div>
    </div>`).join('');

  const regionsHTML = EMERGENCY_DATA.regions.map(r => {
    const color = getPriorityColor(r.priority);
    const hasCont = r.contacts.length > 0;
    const hasMach = r.machinery && r.machinery.length > 0;
    const hasSAR  = r.sar && r.sar.length > 0;
    const hasMed  = r.medical && r.medical.length > 0;
    const hasAcop = r.acopio_points && r.acopio_points.length > 0;
    const hasHosp = r.hospitals_campaign && r.hospitals_campaign.length > 0;
    const hasSeis = r.seismic_alert && r.seismic_alert.active;

    const contactsHTML = hasCont ? r.contacts.map(c=>{
      const href   = c.phone ? `tel:${c.phone.replace(/[^0-9+]/g,'')}` : (c.url||'#');
      const tgt    = c.phone ? '' : 'target="_blank" rel="noopener noreferrer"';
      const sub    = c.phone
        ? `<div style="font-size:11px;color:var(--text-muted);font-family:monospace;">${c.phone}</div>`
        : `<div style="font-size:11px;color:#4cc9f0;">Ver sitio →</div>`;
      return `<a href="${href}" ${tgt} style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-bottom:1px solid var(--border);text-decoration:none;color:var(--text);touch-action:manipulation;">
        <span style="color:#e63946;">${phoneIcon}</span>
        <div style="flex:1;min-width:0;"><div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.org}</div>${sub}</div>
        ${chevronR}</a>`;
    }).join('') : `<p style="padding:12px 13px;font-size:12px;color:var(--text-muted);">Sin contacto local registrado. Usar números nacionales.</p>`;

    const acopisHTML = hasAcop ? `
      <div style="padding:10px 13px 0;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);margin-bottom:6px;">Centros de acopio</div>
        ${r.acopio_points.map(a=>`
          <div style="background:rgba(45,198,83,0.07);border:1px solid rgba(45,198,83,0.2);border-radius:7px;padding:9px 11px;margin-bottom:5px;">
            <div style="font-size:12px;font-weight:700;color:#2dc653;">📦 ${a.name}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${a.address}</div>
            <div style="font-size:11px;color:var(--text);margin-top:4px;">${a.items.join(' · ')}</div>
          </div>`).join('')}
      </div>` : '';

    const hospHTML = hasHosp ? `
      <div style="margin:8px 13px 0;background:rgba(45,198,83,0.08);border:1px solid rgba(45,198,83,0.25);border-left:3px solid #2dc653;border-radius:7px;padding:10px 12px;">
        <div style="font-size:11px;font-weight:700;color:#2dc653;margin-bottom:5px;">🏥 HOSPITALES DE CAMPAÑA ACTIVOS</div>
        ${r.hospitals_campaign.map(h=>`<div style="font-size:11px;color:var(--text);line-height:1.7;">✅ <strong>${h.org}</strong> — desde ${h.date}</div>`).join('')}
      </div>` : '';

    const seisHTML = hasSeis ? `
      <div style="margin:8px 13px 0;background:rgba(76,201,240,0.08);border:1px solid rgba(76,201,240,0.25);border-left:3px solid #4cc9f0;border-radius:7px;padding:10px 12px;">
        <div style="font-size:11px;font-weight:700;color:#4cc9f0;margin-bottom:3px;">📡 ALERTA SÍSMICA — ${r.seismic_alert.source}</div>
        <div style="font-size:11px;color:var(--text);">${r.seismic_alert.events} eventos · ${r.seismic_alert.range}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:3px;">${r.seismic_alert.note}</div>
      </div>` : '';

    const mapsHTML = `
      <div style="padding:10px 13px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);margin-bottom:6px;">Mapas colaborativos</div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          ${EMERGENCY_DATA.collaborative_maps.slice(0,3).map(m=>`
            <a href="${m.url}" target="_blank" rel="noopener noreferrer"
               style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(76,201,240,0.08);border:1px solid rgba(76,201,240,0.2);border-radius:7px;text-decoration:none;color:#4cc9f0;font-size:12px;font-weight:600;touch-action:manipulation;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
              ${m.name}<span style="margin-left:auto;">${extIcon}</span>
            </a>`).join('')}
        </div>
      </div>`;

    return `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-bottom:1px solid var(--border);cursor:pointer;" onclick="toggleRegion('${r.slug}')">
        <div>
          <div style="font-size:14px;font-weight:700;color:var(--text);">${r.name}</div>
          ${r.subname?`<div style="font-size:11px;color:var(--text-muted);">${r.subname}</div>`:''}
          <div style="font-size:11px;color:${color};font-weight:600;margin-top:2px;">${getPriorityLabel(r.priority)}</div>
        </div>
        <svg id="chevron-${r.slug}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="transition:transform 200ms;flex-shrink:0;" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>

      <div id="region-${r.slug}" style="display:none;">
        <div style="display:flex;gap:5px;padding:10px 13px;flex-wrap:wrap;border-bottom:1px solid var(--border);">
          ${hasCont||hasAcop?`<button id="tab-btn-${r.slug}-contactos"  onclick="setTab('${r.slug}','contactos')"  style="${tabBtnStyle(true,color)}">📞 Contactos</button>`:''}
          ${hasMach?`<button id="tab-btn-${r.slug}-maquinaria" onclick="setTab('${r.slug}','maquinaria')" style="${tabBtnStyle(false,color)}">🏗 Maquinaria</button>`:''}
          ${hasSAR?`<button id="tab-btn-${r.slug}-sar"         onclick="setTab('${r.slug}','sar')"         style="${tabBtnStyle(false,color)}">🚨 SAR</button>`:''}
          ${hasMed?`<button id="tab-btn-${r.slug}-medico"      onclick="setTab('${r.slug}','medico')"      style="${tabBtnStyle(false,color)}">💊 Médico</button>`:''}
        </div>

        <div id="tab-pane-${r.slug}-contactos" style="display:block;">
          ${contactsHTML}${acopisHTML}${hospHTML}${seisHTML}${mapsHTML}
        </div>

        <div id="tab-pane-${r.slug}-maquinaria" style="display:none;">
          ${hasMach?`<div style="padding:12px 13px;"><div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Maquinaria y herramientas faltantes.</div>
          <div style="display:flex;flex-direction:column;gap:6px;">${r.machinery.map(m=>`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(244,162,97,0.08);border:1px solid rgba(244,162,97,0.2);border-radius:7px;">
              <span style="font-size:13px;">🏗</span><span style="font-size:12px;font-weight:600;color:var(--text);">${m}</span>
            </div>`).join('')}</div></div>`:'<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin datos de maquinaria.</p>'}
        </div>

        <div id="tab-pane-${r.slug}-sar" style="display:none;">
          ${hasSAR?`<div style="padding:12px 13px;"><div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Equipos de Búsqueda y Rescate requeridos.</div>
          <div style="display:flex;flex-direction:column;gap:6px;">${r.sar.map(s=>`
            <div style="padding:9px 10px;background:rgba(230,57,70,0.06);border:1px solid rgba(230,57,70,0.2);border-radius:7px;">
              <div style="font-size:12px;font-weight:600;color:var(--text);">🚨 ${s.type}</div>
              ${s.priority?`<span style="font-size:10px;background:rgba(230,57,70,0.12);color:#e63946;padding:2px 7px;border-radius:8px;font-weight:600;display:inline-block;margin-top:4px;">Prioridad: ${s.priority}</span>`:''}
            </div>`).join('')}</div></div>`:'<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin datos SAR.</p>'}
        </div>

        <div id="tab-pane-${r.slug}-medico" style="display:none;">
          ${hasMed?`<div style="padding:12px 13px;"><div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Suministros médicos urgentes.</div>
          <div style="display:flex;flex-direction:column;gap:5px;">${r.medical.map(m=>`
            <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(45,198,83,0.06);border:1px solid rgba(45,198,83,0.15);border-radius:7px;">
              <span style="font-size:13px;">💊</span><span style="font-size:12px;font-weight:600;color:var(--text);">${m}</span>
            </div>`).join('')}</div></div>`:'<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin datos médicos.</p>'}
        </div>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <div style="background:rgba(230,57,70,0.12);border:1px solid rgba(230,57,70,0.3);border-left:4px solid #e63946;border-radius:8px;padding:12px 14px;margin-bottom:12px;">
      <div style="font-size:12px;font-weight:700;color:#e63946;margin-bottom:3px;">⚠ DÍA ${EMERGENCY_DATA.days_elapsed} — EMERGENCIA ACTIVA</div>
      <div style="font-size:13px;color:var(--text);line-height:1.4;">${EMERGENCY_DATA.event}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Actualizado: ${new Date(EMERGENCY_DATA.generated_at).toLocaleString('es-VE',{dateStyle:'short',timeStyle:'short'})}</div>
    </div>
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:8px;">Comunicados oficiales</div>
    <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:20px;">${updatesHTML}</div>
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;">Números nacionales</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:20px;">
      ${EMERGENCY_DATA.national.map(c=>{
        const href = c.phone?`tel:${c.phone.replace(/[^0-9+]/g,'')}`:(c.url||'#');
        const tgt  = c.phone?'':`target="_blank" rel="noopener noreferrer"`;
        const sub  = c.phone?`<div style="font-size:12px;color:var(--text-muted);font-family:monospace;">${c.phone}</div>`:`<div style="font-size:11px;color:#4cc9f0;">Ver sitio →</div>`;
        const acc  = c.type==='emergency'||c.type==='redcross'?'#e63946':c.type==='seismic'?'#4cc9f0':c.type==='medical'?'#2dc653':'#f4a261';
        return `<a href="${href}" ${tgt} style="display:flex;align-items:center;gap:10px;padding:11px 13px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);touch-action:manipulation;">
          <span style="color:${acc};">${getContactIcon(c.type)}</span>
          <div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.org}</div>${sub}</div>
          ${chevronR}</a>`;
      }).join('')}
    </div>
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;">Por estado / región</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">${regionsHTML}</div>
    <div style="font-size:10px;color:var(--text-muted);text-align:center;padding-bottom:4px;line-height:1.6;">
      Fuentes: FUNVISIS · MPPS · Cruz Roja IFRC · Cáritas · Prot. Civil · SOUTHCOM<br>
      Última actualización: ${new Date(EMERGENCY_DATA.generated_at).toLocaleString('es-VE')}
    </div>`;
}

window.toggleRegion      = toggleRegion;
window.setTab            = setTab;
window.renderDirectorio  = renderDirectorio;
window.EMERGENCY_DATA    = EMERGENCY_DATA;
