/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — Emergency Data v5.0 — 2 jul 2026           ║
 * ║  7 días después del terremoto — 30 junio 2026                 ║
 * ║  Fuentes: FUNVISIS · MPPS · Cruz Roja · Cáritas · SOUTHCOM   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */
'use strict';

const EMERGENCY_DATA = {
  generated_at: "2026-07-31T15:30:57.283626-04:00",
  event:        "Terremoto Venezuela — 24 junio 2026",
  days_elapsed: 30,
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
    deaths:              5546,
    injured:             16740,
    rescued:             6462,
    volunteers:          31050,
    countries_supporting: 31,
    humanitarian_tons:   10977,
    k9_units:            86,
    rescue_personnel:    2278,
    aftershocks_total:   1500,
    us_personnel_inside: 900,
    us_personnel_hubs:   800,
    casualties_status:   "en actualización — rescates en curso",
    source:   "Jorge Rodríguez (Presidente AN) vía Telegram — Infobae/EFE/LaPatilla, 24 jul 2026",
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
      source:  "Ayuda Venezuela",
      date:    "2026-07-24",
      badge:   "🕊️ Mensaje especial — 30 días",
      title:   "Hoy, Venezuela recuerda y se levanta — mensaje a un mes del terremoto",
      summary: "Hoy, 24 de julio, se cumple un mes de los terremotos y 243 años del natalicio de Simón Bolívar. Publicamos un mensaje especial de memoria, fuerza y esperanza para quienes lo perdieron todo — disponible en español, inglés, francés, alemán y portugués. Puedes leerlo completo desde la tarjeta destacada en la pantalla de Inicio.",
      type:    "civil",
      source_url: "https://ayuda-venezuela-terremoto.netlify.app/",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) vía Telegram — Infobae/Euronews",
      date:    "2026-07-23",
      badge:   "🔴 Casi un mes — balance actualizado",
      title:   "5.398 fallecidos a un mes del terremoto — persisten dudas sobre desaparecidos",
      summary: "El balance oficial subió a 5.398 fallecidos (52 más). Heridos se mantienen en 16.740. La cifra de personas sin vivienda tuvo un vaivén inusual esta semana —bajó a 17.265 el martes y volvió a subir a 17.907 el miércoles, sin explicación oficial del cambio. 23.122 personas permanecen en 107 campamentos. Las autoridades siguen sin publicar una cifra oficial de desaparecidos; la iniciativa ciudadana independiente \"Desaparecidos Terremoto Venezuela\" ya registra más de 29.000 casos reportados por particulares, cifra no verificada oficialmente. Delcy Rodríguez ratificó el compromiso de entregar 4.000 viviendas este año y 10.000 más durante 2027.",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/23/a-casi-un-mes-del-doble-terremoto-en-venezuela-el-balance-oficial-ascendio-a-5398-muertos/",
    },
    {
      source:  "Jorge Rodríguez (AN) / Delcy Rodríguez — EFE/Infobae, 20 jul 2026",
      date:    "2026-07-20",
      badge:   "🏘️ Primeras viviendas entregadas",
      title:   "5.278 fallecidos — entregan las primeras viviendas a familias damnificadas",
      summary: "El balance oficial subió a 5.278 fallecidos (70 más). Heridos (16.740) y personas sin vivienda (17.907) se mantienen sin cambios. 23.587 personas permanecen en 107 campamentos transitorios y 128.324 familias han sido atendidas. La presidenta encargada Delcy Rodríguez encabezó la entrega de las primeras viviendas del programa Gran Misión Vivienda Venezuela (construidas por la empresa china CITIC en Fuerte Tiuna) a más de 240 familias damnificadas, y anunció que las entregas continuarán mensualmente hasta alcanzar 4.000 viviendas para diciembre.",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/21/el-gobierno-de-venezuela-ascendio-a-5278-muertos-el-balance-de-victimas-por-el-doble-terremoto/",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) vía Telegram — EFE/Infobae",
      date:    "2026-07-18",
      badge:   "🔴 Balance actualizado — 25 días",
      title:   "5.119 fallecidos — Delcy Rodríguez condecora a 6.000 rescatistas",
      summary: "El balance oficial subió a 5.119 fallecidos, 50 más que el reporte anterior. Heridos (16.740), rescatados (6.462) y personas sin vivienda (17.907) se mantienen sin cambios. Los 107 campamentos transitorios ahora albergan a 21.470 personas. La presidenta encargada Delcy Rodríguez condecoró este sábado a 6.000 rescatistas por su labor durante la emergencia. Este evento es considerado el terremoto más mortífero de la historia moderna de Venezuela y el mayor sismo registrado en el país desde 1900.",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/18/aumentaron-a-5119-los-muertos-tras-el-doble-terremoto-en-venezuela/",
    },
    {
      source:  "Global Empowerment Mission — vía Infobae, 18 jul 2026",
      date:    "2026-07-18",
      badge:   "🤝 Compromiso de 5 años en La Guaira",
      title:   "Global Empowerment Mission anuncia operativo humanitario de 5 años en Venezuela",
      summary: "La organización Global Empowerment Mission, con respaldo de la administración de Donald Trump y la Iglesia católica, desplegó un operativo humanitario que prevé mantenerse durante cinco años en Venezuela. En menos de un mes ya entregó donaciones en once comunidades de La Guaira, incluyendo alimentos, agua, carpas, generadores eléctricos y fórmula para bebés.",
      type:    "civil",
      source_url: "https://www.infobae.com/venezuela/2026/07/18/aumentaron-a-5119-los-muertos-tras-el-doble-terremoto-en-venezuela/",
    },
    {
      source:  "Jorge Rodríguez (Presidente AN) — Infobae, 17 jul 2026",
      date:    "2026-07-17",
      badge:   "🔴 Balance actualizado — 25 días",
      title:   "5.069 fallecidos — Venezuela supera los 5.000 muertos por el doble terremoto",
      summary: "La cifra oficial de fallecidos superó los 5.000, alcanzando 5.069 (139 más que el reporte anterior). Los heridos se mantienen en 16.740. Se registraron 1.331 réplicas desde el 24 de junio. El Gobierno y el PNUD calcularon que el volumen de escombros generado asciende a 2.106.000 toneladas (1.529.000 de materiales de construcción). El Gobierno no ha publicado un listado oficial de personas desaparecidas; sectores de oposición han estimado cerca de 30.000 personas sin localizar, cifra no confirmada oficialmente.",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/17/venezuela-supero-los-5000-fallecidos-tras-el-doble-terremoto-hay-16000-heridos/",
    },
    {
      source:  "Delcy Rodríguez (Presidenta encargada) — Infobae/EFE/El Tiempo, 17 jul 2026",
      date:    "2026-07-17",
      badge:   "💵 FMI libera USD 346 millones",
      title:   "Venezuela accede a USD 346 millones del FMI para la reconstrucción",
      summary: "Venezuela accedió a 346 millones de dólares de sus propios recursos en el Fondo Monetario Internacional (FMI) para el proceso de recuperación y reconstrucción tras los terremotos del 24 de junio. La presidenta encargada, Delcy Rodríguez, explicó que los fondos se destinarán a vivienda, infraestructura y servicios públicos esenciales en las zonas afectadas. Este monto proviene del tramo de reserva del país en el organismo y es independiente de los Derechos Especiales de Giro (DEG) venezolanos retenidos, que suman unos 4.500 millones de dólares adicionales.",
      type:    "international",
      source_url: "https://www.infobae.com/america/agencias/2026/07/18/venezuela-accede-a-346-millones-de-dolares-del-fmi-para-la-recuperacion-tras-los-sismos/",
    },
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
      source:  "Jorge Rodríguez (Presidente AN) vía Telegram — Infobae/EFE, 16 jul 2026",
      date:    "2026-07-16",
      badge:   "🔴 Balance actualizado — 23 días",
      title:   "4.930 fallecidos — censo biométrico en marcha para plan de vivienda",
      summary: "El balance oficial de este jueves subió a 4.930 fallecidos, 101 más que el reporte anterior. Heridos (16.740) y personas sin vivienda (17.907) se mantienen sin cambios. Los campamentos bajaron de 107 a 106, con 20.857 personas albergadas. El Parlamento aprobó un proyecto de reforma de ley para acelerar la construcción de viviendas en el país.",
      type:    "critical",
      source_url: "https://www.infobae.com/venezuela/2026/07/17/la-cifra-de-muertos-por-el-doble-terremoto-en-venezuela-ascendio-a-4930/",
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
    {
      source:  "World Central Kitchen (WCK)",
      date:    "2026-07-02",
      badge:   "🍲 30.000 comidas diarias",
      title:   "World Central Kitchen abre cocina de campo con capacidad de 30.000 comidas diarias",
      summary: "World Central Kitchen inauguró una cocina de campo de gran capacidad cerca de las zonas más golpeadas de La Guaira, con capacidad para producir hasta 30.000 comidas frescas diarias. La organización trabaja junto a 42 restaurantes locales aliados en Miranda (Caracas), La Guaira y Carabobo, llegando a las comunidades a través de 64 puntos de distribución de comida caliente, agua y hielo, incluyendo refugios, hospitales y la morgue de Caracas.",
      type:    "civil",
      source_url: "https://wck.org/news/wck-opens-field-kitchen-to-expand-venezuela-earthquake-response-by-30000-meals/",
    },
    {
      source:  "Departamento de Estado de EE.UU. / SOUTHCOM — vía El Diario NY",
      date:    "2026-06-26",
      badge:   "🇺🇸 Despliegue militar y DART de EE.UU.",
      title:   "EE.UU. despliega equipo DART, buques y aviones militares tras instrucción de Trump",
      summary: "Tras instrucción del presidente Trump de responder con rapidez, el Departamento de Estado desplegó un equipo de Respuesta ante Desastres (DART) de más de 250 personas, incluyendo tres equipos de Búsqueda y Rescate Urbano de Virginia, Los Ángeles y Miami-Dade. El Comando Sur (SOUTHCOM) apoyó con aviones C-17, aeronaves MV-22 Osprey y los buques USS Fort Lauderdale y USS Billings posicionados frente a La Guaira para asistencia naval y logística.",
      type:    "international",
      source_url: "https://eldiariony.com/2026/06/25/ee-uu-se-moviliza-rapidamente-para-asistir-a-venezuela-por-los-terremotos-tras-pedido-de-trump/",
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
//  FASE 2 · BLOQUE F — i18n ES/EN
//  Claves adaptadas a la estructura real del sitio (post-rediseño):
//  botones compactos sin subtítulo, nav de 4 ítems, trust badges, etc.
// ═══════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  es: {
    'app.title': 'Ayuda <span>VE</span>',
    'nav.home': 'Inicio',
    'nav.person': 'Personas',
    'nav.damage': 'Daños',
    'nav.directorio': 'Directorio',
    'status.online': 'En línea',
    'status.offline': 'Sin señal',

    'hero.eyebrow': 'Terremoto Venezuela · 24 junio 2026',
    'hero.title': 'Cada reporte ayuda.<br>Cada dato salva tiempo.',
    'hero.subtitle': 'Cifras oficiales verificadas, directorio de emergencias y cómo ayudar — todo en un solo lugar, actualizado en tiempo real.',
    'hero.cta.primary': 'Ofrecer ayuda',
    'hero.cta.secondary': 'Ver directorio',

    'section.reportar': 'Reportar emergencia',
    'action.person.title': 'Persona Desaparecida',
    'action.damage.title': 'Daño Estructural',
    'action.offer.title': 'Ofrecer Ayuda',
    'action.reports.title': 'Mis Reportes',

    'trust.title': 'Sobre esta plataforma',
    'trust.badge1': 'Fuentes oficiales verificadas',
    'trust.badge2': 'Datos de acceso público y trazable',
    'trust.badge3': 'Operando en Venezuela',
    'trust.badge4': 'Código abierto — sin fines de lucro',
    'trust.badge5': 'Activa en la emergencia — actualización continua',
    'trust.sources': 'Fuentes consultadas',

    'ngo.title': 'Organizaciones internacionales de ayuda',
    'ngo.wck.desc': 'Comidas de emergencia en zonas de desastre',
    'ngo.directrelief.desc': 'Suministros médicos de emergencia',
    'ngo.ifrc.desc': 'Rescate, hospitales de campaña, coordinación global',
    'ngo.wfp.desc': 'Seguridad alimentaria — llamamiento activo',

    'notice.spanish_only': 'Los comunicados oficiales se actualizan a diario y están disponibles solo en español para garantizar precisión.',
    'memorial.badge': '30 DÍAS · 24 DE JULIO DE 2026',
    'memorial.title': "Hoy, Venezuela recuerda y se levanta",
    'memorial.teaser': "Un mensaje especial a un mes del terremoto, en el natalicio de Bolívar.",
    'memorial.cta': 'Leer el mensaje completo',
    'memorial.screentitle': 'Un mes después',
    'memorial.body': `<p>Hoy, 24 de julio, se cumplen 243 años del nacimiento de Simón Bolívar en Caracas. Ese mismo día, se cumple un mes exacto de los terremotos que cambiaron a Venezuela para siempre.</p>
<p>No elegimos esta coincidencia. Pero tal vez valga la pena detenernos en ella.</p>
<h3>A quienes lo perdieron todo</h3>
<p>A quienes hoy visitan un campamento transitorio en vez de su casa. A quienes todavía revisan su teléfono esperando una llamada que confirme dónde está un ser querido. A las más de 5.000 familias que enterraron a alguien este mes, y a las que aún no encuentran respuesta.</p>
<p>No hay palabras que devuelvan lo perdido. No vamos a intentarlo. Lo que sí podemos decir, con toda honestidad, es esto: <strong>no están solos, y no han estado solos ni un solo día de estos treinta.</strong></p>
<h3>Lo que también es cierto</h3>
<p>Un informe independiente que publicamos hace unos días encontró algo notable, casi escondido entre los números: de las personas rescatadas con vida en los primeros días, la gran mayoría no llegó a salvo gracias a un equipo oficial ni a maquinaria pesada. Llegó a salvo porque un vecino, un desconocido, alguien que también tenía miedo, decidió cavar con las manos.</p>
<p>Eso ha sido Venezuela este mes. Treinta y un países enviando ayuda. Más de 31.000 voluntarios que se registraron para trabajar sin que nadie se los pidiera dos veces. Cocinas de campo sirviendo miles de platos calientes al día. Cruz Roja, equipos K9, médicos que durmieron en los mismos refugios que sus pacientes. Y esta semana, las primeras 240 familias recibiendo de nuevo un techo propio — el primero de miles que faltan, pero el primero, al fin.</p>
<p>Ese es el otro terremoto: el de la gente moviéndose, sin esperar permiso, hacia quien más lo necesitaba.</p>
<h3>Lo que Bolívar diría, tal vez</h3>
<p>Hace más de dos siglos, un joven de 22 años, de pie en Roma, hizo un juramento que pocos recuerdan con exactitud pero todos reconocen en espíritu: que no daría descanso a su brazo ni reposo a su alma hasta romper las cadenas que oprimían a su tierra.</p>
<p>No hablaba de un terremoto. Hablaba de otro tipo de ruina, y de otro tipo de reconstrucción. Pero la promesa es la misma que sostiene hoy a quien remueve escombros a mano, a quien reparte agua en un camión prestado, a quien abre su casa a una familia que no conocía hace un mes: <strong>la certeza de que un pueblo que se sostiene a sí mismo no se derrumba del todo, aunque se le caigan las paredes.</strong></p>
<h3>Lo que sigue</h3>
<p>Treinta días no cierran un duelo. La reconstrucción de Venezuela —la material, y la del corazón de quienes perdieron a los suyos— no se mide en semanas, sino en años. Este sitio va a seguir aquí para acompañarla, con las mismas cifras verificadas y la misma honestidad con la que empezamos.</p>
<p>Hoy, en el cumpleaños del Libertador, la libertad que más importa es más simple que cualquier gesta: la de saber que, pase lo que pase, alguien más va a estar ahí para ayudar a levantar lo que se cayó.</p>
<p style="margin-top:18px;font-style:italic;">Con todo el respeto y toda la fuerza,<br><strong>Ayuda Venezuela</strong></p>`,
  },

  en: {
    'app.title': 'Help <span>VE</span>',
    'nav.home': 'Home',
    'nav.person': 'People',
    'nav.damage': 'Damage',
    'nav.directorio': 'Directory',
    'status.online': 'Online',
    'status.offline': 'No signal',

    'hero.eyebrow': 'Venezuela Earthquake · June 24, 2026',
    'hero.title': 'Every report helps.<br>Every data point saves time.',
    'hero.subtitle': 'Verified official figures, emergency directory, and how to help — all in one place, updated in real time.',
    'hero.cta.primary': 'Offer help',
    'hero.cta.secondary': 'View directory',

    'section.reportar': 'Report emergency',
    'action.person.title': 'Missing Person',
    'action.damage.title': 'Structural Damage',
    'action.offer.title': 'Offer Help',
    'action.reports.title': 'My Reports',

    'trust.title': 'About this platform',
    'trust.badge1': 'Verified official sources',
    'trust.badge2': 'Publicly accessible, traceable data',
    'trust.badge3': 'Operating in Venezuela',
    'trust.badge4': 'Open source — non-profit',
    'trust.badge5': 'Active during the emergency — continuously updated',
    'trust.sources': 'Sources consulted',

    'ngo.title': 'International relief organizations',
    'ngo.wck.desc': 'Emergency meals in disaster areas',
    'ngo.directrelief.desc': 'Emergency medical supplies',
    'ngo.ifrc.desc': 'Rescue, field hospitals, global coordination',
    'ngo.wfp.desc': 'Food security — active appeal',

    'notice.spanish_only': 'Official communications are updated daily and available in Spanish only, to ensure accuracy.',
    'memorial.badge': '30 DAYS · JULY 24, 2026',
    'memorial.title': "Today, Venezuela remembers and rises",
    'memorial.teaser': "A special message one month after the earthquake, on Bolívar's birthday.",
    'memorial.cta': 'Read the full message',
    'memorial.screentitle': 'One month later',
    'memorial.body': `<p>Today, July 24, marks 243 years since Simón Bolívar was born in Caracas. That same day marks exactly one month since the earthquakes that changed Venezuela forever.</p>
<p>We didn't choose this coincidence. But perhaps it's worth pausing on it.</p>
<h3>To those who lost everything</h3>
<p>To those who today visit a transitional shelter instead of their home. To those still checking their phone, waiting for a call that confirms where a loved one is. To the more than 5,000 families who buried someone this month, and to those still waiting for an answer.</p>
<p>No words can bring back what was lost. We won't try. What we can say, honestly, is this: <strong>you are not alone, and you haven't been alone a single day of these thirty.</strong></p>
<h3>What is also true</h3>
<p>An independent report we published a few days ago found something remarkable, almost hidden among the numbers: of the people rescued alive in the first days, most didn't reach safety because of an official team or heavy machinery. They reached safety because a neighbor, a stranger, someone who was also afraid, decided to dig with their bare hands.</p>
<p>That has been Venezuela this month. Thirty-one countries sending aid. More than 31,000 volunteers who signed up to work without anyone having to ask twice. Field kitchens serving thousands of hot meals a day. Red Cross teams, K9 units, doctors who slept in the same shelters as their patients. And this week, the first 240 families receiving a roof of their own again — the first of thousands still needed, but the first, at last.</p>
<p>That's the other earthquake: people moving, without waiting to be asked, toward whoever needed them most.</p>
<h3>What Bolívar might say</h3>
<p>More than two centuries ago, a 22-year-old, standing in Rome, made an oath that few remember word for word but everyone recognizes in spirit: that he would give his arm no rest, nor his soul any peace, until he had broken the chains oppressing his homeland.</p>
<p>He wasn't speaking of an earthquake. He was speaking of another kind of ruin, and another kind of rebuilding. But the promise is the same one that sustains, today, whoever clears rubble by hand, whoever hands out water from a borrowed truck, whoever opens their home to a family they didn't know a month ago: <strong>the certainty that a people who hold each other up don't fully collapse, even when the walls do.</strong></p>
<h3>What comes next</h3>
<p>Thirty days don't close a grief. Venezuela's reconstruction — the material one, and the one in the hearts of those who lost their people — isn't measured in weeks, but in years. This site will keep being here to accompany it, with the same verified figures and the same honesty we started with.</p>
<p>Today, on the Liberator's birthday, the freedom that matters most is simpler than any feat of history: knowing that, whatever happens, someone else will be there to help rebuild what fell.</p>
<p style="margin-top:18px;font-style:italic;">With all our respect and all our strength,<br><strong>Ayuda Venezuela</strong></p>`,
  },

  fr: {
    'app.title': 'Aide <span>VE</span>',
    'nav.home': 'Accueil',
    'nav.person': 'Personnes',
    'nav.damage': 'Dégâts',
    'nav.directorio': 'Répertoire',
    'status.online': 'En ligne',
    'status.offline': 'Hors ligne',

    'hero.eyebrow': 'Séisme au Venezuela · 24 juin 2026',
    'hero.title': 'Chaque signalement aide.<br>Chaque donnée fait gagner du temps.',
    'hero.subtitle': "Chiffres officiels vérifiés, répertoire des urgences et comment aider — tout au même endroit, mis à jour en temps réel.",
    'hero.cta.primary': "Proposer de l'aide",
    'hero.cta.secondary': 'Voir le répertoire',

    'section.reportar': 'Signaler une urgence',
    'action.person.title': 'Personne disparue',
    'action.damage.title': 'Dégâts structurels',
    'action.offer.title': "Proposer de l'aide",
    'action.reports.title': 'Mes signalements',

    'trust.title': 'À propos de cette plateforme',
    'trust.badge1': 'Sources officielles vérifiées',
    'trust.badge2': 'Données accessibles au public et traçables',
    'trust.badge3': 'Opérant au Venezuela',
    'trust.badge4': 'Open source — à but non lucratif',
    'trust.badge5': "Active pendant l'urgence — mise à jour continue",
    'trust.sources': 'Sources consultées',

    'ngo.title': "Organisations internationales d'aide",
    'ngo.wck.desc': 'Repas d\'urgence dans les zones sinistrées',
    'ngo.directrelief.desc': "Fournitures médicales d'urgence",
    'ngo.ifrc.desc': 'Sauvetage, hôpitaux de campagne, coordination mondiale',
    'ngo.wfp.desc': 'Sécurité alimentaire — appel actif',

    'notice.spanish_only': "Les communiqués officiels sont mis à jour quotidiennement et disponibles uniquement en espagnol, afin de garantir leur exactitude.",
    'memorial.badge': '30 JOURS · 24 JUILLET 2026',
    'memorial.title': "Aujourd'hui, le Venezuela se souvient et se relève",
    'memorial.teaser': "Un message spécial un mois après le séisme, à l'anniversaire de Bolívar.",
    'memorial.cta': 'Lire le message complet',
    'memorial.screentitle': 'Un mois après',
    'memorial.body': `<p>Aujourd'hui, 24 juillet, marque les 243 ans de la naissance de Simón Bolívar à Caracas. Ce même jour marque exactement un mois depuis les séismes qui ont changé le Venezuela pour toujours.</p>
<p>Nous n'avons pas choisi cette coïncidence. Mais peut-être vaut-il la peine de s'y arrêter.</p>
<h3>À ceux qui ont tout perdu</h3>
<p>À ceux qui visitent aujourd'hui un abri transitoire au lieu de leur maison. À ceux qui vérifient encore leur téléphone, attendant un appel confirmant où se trouve un être cher. Aux plus de 5 000 familles qui ont enterré quelqu'un ce mois-ci, et à celles qui attendent encore une réponse.</p>
<p>Aucun mot ne peut rendre ce qui a été perdu. Nous n'allons pas essayer. Ce que nous pouvons dire, honnêtement, c'est ceci : <strong>vous n'êtes pas seuls, et vous ne l'avez été aucun de ces trente jours.</strong></p>
<h3>Ce qui est aussi vrai</h3>
<p>Un rapport indépendant que nous avons publié il y a quelques jours a révélé quelque chose de remarquable, presque caché parmi les chiffres : parmi les personnes secourues vivantes dans les premiers jours, la plupart ne doivent pas leur salut à une équipe officielle ni à des machines lourdes. Elles l'ont dû à un voisin, un inconnu, quelqu'un qui avait lui aussi peur, et qui a décidé de creuser à mains nues.</p>
<p>C'est cela, le Venezuela ce mois-ci. Trente et un pays envoyant de l'aide. Plus de 31 000 volontaires inscrits pour travailler sans qu'on ait à le leur demander deux fois. Des cuisines de campagne servant des milliers de repas chauds par jour. Des équipes de la Croix-Rouge, des unités cynophiles, des médecins ayant dormi dans les mêmes abris que leurs patients. Et cette semaine, les 240 premières familles retrouvant enfin un toit à elles — le premier de milliers encore nécessaires, mais le premier, enfin.</p>
<p>C'est ça, l'autre séisme : celui des gens qui se mettent en mouvement, sans attendre qu'on le leur demande, vers ceux qui en avaient le plus besoin.</p>
<h3>Ce que Bolívar dirait, peut-être</h3>
<p>Il y a plus de deux siècles, un jeune homme de 22 ans, debout à Rome, prononça un serment que peu se rappellent mot pour mot mais que tous reconnaissent en esprit : qu'il ne donnerait de repos ni à son bras ni à son âme jusqu'à briser les chaînes qui opprimaient sa terre.</p>
<p>Il ne parlait pas d'un séisme. Il parlait d'un autre type de ruine, et d'un autre type de reconstruction. Mais la promesse est la même qui soutient aujourd'hui celui qui déblaie des décombres à mains nues, celui qui distribue de l'eau depuis un camion emprunté, celui qui ouvre sa maison à une famille qu'il ne connaissait pas il y a un mois : <strong>la certitude qu'un peuple qui se soutient lui-même ne s'effondre jamais complètement, même quand les murs, eux, s'effondrent.</strong></p>
<h3>Ce qui suit</h3>
<p>Trente jours ne referment pas un deuil. La reconstruction du Venezuela — la matérielle, et celle du cœur de ceux qui ont perdu les leurs — ne se mesure pas en semaines, mais en années. Ce site continuera d'être là pour l'accompagner, avec les mêmes chiffres vérifiés et la même honnêteté qu'au premier jour.</p>
<p>Aujourd'hui, à l'anniversaire du Libertador, la liberté qui compte le plus est plus simple que n'importe quel exploit historique : celle de savoir que, quoi qu'il arrive, quelqu'un d'autre sera là pour aider à relever ce qui est tombé.</p>
<p style="margin-top:18px;font-style:italic;">Avec tout notre respect et toute notre force,<br><strong>Ayuda Venezuela</strong></p>`,
  },

  de: {
    'app.title': 'Hilfe <span>VE</span>',
    'nav.home': 'Start',
    'nav.person': 'Personen',
    'nav.damage': 'Schäden',
    'nav.directorio': 'Verzeichnis',
    'status.online': 'Online',
    'status.offline': 'Kein Signal',

    'hero.eyebrow': 'Erdbeben in Venezuela · 24. Juni 2026',
    'hero.title': 'Jede Meldung hilft.<br>Jede Angabe spart Zeit.',
    'hero.subtitle': 'Verifizierte offizielle Zahlen, Notfallverzeichnis und Hilfsmöglichkeiten — alles an einem Ort, in Echtzeit aktualisiert.',
    'hero.cta.primary': 'Hilfe anbieten',
    'hero.cta.secondary': 'Verzeichnis ansehen',

    'section.reportar': 'Notfall melden',
    'action.person.title': 'Vermisste Person',
    'action.damage.title': 'Strukturschaden',
    'action.offer.title': 'Hilfe anbieten',
    'action.reports.title': 'Meine Meldungen',

    'trust.title': 'Über diese Plattform',
    'trust.badge1': 'Verifizierte offizielle Quellen',
    'trust.badge2': 'Öffentlich zugängliche, nachvollziehbare Daten',
    'trust.badge3': 'Tätig in Venezuela',
    'trust.badge4': 'Open Source — gemeinnützig',
    'trust.badge5': 'Aktiv während des Notfalls — laufend aktualisiert',
    'trust.sources': 'Verwendete Quellen',

    'ngo.title': 'Internationale Hilfsorganisationen',
    'ngo.wck.desc': 'Notfallverpflegung in Katastrophengebieten',
    'ngo.directrelief.desc': 'Medizinische Notfallversorgung',
    'ngo.ifrc.desc': 'Rettung, Feldlazarette, globale Koordination',
    'ngo.wfp.desc': 'Ernährungssicherheit — aktiver Spendenaufruf',

    'notice.spanish_only': 'Offizielle Mitteilungen werden täglich aktualisiert und sind aus Genauigkeitsgründen nur auf Spanisch verfügbar.',
    'memorial.badge': '30 TAGE · 24. JULI 2026',
    'memorial.title': "Heute erinnert sich Venezuela und erhebt sich",
    'memorial.teaser': "Eine besondere Botschaft einen Monat nach dem Erdbeben, an Bolívars Geburtstag.",
    'memorial.cta': 'Vollständige Botschaft lesen',
    'memorial.screentitle': 'Einen Monat später',
    'memorial.body': `<p>Heute, am 24. Juli, jährt sich die Geburt Simón Bolívars in Caracas zum 243. Mal. Am selben Tag jährt sich auch genau ein Monat seit den Erdbeben, die Venezuela für immer verändert haben.</p>
<p>Wir haben uns diesen Zufall nicht ausgesucht. Aber vielleicht lohnt es sich, einen Moment innezuhalten.</p>
<h3>An alle, die alles verloren haben</h3>
<p>An alle, die heute eine Notunterkunft statt ihr Zuhause besuchen. An alle, die noch immer auf ihr Telefon schauen und auf einen Anruf warten, der bestätigt, wo ein geliebter Mensch ist. An die mehr als 5.000 Familien, die diesen Monat jemanden begraben haben, und an jene, die noch immer auf eine Antwort warten.</p>
<p>Keine Worte können zurückbringen, was verloren ist. Wir werden es nicht versuchen. Was wir ehrlich sagen können, ist dies: <strong>Ihr seid nicht allein, und ihr wart an keinem einzigen dieser dreißig Tage allein.</strong></p>
<h3>Was ebenfalls wahr ist</h3>
<p>Ein unabhängiger Bericht, den wir vor einigen Tagen veröffentlicht haben, förderte etwas Bemerkenswertes zutage, fast versteckt zwischen den Zahlen: Von den Menschen, die in den ersten Tagen lebend gerettet wurden, erreichten die meisten die Sicherheit nicht dank eines offiziellen Teams oder schweren Geräts. Sie erreichten sie, weil ein Nachbar, ein Fremder, jemand, der ebenfalls Angst hatte, beschloss, mit bloßen Händen zu graben.</p>
<p>Das war Venezuela in diesem Monat. Einunddreißig Länder, die Hilfe schickten. Mehr als 31.000 Freiwillige, die sich meldeten, ohne dass man sie zweimal fragen musste. Feldküchen, die täglich Tausende warme Mahlzeiten servierten. Rotkreuz-Teams, K9-Einheiten, Ärzte, die in denselben Unterkünften schliefen wie ihre Patienten. Und diese Woche erhielten die ersten 240 Familien wieder ein eigenes Dach über dem Kopf — die ersten von Tausenden, die noch fehlen, aber die ersten, endlich.</p>
<p>Das ist das andere Erdbeben: Menschen, die sich in Bewegung setzen, ohne gefragt werden zu müssen, hin zu denen, die sie am meisten brauchten.</p>
<h3>Was Bolívar vielleicht sagen würde</h3>
<p>Vor mehr als zwei Jahrhunderten legte ein 22-Jähriger, stehend in Rom, einen Schwur ab, an den sich kaum jemand wortwörtlich erinnert, den aber alle im Geiste kennen: dass er seinem Arm keine Ruhe und seiner Seele keinen Frieden gönnen würde, bis er die Ketten gesprengt hätte, die sein Land unterdrückten.</p>
<p>Er sprach nicht von einem Erdbeben. Er sprach von einer anderen Art des Zusammenbruchs und einer anderen Art des Wiederaufbaus. Doch das Versprechen ist dasselbe, das heute jenen trägt, der von Hand Trümmer wegräumt, der Wasser von einem geliehenen Lastwagen verteilt, der einer Familie, die er vor einem Monat noch nicht kannte, sein Zuhause öffnet: <strong>die Gewissheit, dass ein Volk, das sich gegenseitig stützt, nicht ganz zusammenbricht, selbst wenn die Mauern es tun.</strong></p>
<h3>Was als Nächstes kommt</h3>
<p>Dreißig Tage schließen keine Trauer ab. Der Wiederaufbau Venezuelas — der materielle, und jener im Herzen derer, die ihre Liebsten verloren haben — bemisst sich nicht in Wochen, sondern in Jahren. Diese Seite wird weiterhin hier sein, um ihn zu begleiten, mit denselben verifizierten Zahlen und derselben Ehrlichkeit, mit der wir begonnen haben.</p>
<p>Heute, am Geburtstag des Befreiers, ist die Freiheit, die am meisten zählt, einfacher als jede historische Heldentat: die Gewissheit, dass, was auch immer geschieht, jemand anderes da sein wird, um mit aufzubauen, was eingestürzt ist.</p>
<p style="margin-top:18px;font-style:italic;">Mit allem Respekt und aller Kraft,<br><strong>Ayuda Venezuela</strong></p>`,
  },

  pt: {
    'app.title': 'Ajuda <span>VE</span>',
    'nav.home': 'Início',
    'nav.person': 'Pessoas',
    'nav.damage': 'Danos',
    'nav.directorio': 'Diretório',
    'status.online': 'On-line',
    'status.offline': 'Sem sinal',

    'hero.eyebrow': 'Terremoto na Venezuela · 24 de junho de 2026',
    'hero.title': 'Cada relato ajuda.<br>Cada dado economiza tempo.',
    'hero.subtitle': 'Números oficiais verificados, diretório de emergências e como ajudar — tudo em um só lugar, atualizado em tempo real.',
    'hero.cta.primary': 'Oferecer ajuda',
    'hero.cta.secondary': 'Ver diretório',

    'section.reportar': 'Reportar emergência',
    'action.person.title': 'Pessoa desaparecida',
    'action.damage.title': 'Dano estrutural',
    'action.offer.title': 'Oferecer ajuda',
    'action.reports.title': 'Meus relatos',

    'trust.title': 'Sobre esta plataforma',
    'trust.badge1': 'Fontes oficiais verificadas',
    'trust.badge2': 'Dados de acesso público e rastreáveis',
    'trust.badge3': 'Atuando na Venezuela',
    'trust.badge4': 'Código aberto — sem fins lucrativos',
    'trust.badge5': 'Ativa durante a emergência — atualização contínua',
    'trust.sources': 'Fontes consultadas',

    'ngo.title': 'Organizações internacionais de ajuda',
    'ngo.wck.desc': 'Refeições de emergência em áreas de desastre',
    'ngo.directrelief.desc': 'Suprimentos médicos de emergência',
    'ngo.ifrc.desc': 'Resgate, hospitais de campanha, coordenação global',
    'ngo.wfp.desc': 'Segurança alimentar — apelo ativo',

    'notice.spanish_only': 'Os comunicados oficiais são atualizados diariamente e estão disponíveis apenas em espanhol, para garantir a precisão.',
    'memorial.badge': '30 DIAS · 24 DE JULHO DE 2026',
    'memorial.title': "Hoje, a Venezuela recorda e se levanta",
    'memorial.teaser': "Uma mensagem especial um mês após o terremoto, no aniversário de Bolívar.",
    'memorial.cta': 'Ler a mensagem completa',
    'memorial.screentitle': 'Um mês depois',
    'memorial.body': `<p>Hoje, 24 de julho, marca 243 anos do nascimento de Simón Bolívar em Caracas. Nesse mesmo dia, completa-se exatamente um mês dos terremotos que mudaram a Venezuela para sempre.</p>
<p>Não escolhemos essa coincidência. Mas talvez valha a pena parar para pensar nela.</p>
<h3>A quem perdeu tudo</h3>
<p>A quem hoje visita um abrigo temporário em vez da própria casa. A quem ainda verifica o telefone esperando uma ligação que confirme onde está um ente querido. Às mais de 5.000 famílias que enterraram alguém neste mês, e às que ainda esperam uma resposta.</p>
<p>Nenhuma palavra devolve o que se perdeu. Não vamos tentar. O que podemos dizer, com toda honestidade, é isto: <strong>vocês não estão sozinhos, e não estiveram sozinhos em nenhum destes trinta dias.</strong></p>
<h3>O que também é verdade</h3>
<p>Um relatório independente que publicamos há alguns dias encontrou algo notável, quase escondido entre os números: das pessoas resgatadas com vida nos primeiros dias, a maioria não chegou a salvo graças a uma equipe oficial ou a máquinas pesadas. Chegou a salvo porque um vizinho, um desconhecido, alguém que também estava com medo, decidiu cavar com as próprias mãos.</p>
<p>Isso foi a Venezuela neste mês. Trinta e um países enviando ajuda. Mais de 31.000 voluntários que se inscreveram para trabalhar sem que ninguém precisasse pedir duas vezes. Cozinhas de campanha servindo milhares de refeições quentes por dia. Equipes da Cruz Vermelha, unidades caninas, médicos que dormiram nos mesmos abrigos que seus pacientes. E esta semana, as primeiras 240 famílias voltaram a ter um teto próprio — a primeira de milhares que ainda faltam, mas a primeira, enfim.</p>
<p>Esse é o outro terremoto: o das pessoas que se movem, sem esperar que peçam, em direção a quem mais precisa.</p>
<h3>O que Bolívar diria, talvez</h3>
<p>Há mais de dois séculos, um jovem de 22 anos, de pé em Roma, fez um juramento que poucos lembram palavra por palavra, mas que todos reconhecem em espírito: que não daria descanso ao seu braço nem repouso à sua alma até romper as correntes que oprimiam sua terra.</p>
<p>Ele não falava de um terremoto. Falava de outro tipo de ruína, e de outro tipo de reconstrução. Mas a promessa é a mesma que sustenta hoje quem remove escombros com as mãos, quem distribui água de um caminhão emprestado, quem abre sua casa a uma família que não conhecia há um mês: <strong>a certeza de que um povo que se sustenta a si mesmo não desaba por completo, mesmo quando as paredes desabam.</strong></p>
<h3>O que vem a seguir</h3>
<p>Trinta dias não encerram um luto. A reconstrução da Venezuela — a material, e a do coração de quem perdeu os seus — não se mede em semanas, mas em anos. Este site continuará aqui para acompanhá-la, com os mesmos números verificados e a mesma honestidade com que começamos.</p>
<p>Hoje, no aniversário do Libertador, a liberdade que mais importa é mais simples do que qualquer feito histórico: a de saber que, aconteça o que acontecer, alguém mais estará ali para ajudar a reerguer o que caiu.</p>
<p style="margin-top:18px;font-style:italic;">Com todo o respeito e toda a força,<br><strong>Ayuda Venezuela</strong></p>`,
  },
};

const SUPPORTED_LANGS = ['es', 'en', 'fr', 'de', 'pt'];
const LANG_ATTR = { es: 'es-VE', en: 'en', fr: 'fr', de: 'de', pt: 'pt' };
const LANG_LABEL = { es: 'ES', en: 'EN', fr: 'FR', de: 'DE', pt: 'PT' };

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key]) el.textContent = TRANSLATIONS[lang][key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (TRANSLATIONS[lang][key]) el.innerHTML = TRANSLATIONS[lang][key];
  });

  document.documentElement.setAttribute('lang', LANG_ATTR[lang] || lang);
  localStorage.setItem('ayudave_lang', lang);

  const select = document.getElementById('langSelect');
  if (select) select.value = lang;
}

function selectLanguage(lang) {
  setLanguage(lang);
}

/**
 * Orden de prioridad para decidir el idioma inicial:
 *   1. ?lang= en la URL (para que hreflang/enlaces externos funcionen)
 *   2. Idioma guardado en localStorage (elección manual previa)
 *   3. Idioma del navegador, si es uno de los 5 soportados
 *   4. Español, por defecto (audiencia principal: Venezuela)
 */
function initLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
    setLanguage(urlLang);
    return;
  }

  const saved = localStorage.getItem('ayudave_lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    setLanguage(saved);
    return;
  }

  const browserLang = (navigator.language || 'es').slice(0, 2);
  setLanguage(SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'es');
}

document.addEventListener('DOMContentLoaded', initLanguage);

// ═══════════════════════════════════════════════════════════════
//  FRANJA INTERNACIONAL — dinámica, leída de EMERGENCY_DATA
//  (antes era texto fijo; ahora se sincroniza solo con sync_cifras,
//  sin necesitar otro parche manual cada vez que cambian los datos)
// ═══════════════════════════════════════════════════════════════
function renderIntlStrip() {
  const el = document.getElementById('intl-strip-dynamic');
  const d = EMERGENCY_DATA.official_stats;
  const fmt = n => (n ?? 0).toLocaleString('es-VE');

  if (el) {
    el.innerHTML = `<strong>${fmt(d.countries_supporting)}+ países apoyando:</strong> `
      + `${fmt(d.rescue_personnel)} rescatistas internacionales · `
      + `${fmt(d.k9_units)} equipos K9 · `
      + `${fmt(d.humanitarian_tons)} ton de ayuda humanitaria · `
      + `${fmt(d.aftershocks_total)}+ réplicas registradas`;
  }

  // Mismo dato, en el stat-chip del banner principal (antes hardcodeado)
  const statCountries = document.getElementById('stat-countries');
  if (statCountries) statCountries.textContent = fmt(d.countries_supporting);
}

document.addEventListener('DOMContentLoaded', renderIntlStrip);

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

// =================================================================
//  PIEZA CONMEMORATIVA -- 30 dias / natalicio de Bolivar (24 jul 2026)
// =================================================================
function renderMemorial() {
  const activeLang = localStorage.getItem('ayudave_lang') || 'es';
  setLanguage(activeLang);
}

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
//  FASE 1 · BLOQUE B — INDICADOR DE FRESCURA DINÁMICO
// ═══════════════════════════════════════════════════════════════
/**
 * Calcula "hace cuánto tiempo" en español, con umbrales de color:
 *   < 1 hora   → "Verificado hace X minutos"  (verde  — fresh)
 *   < 24 horas → "Actualizado hace X horas"    (azul   — recent)
 *   < 72 horas → "Actualizado hace X días"     (ámbar  — stale)
 *   >= 72 horas→ "Sin actualizar hace X días"  (rojo   — old, alerta visual)
 */
function renderFreshness(isoDateString, elementId = 'freshness-indicator') {
  const el = document.getElementById(elementId);
  if (!el) return;

  const then = new Date(isoDateString).getTime();
  const now  = Date.now();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr  = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  let text, cls;

  if (diffMin < 60) {
    text = diffMin <= 1 ? 'Verificado hace instantes' : `Verificado hace ${diffMin} min`;
    cls = 'fresh';
  } else if (diffHr < 24) {
    text = `Actualizado hace ${diffHr} hora${diffHr !== 1 ? 's' : ''}`;
    cls = 'recent';
  } else if (diffDay < 3) {
    text = `Actualizado hace ${diffDay} día${diffDay !== 1 ? 's' : ''}`;
    cls = 'stale';
  } else {
    text = `⚠ Sin actualizar hace ${diffDay} días`;
    cls = 'old';
  }

  el.textContent = text;
  el.className = `freshness-badge ${cls}`;
}

function initFreshnessIndicator() {
  if (!window.EMERGENCY_DATA?.generated_at) return;
  renderFreshness(window.EMERGENCY_DATA.generated_at);
  setInterval(() => renderFreshness(window.EMERGENCY_DATA.generated_at), 60000);
}

document.addEventListener('DOMContentLoaded', initFreshnessIndicator);

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
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;"><span id="freshness-indicator" class="freshness-badge">Cargando...</span></div>
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

    <!-- ═══════ FASE 2 · BLOQUE E: ORGANIZACIONES INTERNACIONALES ═══════ -->
    <div class="section-label" data-i18n="ngo.title" style="padding:0 0 10px;">Organizaciones internacionales de ayuda</div>
    <div class="ngo-grid" style="padding:0 0 16px;">
      <a href="https://www.wck.org" target="_blank" rel="noopener noreferrer" class="ngo-card">
        <div class="ngo-card-icon" style="background:rgba(244,162,97,0.15);color:#f4a261;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
        </div>
        <div class="ngo-card-body">
          <div class="ngo-card-name">World Central Kitchen</div>
          <div class="ngo-card-desc" data-i18n="ngo.wck.desc">Comidas de emergencia en zonas de desastre</div>
        </div>
        <svg class="ngo-card-ext" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
      <a href="https://www.directrelief.org" target="_blank" rel="noopener noreferrer" class="ngo-card">
        <div class="ngo-card-icon" style="background:rgba(45,198,83,0.15);color:#2dc653;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <div class="ngo-card-body">
          <div class="ngo-card-name">Direct Relief</div>
          <div class="ngo-card-desc" data-i18n="ngo.directrelief.desc">Suministros médicos de emergencia</div>
        </div>
        <svg class="ngo-card-ext" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
      <a href="https://www.ifrc.org" target="_blank" rel="noopener noreferrer" class="ngo-card">
        <div class="ngo-card-icon" style="background:rgba(230,57,70,0.15);color:#e63946;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
        </div>
        <div class="ngo-card-body">
          <div class="ngo-card-name">IFRC / Cruz Roja Internacional</div>
          <div class="ngo-card-desc" data-i18n="ngo.ifrc.desc">Rescate, hospitales de campaña, coordinación global</div>
        </div>
        <svg class="ngo-card-ext" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
      <a href="https://www.wfp.org" target="_blank" rel="noopener noreferrer" class="ngo-card">
        <div class="ngo-card-icon" style="background:rgba(76,201,240,0.15);color:#4cc9f0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <div class="ngo-card-body">
          <div class="ngo-card-name">Programa Mundial de Alimentos (PMA)</div>
          <div class="ngo-card-desc" data-i18n="ngo.wfp.desc">Seguridad alimentaria — llamamiento activo</div>
        </div>
        <svg class="ngo-card-ext" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>

    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;">Por estado / región</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">${regionsHTML}</div>
    <div style="font-size:10px;color:var(--text-muted);text-align:center;padding-bottom:4px;line-height:1.6;">
      Fuentes: FUNVISIS · MPPS · Cruz Roja IFRC · Cáritas · Prot. Civil · SOUTHCOM<br>
      Última actualización: ${new Date(EMERGENCY_DATA.generated_at).toLocaleString('es-VE')}
    </div>`;

  renderFreshness(EMERGENCY_DATA.generated_at);

  // Reaplicar idioma activo — el HTML de arriba se regenera con el
  // fallback en español; sin esto, cambiar a EN y navegar a Directorio
  // resetearía visualmente el idioma hasta el próximo toggle.
  const activeLang = localStorage.getItem('ayudave_lang');
  if (activeLang) setLanguage(activeLang);
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
