/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — Emergency Data v3.2                        ║
 * ║  Datos fusionados: Contactos + Necesidades operacionales      ║
 * ║  Fuentes: FUNVISIS, Cruz Roja IFRC, Min. Salud, medios        ║
 * ║  Verificado: 2026-06-29T18:00:00-04:00                        ║
 * ║  Sin base de datos — offline-first vía SW cache               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

const EMERGENCY_DATA = {
  generated_at: "2026-06-29T18:00:00-04:00", // v3.2
  event:        "Terremoto Venezuela — 24 junio 2026",
  epicenter:    "Yaracuy (M 7.2 y M 7.5)",
  disclaimer:   "Datos compilados desde fuentes públicas verificadas. Actualizar periódicamente.",

  // ── ACTUALIZACIONES OFICIALES ─────────────────────────────────
  // Comunicados recientes de organismos verificados
  // Renderizados como banner en la pantalla Directorio
  official_updates: [
    {
      source:  "FUNVISIS",
      date:    "2026-06-29",
      badge:   "📡 Monitoreo activo",
      title:   "Secuencia sísmica y réplicas — monitoreo continuo",
      summary: "FUNVISIS mantiene vigilancia permanente de la secuencia sísmica y sus réplicas. Portal oficial actualizado con comunicados recientes. Se registraron 25 eventos entre M 1.9 y M 4.5 en Portuguesa, Trujillo y Lara.",
      regions: ["portuguesa","trujillo","lara","yaracuy"],
      type:    "seismic",
      source_url: "http://www.funvisis.gob.ve/noticias.php",
    },
    {
      source:  "MPPS — Ministerio de Salud",
      date:    "2026-06-29",
      badge:   "🏥 Balance sanitario oficial",
      title:   "3.150 heridos · 12.049 atendidos · 38 hospitales afectados",
      summary: "Balance oficial MPPS: 3.150 personas heridas reportadas, 12.049 atendidas, 38 hospitales afectados con despliegue médico ampliado en todo el territorio nacional.",
      regions: ["nacional"],
      type:    "medical",
      source_url: "https://mpps.gob.ve/balance-oficial-destaca-despliegue-sanitario-y-acciones-de-rescate-ante-contingencia-nacional/",
    },
    {
      source:  "Cruz Roja Venezolana / IFRC",
      date:    "2026-06-29",
      badge:   "🏥 Red operativa",
      title:   "Hospitales de campaña activos y ayuda internacional movilizada",
      summary: "Cruz Roja Española y Finlandesa con hospitales de campaña en La Guaira. 41 filiales activas con equipos de rescate, evaluación y atención a víctimas. Llamamiento IFRC por CHF 50 millones.",
      regions: ["la-guaira","nacional"],
      type:    "medical",
      source_url: "https://www2.cruzroja.es/web/ahora/-/ayuda-a-las-personas-afectadas-por-los-devastadores-terremotos-de-venezuela",
    },
    {
      source:  "Cáritas Venezuela",
      date:    "2026-06-29",
      badge:   "📦 Centro de acopio nacional",
      title:   "Centro de acopio en Montalbán — agua, alimentos y medicinas",
      summary: "Cáritas Venezuela activó centro de acopio nacional en la sede de la Conferencia Episcopal en Montalbán. Donaciones centralizadas: agua, alimentos y medicinas esenciales. Posibles centros diocesanos adicionales.",
      regions: ["distrito-capital","nacional"],
      type:    "civil",
      source_url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/",
    },
    {
      source:  "Protección Civil Nacional",
      date:    "2026-06-29",
      badge:   "📋 Coordinación activa",
      title:   "Lineamientos de gestión de riesgo y coordinación institucional",
      summary: "Protección Civil mantiene coordinación activa con entes regionales y publica lineamientos de respuesta para todo el territorio nacional.",
      regions: ["nacional"],
      type:    "civil",
      source_url: "https://www.pcivil.gob.ve/category/noticias-nacionales/",
    },
  ],

  // ── CONTACTOS NACIONALES ──────────────────────────────────────
  national: [
    { org: "Emergencias",          phone: "911",            type: "emergency" },
    { org: "Emergencias",          phone: "171",            type: "emergency" },
    { org: "Protección Civil",     phone: "0800-558.84.27", type: "civil"     },
    { org: "Protección Civil",     phone: "0800-266.84.46", type: "civil"     },
    { org: "Protección Civil",     phone: "0800-262.43.68", type: "civil"     },
    { org: "FUNVISIS",             phone: "0800-836.25.67", type: "seismic"   },
    { org: "Cruz Roja — Caracas",  phone: "0212-571.47.13", type: "redcross"  },
    { org: "Cruz Roja — Caracas",  phone: "0212-578.25.16", type: "redcross"  },
    { org: "Cruz Roja — Caracas",  phone: "0212-571.24.11", type: "redcross"  },
    { org: "Gas Directo",          phone: "0212-708.13.14", type: "utility"   },
    { org: "TAP Telemedicina",     phone: "0212-822.12.62", type: "medical"   },
    { org: "Cáritas Venezuela — Acopio Montalbán", phone: null, type: "civil", url: "https://caritasvenezuela.org" },
  ],

  // ── MAPAS COLABORATIVOS GLOBALES ─────────────────────────────
  collaborative_maps: [
    { name: "Venezuela Earthquake Response Hub", url: "https://vzla-response-hub.vercel.app",              desc: "Mapa interactivo de zonas afectadas" },
    { name: "SOS Venezuela 2026",                url: "https://sosvenezuela2026.com",                      desc: "Mapa colaborativo ciudadano" },
    { name: "Ayuda Venezuela — Acopio",          url: "https://ayudavenezuela.app/acopio",                 desc: "Centros de acopio verificados" },
    { name: "Hero Venezuela",                    url: "https://herovenezuela.com/es/mapa-acopios.php",     desc: "Mapa de acopios y voluntarios" },
    { name: "Cáritas Venezuela",                 url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/", desc: "Centro de acopio nacional — Montalbán" },
  ],

  // ── REGIONES ─────────────────────────────────────────────────
  // Estructura por región:
  //   contacts  → teléfonos de organismos locales
  //   maps      → mapas colaborativos relevantes
  //   machinery → maquinaria y herramientas faltantes
  //   sar       → equipos de búsqueda y rescate requeridos
  //   medical   → suministros médicos urgentes
  //   sources   → URLs de fuentes (solo referencia interna)
  // ─────────────────────────────────────────────────────────────
  regions: [

    // ── YARACUY — ZONA EPICENTRAL ─────────────────────────────
    {
      slug:     "yaracuy",
      name:     "Yaracuy — Zona Epicentral",
      subname:  "San Felipe y alrededores",
      priority: "critica",
      contacts: [
        { org: "Protección Civil Yaracuy", phone: "0254-231.66.55" },
      ],
      maps: [
        { name: "VE Response Hub", url: "https://vzla-response-hub.vercel.app" },
        { name: "SOS Venezuela",   url: "https://sosvenezuela2026.com" },
        { name: "Hero Venezuela",  url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Excavadoras",                          quantity: "2–4" },
        { item: "Retroexcavadoras",                     quantity: "2" },
        { item: "Motosierras y herramientas de corte",  quantity: "suficientes" },
        { item: "Generadores eléctricos",               quantity: "varios" },
        { item: "Camiones de carga para escombros",     quantity: "varios" },
      ],
      sar: [
        { type: "SAR especializado en colapso estructural", priority: "muy alta" },
        { type: "Equipos K9 de búsqueda",                   quantity: "3–5", priority: "muy alta" },
        { type: "Equipos de extracción pesada",             priority: "alta" },
      ],
      medical: [
        "Kits de trauma (vendajes, torniquetes)",
        "Material para manejo de fracturas (férulas)",
        "Analgesia IV",
        "Sueros intravenosos (Ringer / Salino)",
        "Antibióticos IV",
        "Material para reanimación",
      ],
      sources: [
        { title: "FUNVISIS — reporte sísmico y epicentro", url: "http://www.funvisis.gob.ve/noticias.php/noticia.php?id=2907" },
        { title: "SOS Venezuela — mapa colaborativo",      url: "https://sosvenezuela2026.com" },
      ],
    },

    // ── LA GUAIRA ─────────────────────────────────────────────
    {
      slug:     "la-guaira",
      name:     "La Guaira",
      subname:  "Macuto, Catia La Mar, Maiquetía",
      priority: "critica",
      contacts: [
        { org: "Protección Civil La Guaira", phone: "0212-331.16.11" },
        { org: "Protección Civil La Guaira", phone: "0424-207.53.35" },
        { org: "Protección Civil La Guaira", phone: "0800-724.84.51" },
      ],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",    url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Excavadoras hidráulicas",               quantity: "3+" },
        { item: "Retroexcavadoras",                      quantity: "2–3" },
        { item: "Plantas eléctricas portátiles",         quantity: "varias (hospitales/centros)" },
        { item: "Motosierras y herramientas de corte",   quantity: "suficientes" },
        { item: "Palas y herramientas de remoción",      quantity: "suficientes" },
      ],
      sar: [
        { type: "Equipos SAR urbanos",                          priority: "alta" },
        { type: "Equipos K9 de búsqueda",                       quantity: "3–5", priority: "alta" },
        { type: "Especialistas en estructuras colapsadas",      priority: "alta" },
        { type: "Equipos de estabilización y apuntalamiento",   priority: "alta" },
      ],
      hospitals_campaign: [
        { org: "Cruz Roja Española",   status: "Desplegado", location: "La Guaira",  date: "2026-06-26" },
        { org: "Cruz Roja Finlandesa", status: "Desplegado", location: "La Guaira",  date: "2026-06-26" },
      ],
      medical: [
        "✅ Hospitales de campaña activos — Cruz Roja Española y Finlandesa",
        "Kits de trauma (vendajes, torniquetes)",
        "Analgesia (opioides / alternativas)",
        "Suturas y material de cierre",
        "Antibióticos IV (ceftriaxona)",
        "Fluidos IV (Ringer / Salino)",
        "Oxígeno portátil y mascarillas",
        "Kits para quemados (si aplica)",
      ],
      sources: [
        { title: "IFRC / Cruz Roja — envíos humanitarios",    url: "https://www.infobae.com/venezuela/2026/06/26/la-cruz-roja-internacional-inicio-el-envio-de-toneladas-de-ayuda-humanitaria-a-venezuela/" },
        { title: "Cruz Roja España — acciones y prioridades", url: "https://www2.cruzroja.es/-/ayuda-terremoto-venezuela-2026" },
        { title: "El Diario — hospitales de campaña",         url: "https://eldiario.com/2026/06/26/cruz-roja-hospitales-venezuela/" },
        { title: "SOS Venezuela — mapa y datos sismo",        url: "https://sosvenezuela2026.com" },
      ],
    },

    // ── DISTRITO CAPITAL ──────────────────────────────────────
    {
      slug:     "distrito-capital",
      name:     "Distrito Capital",
      subname:  "Gran Caracas — hospitales y barrios afectados",
      priority: "alta",
      contacts: [
        { org: "Bomberos DC",         phone: "0212-545.74.11" },
        { org: "Protección Civil DC", phone: "0212-481.92.91" },
      ],
      maps: [
        { name: "VE Response Hub",        url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio",      url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",         url: "https://herovenezuela.com/es/mapa-acopios.php" },
        { name: "Cáritas — Acopio Montalbán", url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/" },
      ],
      acopio_points: [
        { name: "Cáritas Venezuela — Sede Nacional", address: "Conferencia Episcopal, Montalbán, Caracas", items: ["Agua", "Alimentos no perecederos", "Medicinas esenciales"] },
      ],
      machinery: [
        { item: "Generadores eléctricos para hospitales",  quantity: "varios" },
        { item: "Camillas y equipos de extracción ligera", quantity: "suficientes" },
        { item: "Vehículos 4x4 para acceso",               quantity: "varios" },
        { item: "Bombas de achique",                       quantity: "según necesidad" },
      ],
      sar: [
        { type: "Equipos de triage y rescate urbano",        priority: "alta" },
        { type: "Rescatistas médicos",                       priority: "alta" },
        { type: "Equipos K9",                                quantity: "2–4", priority: "alta" },
        { type: "Equipos de iluminación nocturna",           priority: "alta" },
      ],
      medical: [
        "Kits de primeros auxilios",
        "Suturas y material hemostático",
        "Analgesia y estabilización",
        "Fluidos IV (Ringer / Salino)",
        "Material de inmovilización (férulas)",
        "Antitetánico",
      ],
      sources: [
        { title: "Ministerio de Salud — activación hospitales",    url: "https://mpps.gob.ve/2026/06/" },
        { title: "Habilitación de 20 hospitales en Caracas",       url: "https://www.cadena3.com/noticia/mundo/venezuela-habilita-20-hospitales-para-atender-a-victimas-de-recientes-sismos_566500" },
        { title: "CNN — hospitales desbordados",                   url: "https://cnnespanol.cnn.com/2026/06/25/venezuela/hospitales-desbordados-terremotos-caracas-salud-orix" },
      ],
    },

    // ── MIRANDA ───────────────────────────────────────────────
    {
      slug:     "miranda",
      name:     "Miranda",
      subname:  "Valles del Tuy, zonas residenciales",
      priority: "alta",
      contacts: [
        { org: "Protección Civil Miranda", phone: "0212-379.92.92" },
        { org: "Bomberos del Este",        phone: "0212-242.04.11" },
      ],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",    url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Retroexcavadoras",              quantity: "1–2" },
        { item: "Camiones volquete",             quantity: "varios" },
        { item: "Motosierras",                   quantity: "suficientes" },
        { item: "Generadores pequeños",          quantity: "varios" },
      ],
      sar: [
        { type: "Rescatistas urbanos / SAR locales",           priority: "alta" },
        { type: "Equipos K9",                                  quantity: "1–2", priority: "media" },
        { type: "Especialistas en estructuras colapsadas",     priority: "media" },
      ],
      medical: [
        "Kits de trauma",
        "Vendajes estériles",
        "Analgésicos",
        "Antibióticos orales / IV",
        "Sueros IV",
      ],
      sources: [
        { title: "Ministerio de Salud — cobertura regional", url: "https://mpps.gob.ve/2026/06/" },
        { title: "TeleSUR — activación red sanitaria",       url: "https://www.telesurtv.net/venezuela-activa-red-centros-salud-tras-sismo/" },
      ],
    },

    // ── ARAGUA ───────────────────────────────────────────────
    {
      slug:     "aragua",
      name:     "Aragua",
      subname:  "Maracay y zonas costeras interiores",
      priority: "alta",
      contacts: [
        { org: "Bomberos Maracay",        phone: "0243-233.20.20" },
        { org: "Protección Civil Aragua", phone: "0243-554.13.13" },
      ],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",    url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Excavadoras pequeñas / medianas",       quantity: "1–2" },
        { item: "Herramientas manuales de remoción",     quantity: "suficientes" },
        { item: "Plantas eléctricas",                    quantity: "varias" },
        { item: "Equipos de bombeo",                     quantity: "según daños en infraestructura" },
      ],
      sar: [
        { type: "Equipos SAR urbanos",                    priority: "alta" },
        { type: "Técnicos en apuntalamiento estructural", priority: "media" },
        { type: "Equipos K9",                             quantity: "1–2", priority: "media" },
      ],
      medical: [
        "Material de triage",
        "Analgésicos",
        "Suturas",
        "Fluidos IV",
        "Mascarillas y oxígeno",
      ],
      sources: [
        { title: "TeleSUR — activación red de salud", url: "https://www.telesurtv.net/venezuela-activa-red-centros-salud-tras-sismo/" },
      ],
    },

    // ── CARABOBO ─────────────────────────────────────────────
    {
      slug:     "carabobo",
      name:     "Carabobo",
      subname:  "Valencia, Puerto Cabello",
      priority: "alta",
      contacts: [
        { org: "Bomberos Valencia",         phone: "0241-857.85.85" },
        { org: "Protección Civil Carabobo", phone: "0241-823.83.83" },
        { org: "Bomberos Puerto Cabello",   phone: "0242-361.36.36" },
      ],
      maps: [
        { name: "VE Response Hub", url: "https://vzla-response-hub.vercel.app" },
        { name: "SOS Venezuela",   url: "https://sosvenezuela2026.com" },
        { name: "Hero Venezuela",  url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Retroexcavadoras",                   quantity: "2" },
        { item: "Grúas pequeñas",                     quantity: "1–2" },
        { item: "Generadores",                        quantity: "varios" },
        { item: "Motosierras",                        quantity: "varias" },
        { item: "Camiones para escombros",            quantity: "varios" },
      ],
      sar: [
        { type: "SAR urbanos",                                         priority: "alta" },
        { type: "Especialistas en estructuras portuarias",             priority: "media" },
        { type: "Equipos K9",                                          quantity: "1–2", priority: "media" },
      ],
      medical: [
        "Kits de trauma",
        "Antibióticos",
        "Sueros IV",
        "Vendajes estériles",
        "Oxígeno",
      ],
      sources: [
        { title: "SOS Venezuela — reportes locales",   url: "https://sosvenezuela2026.com" },
        { title: "FUNVISIS — reporte sísmico",         url: "http://www.funvisis.gob.ve/noticias.php/noticia.php?id=2907" },
      ],
    },

    // ── TRUJILLO ─────────────────────────────────────────────
    {
      slug:     "trujillo",
      name:     "Trujillo",
      subname:  "",
      priority: "media",
      contacts: [
        { org: "Protección Civil Trujillo", phone: "0272-236.20.20" },
      ],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",    url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [],
      sar:      [],
      medical:  [],
      sources:  [],
    },

    // ── MÉRIDA ───────────────────────────────────────────────
    {
      slug:     "merida",
      name:     "Mérida",
      subname:  "",
      priority: "media",
      contacts: [
        { org: "Protección Civil Mérida", phone: "0274-244.64.34" },
        { org: "Protección Civil Mérida", phone: "0800-726.37.43" },
      ],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",    url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [],
      sar:      [],
      medical:  [],
      sources:  [],
    },

    // ── PORTUGUESA — NUEVA (corredor sísmico occidental) ─────────
    {
      slug:     "portuguesa",
      name:     "Portuguesa",
      subname:  "Corredor sísmico occidental — Monitoreo FUNVISIS",
      priority: "alta",
      contacts: [],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
      ],
      machinery: [
        { item: "Equipos de inspección estructural", quantity: "según evaluación" },
        { item: "Generadores de respaldo",            quantity: "varios" },
      ],
      sar: [
        { type: "Equipos SAR preventivos en standby",        priority: "media" },
        { type: "Técnicos en evaluación estructural rápida", priority: "alta" },
      ],
      medical: [
        "Kits de primeros auxilios en centros de salud",
        "Medicamentos para población con condiciones crónicas",
      ],
      seismic_alert: {
        active:    true,
        events:    25,
        range:     "M 1.9 – M 4.5",
        source:    "FUNVISIS",
        source_url:"http://www.funvisis.gob.ve/noticia.php?id=2913",
        note:      "Secuencia sísmica activa. Mantener alerta. Seguir canales oficiales FUNVISIS.",
      },
      sources: [
        { title: "FUNVISIS — eventos sísmicos occidente", url: "http://www.funvisis.gob.ve/noticia.php?id=2913" },
      ],
    },

    // ── LARA — NUEVA (corredor sísmico occidental) ────────────────
    {
      slug:     "lara",
      name:     "Lara",
      subname:  "Corredor sísmico occidental — Monitoreo FUNVISIS",
      priority: "alta",
      contacts: [],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
      ],
      machinery: [
        { item: "Equipos de inspección estructural", quantity: "según evaluación" },
        { item: "Generadores de respaldo",            quantity: "varios" },
      ],
      sar: [
        { type: "Equipos SAR preventivos en standby",        priority: "media" },
        { type: "Técnicos en evaluación estructural rápida", priority: "alta" },
      ],
      medical: [
        "Kits de primeros auxilios en centros de salud",
        "Medicamentos para población con condiciones crónicas",
      ],
      seismic_alert: {
        active:    true,
        events:    25,
        range:     "M 1.9 – M 4.5",
        source:    "FUNVISIS",
        source_url:"http://www.funvisis.gob.ve/noticia.php?id=2913",
        note:      "Secuencia sísmica activa. Mantener alerta. Seguir canales oficiales FUNVISIS.",
      },
      sources: [
        { title: "FUNVISIS — eventos sísmicos occidente", url: "http://www.funvisis.gob.ve/noticia.php?id=2913" },
      ],
    },

    // ── FALCÓN — NUEVA ────────────────────────────────────────
    {
      slug:     "falcon",
      name:     "Falcón",
      subname:  "Zonas costeras",
      priority: "media",
      contacts: [],
      maps: [
        { name: "VE Response Hub",   url: "https://vzla-response-hub.vercel.app" },
        { name: "Centros de acopio", url: "https://ayudavenezuela.app/acopio" },
        { name: "Hero Venezuela",    url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Camiones volqueta",          quantity: "varios" },
        { item: "Excavadoras ligeras",        quantity: "1–2" },
        { item: "Generadores",                quantity: "varios" },
        { item: "Herramientas de remoción",   quantity: "suficientes" },
      ],
      sar: [
        { type: "Equipos SAR costeros / urbanos",                   priority: "media" },
        { type: "Personal para búsqueda en edificaciones turísticas", priority: "media" },
        { type: "Equipos K9",                                        quantity: "1–2", priority: "media" },
      ],
      medical: [
        "Kits de primeros auxilios",
        "Antibióticos",
        "Sueros IV",
        "Vendas y material hemostático",
      ],
      sources: [
        { title: "CNN — cobertura sismo en vivo", url: "https://cnnespanol.cnn.com/2026/06/24/venezuela/live-news/terremoto-sismo-en-vivo-noticias-caracas-orix" },
      ],
    },

    // ── ZONAS COSTERAS Y PUERTOS — NUEVA ─────────────────────
    {
      slug:     "zonas-costeras-puertos",
      name:     "Zonas Costeras y Puertos",
      subname:  "Puerto Cabello, La Guaira, infraestructura portuaria",
      priority: "alta",
      contacts: [],
      maps: [
        { name: "VE Response Hub", url: "https://vzla-response-hub.vercel.app" },
        { name: "SOS Venezuela",   url: "https://sosvenezuela2026.com" },
        { name: "Hero Venezuela",  url: "https://herovenezuela.com/es/mapa-acopios.php" },
      ],
      machinery: [
        { item: "Grúas y equipos portuarios",              quantity: "según daño evaluado" },
        { item: "Retroexcavadoras",                        quantity: "según daño evaluado" },
        { item: "Generadores de gran capacidad",           quantity: "varios" },
        { item: "Equipos de remoción de escombros",        quantity: "suficientes" },
      ],
      sar: [
        { type: "SAR con experiencia en infraestructura portuaria", priority: "alta" },
        { type: "Buzos especializados (si hay daños en muelles)",   priority: "según evaluación" },
        { type: "Equipos K9",                                       priority: "media" },
      ],
      medical: [
        "Suministros para trauma y quemaduras",
        "Material para intoxicaciones (si hay incidentes industriales)",
        "Oxígeno portátil",
      ],
      sources: [
        { title: "IFRC — envíos humanitarios", url: "https://www.infobae.com/venezuela/2026/06/26/la-cruz-roja-internacional-inicio-el-envio-de-toneladas-de-ayuda-humanitaria-a-venezuela/" },
        { title: "SOS Venezuela — reportes",   url: "https://sosvenezuela2026.com" },
      ],
    },

  ], // fin regions
}; // fin EMERGENCY_DATA

// ═══════════════════════════════════════════════════════════════
//  HELPERS DE UI
// ═══════════════════════════════════════════════════════════════

function getPriorityColor(p) {
  return { 'critica':'#e63946','muy-alta':'#e63946','alta':'#f4a261','media':'#4cc9f0','baja':'#888' }[p] || '#888';
}

function getPriorityLabel(p) {
  return { 'critica':'🔴 Crítica','muy-alta':'🔴 Muy Alta','alta':'🟠 Alta','media':'🟡 Media','baja':'⚪ Baja' }[p] || p;
}

function getContactIcon(type) {
  const icons = {
    emergency: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>`,
    civil:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    redcross:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    seismic:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    medical:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    utility:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>`,
  };
  return icons[type] || icons.emergency;
}

// ═══════════════════════════════════════════════════════════════
//  TABS STATE
// ═══════════════════════════════════════════════════════════════
const _activeTab = {};

function setTab(slug, tab) {
  _activeTab[slug] = tab;
  const tabs = ['contactos','maquinaria','sar','medico'];
  tabs.forEach(t => {
    const btn  = document.getElementById(`tab-btn-${slug}-${t}`);
    const pane = document.getElementById(`tab-pane-${slug}-${t}`);
    if (btn)  btn.style.cssText  = tabBtnStyle(t === tab, getPriorityColor(_activeTab._region || 'alta'));
    if (pane) pane.style.display = t === tab ? 'block' : 'none';
  });
}

function tabBtnStyle(active, color) {
  return active
    ? `padding:6px 10px;border-radius:20px;border:none;font-size:11px;font-weight:700;cursor:pointer;background:${color};color:#fff;touch-action:manipulation;`
    : `padding:6px 10px;border-radius:20px;border:1px solid var(--border);font-size:11px;font-weight:600;cursor:pointer;background:var(--bg-input);color:var(--text-muted);touch-action:manipulation;`;
}

// ═══════════════════════════════════════════════════════════════
//  TOGGLE ACORDEÓN
// ═══════════════════════════════════════════════════════════════
function toggleRegion(slug) {
  const content = document.getElementById(`region-${slug}`);
  const chevron = document.getElementById(`chevron-${slug}`);
  if (!content) return;
  const isOpen = content.style.display !== 'none';
  content.style.display = isOpen ? 'none' : 'block';
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
  // Init tab en primera apertura
  if (!isOpen && !_activeTab[slug]) setTab(slug, 'contactos');
}

// ═══════════════════════════════════════════════════════════════
//  RENDERER PRINCIPAL
// ═══════════════════════════════════════════════════════════════
function renderDirectorio() {
  const container = document.getElementById('directorioContent');
  if (!container) return;

  // JSON-LD Schema.org — inyectado una sola vez para SEO
  if (!document.getElementById('jsonld-emergency')) {
    const s = document.createElement('script');
    s.id   = 'jsonld-emergency';
    s.type = 'application/ld+json';
    s.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "name": "Directorio de Emergencias — Terremoto Venezuela 2026",
      "description": EMERGENCY_DATA.event,
      "areaServed": { "@type": "Country", "name": "Venezuela" },
      "telephone": EMERGENCY_DATA.national.filter(c => c.type === 'emergency').map(c => c.phone),
      "dateModified": EMERGENCY_DATA.generated_at,
    });
    document.head.appendChild(s);
  }

  const phoneIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>`;
  const chevronR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  const extIcon  = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  container.innerHTML = `

    <!-- Banner emergencia activa -->
    <div style="background:rgba(230,57,70,0.12);border:1px solid rgba(230,57,70,0.3);border-left:4px solid #e63946;border-radius:8px;padding:12px 14px;margin-bottom:20px;">
      <div style="font-size:12px;font-weight:700;color:#e63946;margin-bottom:3px;">⚠ EMERGENCIA ACTIVA</div>
      <div style="font-size:13px;color:var(--text);line-height:1.4;">${EMERGENCY_DATA.event}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Datos verificados al ${new Date(EMERGENCY_DATA.generated_at).toLocaleDateString('es-VE')}</div>
    </div>

    <!-- Números nacionales -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;">Números Nacionales</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:24px;">
      ${EMERGENCY_DATA.national.map(c => {
        const href   = c.phone ? `tel:${c.phone.replace(/[^0-9+]/g,'')}` : (c.url || '#');
        const target = c.phone ? '' : 'target="_blank" rel="noopener noreferrer"';
        const sub    = c.phone ? `<div style="font-size:12px;color:var(--text-muted);font-family:monospace;">${c.phone}</div>`
                                : `<div style="font-size:11px;color:#4cc9f0;">Ver sitio web →</div>`;
        const accent = c.type==='emergency'||c.type==='redcross'?'#e63946':c.type==='seismic'?'#4cc9f0':c.type==='medical'?'#2dc653':'#f4a261';
        return `
          <a href="${href}" ${target} style="display:flex;align-items:center;gap:10px;padding:11px 13px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);touch-action:manipulation;">
            <span style="color:${accent};">${getContactIcon(c.type)}</span>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.org}</div>
              ${sub}
            </div>
            ${chevronR}
          </a>`;
      }).join('')}
    </div>

    <!-- Directorio por región -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;">Por Estado / Región</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
      ${EMERGENCY_DATA.regions.map(r => {
        const color = getPriorityColor(r.priority);
        const hasContacts  = r.contacts.length > 0;
        const hasMachinery = r.machinery.length > 0;
        const hasSAR       = r.sar.length > 0;
        const hasMedical   = r.medical.length > 0;

        return `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;overflow:hidden;">

          <!-- Header acordeón -->
          <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-bottom:1px solid var(--border);cursor:pointer;" onclick="toggleRegion('${r.slug}')">
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${r.name}</div>
              ${r.subname ? `<div style="font-size:11px;color:var(--text-muted);">${r.subname}</div>` : ''}
              <div style="font-size:11px;color:${color};font-weight:600;margin-top:2px;">${getPriorityLabel(r.priority)}</div>
            </div>
            <svg id="chevron-${r.slug}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="transition:transform 200ms;flex-shrink:0;" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>

          <!-- Contenido colapsable -->
          <div id="region-${r.slug}" style="display:none;">

            <!-- Pestañas -->
            <div style="display:flex;gap:5px;padding:10px 13px;flex-wrap:wrap;border-bottom:1px solid var(--border);">
              ${hasContacts  ? `<button id="tab-btn-${r.slug}-contactos"  onclick="setTab('${r.slug}','contactos')"  style="${tabBtnStyle(true,color)}">📞 Contactos</button>`  : ''}
              ${hasMachinery ? `<button id="tab-btn-${r.slug}-maquinaria" onclick="setTab('${r.slug}','maquinaria')" style="${tabBtnStyle(false,color)}">🏗 Maquinaria</button>` : ''}
              ${hasSAR       ? `<button id="tab-btn-${r.slug}-sar"        onclick="setTab('${r.slug}','sar')"        style="${tabBtnStyle(false,color)}">🚨 SAR</button>`        : ''}
              ${hasMedical   ? `<button id="tab-btn-${r.slug}-medico"     onclick="setTab('${r.slug}','medico')"     style="${tabBtnStyle(false,color)}">💊 Médico</button>`     : ''}
            </div>

            <!-- Tab: Contactos -->
            <div id="tab-pane-${r.slug}-contactos" style="display:block;">
              ${hasContacts ? r.contacts.map(c => `
                <a href="tel:${c.phone.replace(/[^0-9+]/g,'')}" style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-bottom:1px solid var(--border);text-decoration:none;color:var(--text);touch-action:manipulation;">
                  <span style="color:#e63946;">${phoneIcon}</span>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.org}</div>
                    <div style="font-size:11px;color:var(--text-muted);font-family:monospace;">${c.phone}</div>
                  </div>
                  ${chevronR}
                </a>
              `).join('') : `<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin contactos locales registrados. Usa los números nacionales.</p>`}

              <!-- Puntos de acopio si existen -->
              ${r.acopio_points && r.acopio_points.length ? `
                <div style="padding:10px 13px 0;">
                  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);margin-bottom:7px;">Centros de acopio verificados</div>
                  ${r.acopio_points.map(a => `
                    <div style="background:rgba(45,198,83,0.07);border:1px solid rgba(45,198,83,0.2);border-radius:7px;padding:9px 11px;margin-bottom:5px;">
                      <div style="font-size:12px;font-weight:700;color:#2dc653;">📦 ${a.name}</div>
                      <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${a.address}</div>
                      <div style="font-size:11px;color:var(--text);margin-top:4px;">${a.items.join(' · ')}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Mapas colaborativos siempre en tab contactos -->
              <div style="padding:10px 13px;">
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);margin-bottom:7px;">Mapas colaborativos</div>
                <div style="display:flex;flex-direction:column;gap:5px;">
                  ${r.maps.map(m => `
                    <a href="${m.url}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(76,201,240,0.08);border:1px solid rgba(76,201,240,0.2);border-radius:7px;text-decoration:none;color:#4cc9f0;font-size:12px;font-weight:600;touch-action:manipulation;">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                      ${m.name}
                      <span style="margin-left:auto;">${extIcon}</span>
                    </a>
                  `).join('')}
                </div>
              </div>

              <!-- Alerta sísmica si existe -->
              ${r.seismic_alert ? `
                <div style="margin:0 13px 10px;background:rgba(76,201,240,0.08);border:1px solid rgba(76,201,240,0.25);border-left:3px solid #4cc9f0;border-radius:7px;padding:10px 12px;">
                  <div style="font-size:11px;font-weight:700;color:#4cc9f0;margin-bottom:3px;">
                    📡 ALERTA SÍSMICA ACTIVA — ${r.seismic_alert.source}
                  </div>
                  <div style="font-size:11px;color:var(--text);line-height:1.5;">
                    ${r.seismic_alert.events} eventos · ${r.seismic_alert.range}
                  </div>
                  <div style="font-size:10px;color:var(--text-muted);margin-top:3px;line-height:1.4;">
                    ${r.seismic_alert.note}
                  </div>
                </div>
              ` : ''}

              <!-- Hospitales de campaña si existen -->
              ${r.hospitals_campaign ? `
                <div style="margin:0 13px 10px;background:rgba(45,198,83,0.08);border:1px solid rgba(45,198,83,0.25);border-left:3px solid #2dc653;border-radius:7px;padding:10px 12px;">
                  <div style="font-size:11px;font-weight:700;color:#2dc653;margin-bottom:6px;">
                    🏥 HOSPITALES DE CAMPAÑA ACTIVOS
                  </div>
                  ${r.hospitals_campaign.map(h => `
                    <div style="font-size:11px;color:var(--text);line-height:1.6;">
                      ✅ <strong>${h.org}</strong> — ${h.location} (desde ${h.date})
                    </div>
                  `).join('')}
                </div>
              ` : ''}

            </div>

            <!-- Tab: Maquinaria -->
            <div id="tab-pane-${r.slug}-maquinaria" style="display:none;">
              ${hasMachinery ? `
                <div style="padding:12px 13px;">
                  <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.4;">Maquinaria y herramientas faltantes reportadas para esta zona.</div>
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${r.machinery.map(m => `
                      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:rgba(244,162,97,0.08);border:1px solid rgba(244,162,97,0.2);border-radius:7px;">
                        <span style="font-size:12px;font-weight:600;color:var(--text);">🏗 ${m.item}</span>
                        <span style="font-size:11px;color:#f4a261;font-weight:700;background:rgba(244,162,97,0.15);padding:2px 7px;border-radius:10px;">${m.quantity}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin datos de maquinaria para esta región.</p>'}
            </div>

            <!-- Tab: SAR -->
            <div id="tab-pane-${r.slug}-sar" style="display:none;">
              ${hasSAR ? `
                <div style="padding:12px 13px;">
                  <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.4;">Equipos de Búsqueda y Rescate requeridos.</div>
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${r.sar.map(s => `
                      <div style="padding:9px 10px;background:rgba(230,57,70,0.06);border:1px solid rgba(230,57,70,0.2);border-radius:7px;">
                        <div style="font-size:12px;font-weight:600;color:var(--text);">🚨 ${s.type}</div>
                        <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap;">
                          ${s.quantity ? `<span style="font-size:10px;background:rgba(230,57,70,0.12);color:#e63946;padding:2px 7px;border-radius:8px;font-weight:600;">${s.quantity}</span>` : ''}
                          <span style="font-size:10px;background:rgba(230,57,70,0.12);color:#e63946;padding:2px 7px;border-radius:8px;font-weight:600;">Prioridad: ${s.priority}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin datos SAR para esta región.</p>'}
            </div>

            <!-- Tab: Médico -->
            <div id="tab-pane-${r.slug}-medico" style="display:none;">
              ${hasMedical ? `
                <div style="padding:12px 13px;">
                  <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;line-height:1.4;">Suministros médicos urgentes requeridos.</div>
                  <div style="display:flex;flex-direction:column;gap:5px;">
                    ${r.medical.map(m => `
                      <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(45,198,83,0.06);border:1px solid rgba(45,198,83,0.15);border-radius:7px;">
                        <span style="color:#2dc653;font-size:13px;">💊</span>
                        <span style="font-size:12px;font-weight:600;color:var(--text);">${m}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : '<p style="padding:14px 13px;font-size:12px;color:var(--text-muted);">Sin datos médicos para esta región.</p>'}
            </div>

          </div><!-- fin contenido colapsable -->
        </div><!-- fin región -->
        `;
      }).join('')}
    </div>

    <div style="font-size:10px;color:var(--text-muted);text-align:center;padding-bottom:4px;line-height:1.6;">
      Fuentes: FUNVISIS · MPPS · Cruz Roja IFRC · Protección Civil · Cáritas Venezuela<br>
      El Diario · Infobae Venezuela · CNN · medios verificados<br>
      Última actualización: ${new Date(EMERGENCY_DATA.generated_at).toLocaleString('es-VE')}
    </div>
  `;
}

// Exponer globalmente
window.toggleRegion     = toggleRegion;
window.setTab           = setTab;
window.renderDirectorio = renderDirectorio;
window.EMERGENCY_DATA   = EMERGENCY_DATA;
