/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — Emergency Data v5.0 — 2 jul 2026           ║
 * ║  7 días después del terremoto — 30 junio 2026                 ║
 * ║  Fuentes: FUNVISIS · MPPS · Cruz Roja · Cáritas · SOUTHCOM   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
'use strict';

const EMERGENCY_DATA = {
  generated_at: "2026-07-04T09:00:00-04:00",
  event:        "Terremoto Venezuela — 24 junio 2026",
  days_elapsed: 23,
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
    deaths:              4930,
    injured:             16740,
    rescued:             6462,
    volunteers:          31050,
    countries_supporting: 24,
    humanitarian_tons:   10063,
    k9_units:            86,
    rescue_personnel:    2408,
    aftershocks_total:   1275,
    us_personnel_inside: 900,
    us_personnel_hubs:   800,
    casualties_status:   "en actualización — rescates en curso",
    source:   "Jorge Rodríguez (Presidente AN) vía Telegram — Infobae, 17 jul 2026",
  },

  // ── RÉPLICAS RECIENTES (FUNVISIS) ────────────────────────────
  recent_replicas: [
    { date: "2026-07-02T00:49:00-04:00", magnitude: 3.2, depth_km: 5.5,  source: "FUNVISIS" },
    { date: "2026-06-29T00:00:00-04:00", magnitude: 4.6, depth_km: null, source: "Seguimiento regional" },
    { date: "2026-06-26T22:16:00-04:00", magnitude: 4.9, depth_km: null, source: "Seguimiento de réplicas" },
    { date: "2026-06-25T00:00:00-04:00", magnitude: null, depth_km: null, source: "FUNVISIS — réplicas 2.1–3.6" },
  ],

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

  // ── COMUNICADOS OFICIALES — actualizado 4 jul 2026 ──────────
  official_updates: [
    {
      source:  "Transparencia Venezuela — vía Infobae, 16 jul 2026",
      date:    "2026-07-16",
      badge:   "📋 Informe independiente cuestiona velocidad de respuesta",
      title:   "ONG Transparencia Venezuela: la respuesta oficial fue más lenta que en Chile, Japón o Haití",
      summary: "Un análisis de la ONG Transparencia Venezuela concluye que el despliegue gubernamental fue lento frente a catástrofes similares: el país alcanzó solo 12,6% de su pico de personal desplegado a las 24 horas y 59,7% al octavo día, mientras Chile (2010) y Japón (2011) llegaron a 71% y 46% en solo 48 horas. La cifra máxima de funcionarios (31.837) no se reportó hasta 18 días después del sismo. El informe también estima que cerca del 83% de los sobrevivientes se autoevacuaron o fueron ayudados por vecinos, no por equipos de rescate, y señala fuertes discrepancias entre el conteo oficial de edificios dañados (856) y estimaciones independientes que van de 1.054 (Copernicus/UE) a 58.870 (radar NASA).",
      type:    "civil",
      source_url: "https://www.infobae.com/venezuela/2026/07/16/informe-revela-que-gobierno-de-venezuela-no-atendio-con-rapidez-la-emergencia-de-los-terremotos/",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) vía Telegram — AP/Proceso, CiberCuba",
      date:    "2026-07-15",
      badge:   "🔴 Balance actualizado — 23 días",
      title:   "4.829 fallecidos · 20.857 personas en 106 campamentos",
      summary: "El balance oficial sube a 4.829 fallecidos, 95 más que el reporte anterior. Heridos (16.740), rescatados (6.462) y personas sin vivienda (17.907) se mantienen sin cambios. Los campamentos bajaron de 107 a 106, aunque siguen albergando a 20.857 personas. Se han distribuido 10.063 toneladas de alimentos y más de 24,2 millones de litros de agua, con 34.872 pacientes atendidos médicamente en total.",
      type:    "critical",
      source_url: "https://www.cibercuba.com/noticias/2026-07-16-u1-e135253-s27061-nid335232-terremotos-venezuela-dejan-casi-5-mil-muertos-20-mil",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) vía Telegram — El Nacional / La Patilla",
      date:    "2026-07-14",
      badge:   "🔴 Balance actualizado — 21 días",
      title:   "4.734 fallecidos · 20.903 personas en 107 campamentos transitorios",
      summary: "El balance oficial sube a 4.734 fallecidos, 173 más que el reporte anterior. Heridos (16.740), rescatados (6.462) y personas sin vivienda (17.907) se mantienen sin cambios. Los 107 campamentos transitorios ahora albergan a 20.903 personas, mientras 128.324 familias han recibido asistencia y 33.652 pacientes fueron atendidos médicamente desde el inicio de la emergencia.",
      type:    "critical",
      source_url: "https://www.elnacional.com/2026/07/asciende-a-4-734-el-numero-de-fallecidos-por-los-terremotos-en-venezuela/",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) vía Telegram — Infobae / Europa Press",
      date:    "2026-07-12",
      badge:   "🔴 Balance actualizado — 18 días",
      title:   "4.490 fallecidos · 108 campamentos activos · 19.583 albergados",
      summary: "El balance oficial sube a 4.490 fallecidos, 157 más que el reporte anterior. Se mantienen sin cambios los heridos (16.740), rescatados (6.462) y personas sin vivienda (17.907). Los campamentos transitorios pasaron de 94 a 108, albergando a 19.583 personas, mientras 120.794 familias han recibido asistencia desde el inicio de la emergencia.",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/12/ascendio-a-4490-el-numero-de-muertos-por-los-devastadores-terremotos-en-venezuela/",
    },
    {
      source:  "Europa Press vía Proceso, 12 jul 2026",
      date:    "2026-07-12",
      badge:   "✈️ Retiro escalonado de equipos internacionales",
      title:   "Comienza el retiro escalonado de equipos de rescate internacionales",
      summary: "Los rescatistas internacionales desplegados bajaron a 2.422, casi mil menos que el viernes anterior, en línea con el cierre de la fase de búsqueda activa. El total de efectivos movilizados en el país (incluyendo personal local) se ubica en 32.401, según el más reciente parte oficial.",
      type:    "international",
      source_url: "https://www.proceso.com.mx/internacional/2026/7/12/ya-son-casi-4-mil-500-los-muertos-por-el-doble-terremoto-en-venezuela-375960.html",
    },
    {
      source:  "NASA / Sentinel-1 (satélite europeo), análisis de Ohio State University — vía Infobae",
      date:    "2026-07-12",
      badge:   "🛰️ Análisis satelital independiente",
      title:   "Estimado satelital eleva a ~59.000 las estructuras dañadas a nivel nacional",
      summary: "Un análisis independiente de imágenes satelitales, procesado por la NASA y la Universidad Estatal de Ohio, estima en cerca de 59.000 el número de estructuras dañadas en todo el país — muy por encima del conteo oficial de 190 edificios con colapso total. La mitad de las edificaciones en zonas como Caraballeda, Macuto y Naiguatá muestran una probabilidad de daño superior al 75%.",
      type:    "civil",
      source_url: "https://www.infobae.com/venezuela/2026/07/12/ascendio-a-4490-el-numero-de-muertos-por-los-devastadores-terremotos-en-venezuela/",
    },
    {
      source:  "Jorge Rodríguez (AN) / Infobae — 12 jul 2026",
      date:    "2026-07-12",
      badge:   "🔴 El terremoto más mortífero en la historia sísmica moderna del país",
      title:   "4.490 fallecidos — el terremoto más mortífero de la historia moderna del país",
      summary: "Con 157 nuevos cuerpos hallados, la cifra de fallecidos alcanzó 4.490, convirtiendo a este evento en el terremoto más mortífero registrado en la historia moderna de Venezuela. La Guaira concentra 158 de los 190 edificios con colapso total confirmado (83% del total nacional).",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/12/ascendio-a-4490-el-numero-de-muertos-por-los-devastadores-terremotos-en-venezuela/",
    },
    {
      source:  "PNUD / PMA / ONU — vía Infobae, 12 jul 2026",
      date:    "2026-07-12",
      badge:   "💰 Daños estimados en USD 6.700 millones",
      title:   "PNUD calcula daños equivalentes al 6% del PIB venezolano",
      summary: "El Programa de las Naciones Unidas para el Desarrollo estimó los daños materiales en aproximadamente 6.700 millones de dólares. El Programa Mundial de Alimentos lanzó un llamamiento de 50 millones de dólares para alimentar a medio millón de personas durante tres meses. Venezuela mantiene conversaciones avanzadas con EE.UU., Brasil, el FMI y el Banco Mundial para la recuperación.",
      type:    "international",
      source_url: "https://www.infobae.com/venezuela/2026/07/12/ascendio-a-4490-el-numero-de-muertos-por-los-devastadores-terremotos-en-venezuela/",
    },
    {
      source:  "Ministerio de Asuntos Exteriores de España, vía El Español",
      date:    "2026-07-11",
      badge:   "🌍 40 ciudadanos españoles confirmados fallecidos",
      title:   "Impacto internacional confirmado — víctimas extranjeras en aumento",
      summary: "El Ministerio de Exteriores de España confirmó 40 ciudadanos españoles entre las víctimas mortales, cifra en aumento respecto al recuento anterior de 34.",
      type:    "international",
      source_url: "https://www.elespanol.com/mundo/america/20260711/venezuela-suma-muertos-doble-terremoto-elevando-fallecidos-espanoles/1003744318126_0.html",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) / Noticias Caracol — vía Pulzo, 11 jul 2026",
      date:    "2026-07-11",
      badge:   "🏘️ Plan habitacional en marcha",
      title:   "Gobierno estima 25.000 viviendas necesarias — primeras 200 unidades esta semana",
      summary: "El gobierno estima que se necesitarán 25.000 viviendas nuevas para las familias que perdieron su hogar. Ya se identificaron 40 terrenos en La Guaira (584.000 m² en total) para construcciones bajas y antisísmicas, y se prevé la entrega de las primeras 200 viviendas en los próximos días. En paralelo avanza un censo biométrico en los campamentos de Caracas, Miranda y La Guaira para precisar el número exacto de familias afectadas.",
      type:    "civil",
      source_url: "https://www.pulzo.com/economia/terremotos-en-venezuela-cuantas-viviendas-se-necesitan-y-como-impactan-los-recursos-retenidos-PP5243612A",
    },
    {
      source:  "Delcy Rodríguez (Presidenta encargada) / Noticias Caracol — vía Pulzo, 11 jul 2026",
      date:    "2026-07-11",
      badge:   "🌍 Gestión diplomática por recursos congelados",
      title:   "Venezuela pide liberar activos y oro retenidos en el exterior para la reconstrucción",
      summary: "La presidenta encargada Delcy Rodríguez gestiona ante Estados Unidos, Brasil, el FMI y el Banco Mundial la liberación de activos venezolanos retenidos en el exterior, y envió una carta al rey Carlos III solicitando la devolución de oro venezolano depositado en el Banco de Inglaterra, como parte del financiamiento para la reconstrucción tras los terremotos.",
      type:    "international",
      source_url: "https://www.pulzo.com/economia/terremotos-en-venezuela-cuantas-viviendas-se-necesitan-y-como-impactan-los-recursos-retenidos-PP5243612A",
    },
    {
      source:  "Balance oficial — 8 jul 2026",
      date:    "2026-07-10",
      badge:   "🔴 Balance actualizado — 16 días",
      title:   "3.811 fallecidos · 16.740 heridos · 17.907 sin vivienda",
      summary: "Balance oficial del 8 de julio, presentado por el presidente del Parlamento Jorge Rodríguez. La cifra de rescatados se mantiene en 6.462 desde el jueves anterior. Se han atendido 86.794 familias en total.",
      type:    "critical",
      source_url: "https://www.elnacional.com/2026/07/balance-oficial-3-811-muertos-y-mas-de-16-700-heridos-por-los-terremotos-en-venezuela/",
    },
    {
      source:  "Estimado de Naciones Unidas, vía Diario Las Américas / El Colombiano",
      date:    "2026-07-10",
      badge:   "⚠️ Sin cifra oficial de desaparecidos",
      title:   "ONU estima hasta 50.000 desaparecidos — cifra que el gobierno evita confirmar",
      summary: "Naciones Unidas estima que hasta 50.000 personas podrían haber desaparecido, lo que convertiría a este evento en uno de los peores terremotos de la historia de América Latina. El gobierno venezolano no ha publicado una cifra oficial de desaparecidos.",
      type:    "critical",
      source_url: "https://www.diariolasamericas.com/america-latina/ascienden-4118-los-fallecidos-terremotos-segun-gobierno-interino-venezuela-n5398653",
    },
    {
      source:  "FUNVISIS — vía El Nacional / The Objective, 14 jul 2026",
      date:    "2026-07-10",
      badge:   "📡 Réplica significativa — pánico y evacuaciones",
      title:   "Réplica de magnitud 3,9 cerca de Naiguatá genera evacuaciones preventivas",
      summary: "Una réplica de magnitud 3,9 sacudió el pasado viernes una zona a 10 km al noreste de Naiguatá, en el estado La Guaira — la entidad más golpeada por el doble terremoto original. El movimiento provocó pánico en la población y evacuaciones preventivas de edificios. Desde el 24 de junio se han registrado 1.275 réplicas en total.",
      type:    "seismic",
      source_url: "https://www.elnacional.com/2026/07/asciende-a-4-734-el-numero-de-fallecidos-por-los-terremotos-en-venezuela/",
    },
    {
      source:  "Balance oficial — Jorge Rodríguez (AN) — 9 jul 2026",
      date:    "2026-07-09",
      badge:   "🔴 Balance actualizado — 16 días",
      title:   "3.889 fallecidos · 16.740 heridos · 89 campamentos transitorios",
      summary: "Incremento de 78 fallecidos respecto al balance anterior. Se mantienen 6.462 rescatados y 17.907 personas sin vivienda. El Estado ha atendido 86.794 familias y desplegado cerca de 30.000 efectivos junto a 3.931 rescatistas internacionales.",
      type:    "critical",
      source_url: "https://www.elnacional.com/2026/07/sube-a-3-889-el-numero-de-fallecidos-por-los-terremotos-en-venezuela-la-cifra-de-heridos-se-mantiene-en-16-740/",
    },
    {
      source:  "Gobierno de Venezuela — 7 jul 2026",
      date:    "2026-07-07",
      badge:   "🏗️ Plan de reconstrucción activado",
      title:   "Arranca el plan \"Venezuela Renace\" para viviendas colapsadas",
      summary: "El gobierno puso en marcha el plan de recuperación de viviendas colapsadas y afectadas, consolidando la transición de la fase de búsqueda hacia la reconstrucción de infraestructura habitacional.",
      type:    "civil",
      source_url: "https://www.mdzol.com/mundo/aumento-3889-el-numero-fallecidos-terremotos-venezuela-n1550989",
    },
    {
      source:  "Balance oficial — 4 jul 2026",
      date:    "2026-07-04",
      badge:   "🔴 Cifras oficiales actualizadas",
      title:   "2.645 fallecidos · 12.400 heridos · 6.461 rescatados",
      summary: "Balance al día 11 de la emergencia, según El Tiempo (Colombia) citando fuentes oficiales venezolanas. La cifra de fallecidos subió de 2.595 (2 jul) a 2.645. Búsqueda bajo escombros continúa activa.",
      type:    "critical",
      source_url: "https://www.eltiempo.com/mundo/latinoamerica/venezuela-hoy-4-de-julio-tras-los-dos-fuertes-terremotos-la-emergencia-deja-al-menos-2-645-muertos-suben-a-34-los-espanoles-fallecidos",
    },
    {
      source:  "FUNVISIS — 3 jul 2026",
      date:    "2026-07-03",
      badge:   "📡 Réplica Mw 3.2 registrada",
      title:   "780+ réplicas desde el doblete principal — monitoreo activo",
      summary: "Última réplica registrada: Mw 3.2 a las 00:49 VET (2 jul), profundidad 5.5 km. Actividad sísmica residual continúa. Riesgo elevado en estructuras comprometidas.",
      type:    "seismic",
      source_url: "http://www.funvisis.gob.ve/monitor.html",
    },
    {
      source:  "Reuters / Europa Press — 1–3 jul 2026",
      date:    "2026-07-03",
      badge:   "🌍 24 países · 521 ton · 86 equipos K9",
      title:   "Respuesta multinacional activa — 2.741 rescatistas internacionales",
      summary: "EE.UU. con 900 efectivos dentro de Venezuela + 800 en hubs del Caribe. 24 países con 521 toneladas de insumos humanitarios. 86 unidades caninas de búsqueda activas.",
      type:    "international",
      source_url: "https://www.reuters.com/world/americas/us-military-deploys-over-900-personnel-venezuela-earthquake-response-2026-07-01/",
    },
    {
      source:  "Cruz Roja / IFRC",
      date:    "2026-07-03",
      badge:   "🏥 Hospitales de campaña + respuesta 24 meses",
      title:   "Cruz Roja Española y Finlandesa activas en La Guaira · CHF 50M",
      summary: "Hospitales de campaña operativos en La Guaira. 41 filiales venezolanas activas. Respuesta planificada a 24 meses. Llamamiento IFRC por CHF 50 millones.",
      type:    "medical",
      source_url: "https://cruzroja.ve/informate/",
    },
    {
      source:  "Cáritas Venezuela",
      date:    "2026-07-03",
      badge:   "📦 Acopio nacional — Montalbán, Caracas",
      title:   "Centro nacional de acopio activo — agua, alimentos, medicinas",
      summary: "Sede Conferencia Episcopal, Montalbán. Donaciones centralizadas. Activación de centros diocesanos en otras regiones en proceso.",
      type:    "civil",
      source_url: "https://caritasvenezuela.org/caritas-venezuela-con-los-afectados-por-el-sismo-el-abrazo-de-la-iglesia/",
    },
    {
      source:  "AFP / Univision — 3 jul 2026",
      date:    "2026-07-03",
      badge:   "⚠️ Cambio de fase operativa",
      title:   "Equipos internacionales dan por cerrada la fase de búsqueda activa",
      summary: "Tras el noveno día sin hallar señales de vida adicionales, los equipos de rescate transicionan de labores de búsqueda a labores de recuperación y reconstrucción. La probabilidad de hallar sobrevivientes disminuye drásticamente tras las primeras 72 horas.",
      type:    "civil",
      source_url: "https://www.univision.com/noticias/america-latina/ultimas-noticias-en-vivo-terremoto-venezuela-nueve-dias-tragedia-muertos-y-heridos-viernes-3-julio-2026",
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

  // ── HISTORIAS DE SOBREVIVIENTES — verificadas por prensa ──────
  // Casos reales reportados por CNN, Wikipedia y Univision.
  // Contenido parafraseado; nunca cita textual >15 palabras por fuente.
  survivor_stories: [
    {
      slug:     "hernan-gil-la-guaira",
      name:     "Hernán Alberto Gil Flores",
      age:      44,
      role:     "Guardia de seguridad",
      location: "La Guaira",
      days_trapped: 8,
      hours_trapped: 100,
      badge:    "🏆 Rescate más largo confirmado",
      headline: "8 días bajo los escombros — rescatado con vida",
      summary:  "Gil trabajaba como guardia de seguridad en un centro comercial de La Guaira. Un equipo de rescate chileno lo localizó y mantuvo con vida vía sonda de alimentación e hidratación durante más de 100 horas de trabajo hasta lograr sacarlo con vida.",
      rescue_team: "Grupo USAR — Bomberos de Chile",
      status:   "Rescatado con vida",
      date:     "2026-07-02",
      source:   "CNN en Español",
      source_url: "https://cnnespanol.cnn.com/2026/07/02/venezuela/live-news/terremotos-venezuela-en-vivo-noticias-la-guaira-caracas-orix",
    },
    {
      slug:     "familia-gallipoli-triangulo-vida",
      name:     "Jofram Gallipoli y su familia",
      age:      null,
      role:     "Padre de familia · esposa · hijo de 4 años",
      location: "Centro-norte de Venezuela",
      days_trapped: null,
      hours_trapped: null,
      badge:    "❤️ Historia de esperanza familiar",
      headline: "Una familia completa sobrevivió en el \"triángulo de la vida\"",
      summary:  "Gallipoli relató que todo quedó oscuro y sepultado en segundos. Él, su esposa y su hijo de 4 años lograron sobrevivir en un pequeño espacio de aire conocido como el triángulo de la vida, sin certeza de lo que ocurría afuera hasta ser rescatados.",
      rescue_team: "Equipos locales y voluntarios",
      status:   "Familia completa a salvo",
      date:     "2026-07-02",
      source:   "CNN en Español",
      source_url: "https://cnnespanol.cnn.com/2026/07/02/venezuela/live-news/terremotos-venezuela-en-vivo-noticias-la-guaira-caracas-orix",
    },
    {
      slug:     "stephanie-villegas-gritos",
      name:     "Stephanie Villegas",
      age:      null,
      role:     "Sobreviviente",
      location: "La Guaira",
      days_trapped: null,
      hours_trapped: null,
      badge:    "📢 Sus gritos salvaron su vida",
      headline: "Sus gritos de auxilio guiaron a los rescatistas hasta ella",
      summary:  "Villegas quedó atrapada bajo los escombros de un edificio en La Guaira. Sus llamados de auxilio dieron la señal de vida que permitió a rescatistas y voluntarios localizarla. Permanece hospitalizada en Caracas en recuperación.",
      rescue_team: "Voluntarios y rescatistas locales",
      status:   "Hospitalizada · en recuperación",
      date:     "2026-07-02",
      source:   "CNN en Español",
      source_url: "https://cnnespanol.cnn.com/2026/07/02/venezuela/live-news/terremotos-venezuela-en-vivo-noticias-la-guaira-caracas-orix",
    },
    {
      slug:     "padre-hijo-106-horas",
      name:     "Padre e hijo (identidad reservada)",
      age:      null,
      role:     "Padre e hijo",
      location: "La Guaira",
      days_trapped: 4,
      hours_trapped: 106,
      badge:    "🌍 Rescate multinacional",
      headline: "106 horas atrapados — rescatados por equipo internacional",
      summary:  "Un padre y su hijo permanecieron aproximadamente 106 horas atrapados bajo un edificio colapsado en La Guaira. Fueron rescatados con vida en una operación conjunta entre equipos venezolanos, franceses y estadounidenses.",
      rescue_team: "Venezuela · Francia · Estados Unidos (operación conjunta)",
      status:   "Rescatados con vida",
      date:     "2026-06-29",
      source:   "Wikipedia — Terremotos de Venezuela de 2026",
      source_url: "https://es.wikipedia.org/wiki/Terremotos_de_Venezuela_de_2026",
    },
    {
      slug:     "madre-bebe-nueve-meses",
      name:     "Madre y bebé de 9 meses",
      age:      null,
      role:     "Madre e hijo lactante",
      location: "Zona centro-norte",
      days_trapped: null,
      hours_trapped: null,
      badge:    "👶 El rescate que emocionó al país",
      headline: "Madre y su bebé de nueve meses, rescatados con vida",
      summary:  "Un equipo de rescatistas estadounidenses logró salvar con vida a una madre junto a su bebé de nueve meses tras permanecer atrapados entre los escombros, en uno de los rescates más celebrados de la primera semana.",
      rescue_team: "Equipo de rescate — Estados Unidos",
      status:   "Rescatados con vida",
      date:     "2026-06-27",
      source:   "Wikipedia — Terremotos de Venezuela de 2026",
      source_url: "https://es.wikipedia.org/wiki/Terremotos_de_Venezuela_de_2026",
    },
    {
      slug:     "bebe-dos-anos-sexto-dia",
      name:     "Bebé de 2 años",
      age:      2,
      role:     "Menor rescatado",
      location: "Zona afectada",
      days_trapped: 6,
      hours_trapped: null,
      badge:    "✨ Milagro del sexto día",
      headline: "Rescatado con vida al sexto día — cuando la esperanza mermaba",
      summary:  "El 30 de junio, sexto día tras el doblete sísmico, los equipos de emergencia lograron rescatar con vida a un bebé de dos años. Las autoridades habían señalado que las probabilidades de hallar sobrevivientes disminuían con cada día transcurrido.",
      rescue_team: "Equipos de emergencia nacionales e internacionales",
      status:   "Rescatado con vida",
      date:     "2026-06-30",
      source:   "Univision Noticias",
      source_url: "https://www.univision.com/noticias/america-latina/ultimas-noticias-terremotos-venezuela-hoy-martes-30-junio-2026-en-vivo",
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
//  COMUNICADOS OFICIALES — WIDGET DINÁMICO EN HOME
// ═══════════════════════════════════════════════════════════════
let comFilterActive = 'todos';

function renderComunicadosHome() {
  const container = document.getElementById('comunicadosHomeWidget');
  if (!container) return;

  const typeAccents = { seismic:'#4cc9f0', medical:'#2dc653', civil:'#f4a261', international:'#e63946', critical:'#e63946' };
  const typeBg      = { seismic:'rgba(76,201,240,0.08)', medical:'rgba(45,198,83,0.08)', civil:'rgba(244,162,97,0.08)', international:'rgba(230,57,70,0.06)', critical:'rgba(230,57,70,0.14)' };
  const typeBorder  = { seismic:'rgba(76,201,240,0.3)', medical:'rgba(45,198,83,0.25)', civil:'rgba(244,162,97,0.25)', international:'rgba(230,57,70,0.25)', critical:'rgba(230,57,70,0.45)' };
  const typeLabels  = { todos:'Todos', critical:'🔴 Crítico', international:'🌍 Internacional', civil:'🏗️ Civil', medical:'🏥 Médico', seismic:'📡 Sísmico' };

  const updates = [...(EMERGENCY_DATA.official_updates || [])].sort((a,b) => new Date(b.date) - new Date(a.date));
  const filtered = comFilterActive === 'todos' ? updates : updates.filter(u => u.type === comFilterActive);
  const preview = filtered.slice(0, 3);

  const mostRecent = updates[0];
  const daysAgo = mostRecent ? Math.floor((Date.now() - new Date(mostRecent.date)) / 86400000) : null;
  const freshLabel = daysAgo === null ? '' : daysAgo <= 0 ? 'Actualizado hoy' : daysAgo === 1 ? 'Actualizado ayer' : `Actualizado hace ${daysAgo} días`;

  const typesPresent = [...new Set(updates.map(u => u.type))];
  const chips = ['todos', ...typesPresent];

  container.innerHTML = `
    <div class="com-widget-head">
      <div class="com-widget-title"><span class="com-live-dot"></span> Comunicados Oficiales</div>
      <span class="com-freshness">${freshLabel}</span>
    </div>
    <div class="com-chips">
      ${chips.map(t => `<button class="com-chip ${comFilterActive===t?'active':''}" onclick="comSetFilter('${t}')">${typeLabels[t]||t}</button>`).join('')}
    </div>
    ${preview.map(u => `
      <button class="com-card" style="background:${typeBg[u.type]||'rgba(255,255,255,0.03)'};border-color:${typeBorder[u.type]||'var(--border)'};" onclick="App.navigate('screenDirectorio');App.setNav(document.getElementById('nav-directorio'));renderDirectorio();markComunicadosSeen();">
        <div class="com-card-top">
          <span class="com-card-src" style="color:${typeAccents[u.type]||'#888'};">${u.source}</span>
          <span class="com-card-date">${u.date}</span>
        </div>
        <div class="com-card-title">${u.badge} ${u.title}</div>
        <div class="com-card-summary">${u.summary}</div>
      </button>`).join('') || `<p style="font-size:12px;color:var(--text-muted);text-align:center;padding:16px 0;">Sin comunicados en esta categoría.</p>`}
    <button class="com-view-all" onclick="App.navigate('screenDirectorio');App.setNav(document.getElementById('nav-directorio'));renderDirectorio();markComunicadosSeen();">
      Ver los ${updates.length} comunicados completos →
    </button>
  `;

  updateNavBadge(mostRecent);
}

function comSetFilter(type) {
  comFilterActive = type;
  renderComunicadosHome();
}

function updateNavBadge(mostRecent) {
  const navBtn = document.getElementById('nav-directorio');
  if (!navBtn || !mostRecent) return;
  const lastSeen = localStorage.getItem('lastSeenComunicadoDate');
  const existingDot = navBtn.querySelector('.nav-new-dot');
  if (!lastSeen || new Date(mostRecent.date) > new Date(lastSeen)) {
    if (!existingDot) {
      const dot = document.createElement('span');
      dot.className = 'nav-new-dot';
      navBtn.appendChild(dot);
    }
  } else if (existingDot) {
    existingDot.remove();
  }
}

function markComunicadosSeen() {
  const updates = EMERGENCY_DATA.official_updates || [];
  if (!updates.length) return;
  const mostRecentDate = updates.reduce((max, u) => new Date(u.date) > new Date(max) ? u.date : max, updates[0].date);
  localStorage.setItem('lastSeenComunicadoDate', mostRecentDate);
  const navBtn = document.getElementById('nav-directorio');
  navBtn?.querySelector('.nav-new-dot')?.remove();
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

  const typeColors = { seismic:'rgba(76,201,240,0.12)', medical:'rgba(45,198,83,0.10)', civil:'rgba(244,162,97,0.10)', international:'rgba(230,57,70,0.08)', critical:'rgba(230,57,70,0.18)' };
  const typeBorders= { seismic:'rgba(76,201,240,0.3)',  medical:'rgba(45,198,83,0.25)', civil:'rgba(244,162,97,0.25)', international:'rgba(230,57,70,0.25)', critical:'rgba(230,57,70,0.5)' };
  const typeAccents= { seismic:'#4cc9f0', medical:'#2dc653', civil:'#f4a261', international:'#e63946', critical:'#e63946' };

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

// ═══════════════════════════════════════════════════════════════
//  HISTORIAS DE SOBREVIVIENTES — Renderer
//  Casos reales verificados por prensa (CNN, Wikipedia, Univision)
// ═══════════════════════════════════════════════════════════════
const _openStory = {};

function toggleStory(slug) {
  const body    = document.getElementById(`story-body-${slug}`);
  const chevron = document.getElementById(`story-chevron-${slug}`);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  _openStory[slug] = !isOpen;
}

function renderHistorias() {
  const container = document.getElementById('historiasContent');
  if (!container) return;

  const stories = EMERGENCY_DATA.survivor_stories || [];

  const timeLabel = (s) => {
    if (s.days_trapped && s.hours_trapped) return `${s.days_trapped} días · ${s.hours_trapped}h`;
    if (s.days_trapped) return `${s.days_trapped} día${s.days_trapped > 1 ? 's' : ''} atrapado(s)`;
    if (s.hours_trapped) return `${s.hours_trapped} horas`;
    return null;
  };

  const cardsHTML = stories.map(s => {
    const tLabel = timeLabel(s);
    return `
    <div style="background:linear-gradient(135deg, rgba(244,162,97,0.08) 0%, rgba(20,20,20,0.4) 100%);border:1px solid rgba(244,162,97,0.25);border-radius:12px;overflow:hidden;">

      <div style="padding:14px;cursor:pointer;" onclick="toggleStory('${s.slug}')">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:10px;font-weight:700;color:#f4a261;background:rgba(244,162,97,0.15);padding:3px 9px;border-radius:20px;">${s.badge}</span>
          <svg id="story-chevron-${s.slug}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="transition:transform 200ms;flex-shrink:0;"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div style="font-size:14px;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:4px;">${s.headline}</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:11px;color:var(--text-muted);">
          <span>📍 ${s.location}</span>
          ${tLabel ? `<span>· ⏱ ${tLabel}</span>` : ''}
        </div>
      </div>

      <div id="story-body-${s.slug}" style="display:none;padding:0 14px 14px;">
        <div style="border-top:1px solid rgba(244,162,97,0.2);padding-top:12px;">
          <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:2px;">${s.name}${s.age ? ` (${s.age})` : ''}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">${s.role}</div>
          <div style="font-size:12px;color:var(--text);line-height:1.6;margin-bottom:10px;">${s.summary}</div>
          <div style="display:flex;flex-direction:column;gap:5px;font-size:11px;">
            <div style="color:var(--text-muted);">🚑 Equipo de rescate: <span style="color:var(--text);font-weight:600;">${s.rescue_team}</span></div>
            <div style="color:var(--text-muted);">✅ Estado: <span style="color:#2dc653;font-weight:700;">${s.status}</span></div>
          </div>
          <a href="${s.source_url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:5px;margin-top:10px;font-size:10px;color:#4cc9f0;text-decoration:none;">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Fuente: ${s.source} · ${s.date}
          </a>
        </div>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <div style="background:linear-gradient(135deg, rgba(244,162,97,0.15) 0%, rgba(180,120,30,0.06) 100%);border:1px solid rgba(244,162,97,0.3);border-radius:12px;padding:14px;margin-bottom:16px;">
      <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#f4a261;margin-bottom:4px;">✨ Historias de Vida y Resiliencia</div>
      <div style="font-size:13px;color:var(--text);line-height:1.5;">Detrás de cada cifra hay una historia real. Estos son casos verificados de personas rescatadas con vida tras el doblete sísmico del 24 de junio.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">${cardsHTML}</div>
    <div style="font-size:10px;color:var(--text-muted);text-align:center;padding:16px 0 4px;line-height:1.6;">
      Historias verificadas por CNN en Español, Wikipedia y Univision.<br>
      Se comparten con respeto a las personas involucradas y sus familias.
    </div>`;
}

window.toggleRegion      = toggleRegion;
window.setTab            = setTab;
window.renderDirectorio  = renderDirectorio;
window.toggleStory       = toggleStory;
window.renderHistorias   = renderHistorias;
window.EMERGENCY_DATA    = EMERGENCY_DATA;
