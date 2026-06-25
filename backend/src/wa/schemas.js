import { z } from 'zod';

// Esquema para validar mensaje entrante de WhatsApp
export const WaMessageSchema = z.object({
  object: z.string(),
  entry: z.array(z.object({
    id: z.string(),
    changes: z.array(z.object({
      value: z.object({
        messaging_product: z.string(),
        metadata: z.object({
          display_phone_number: z.string(),
          phone_number_id: z.string(),
        }),
        contacts: z.array(z.object({
          profile: z.object({ name: z.string() }),
          wa_id: z.string(),
        })).optional(),
        messages: z.array(z.object({
          from: z.string(),
          id: z.string(),
          timestamp: z.string(),
          type: z.enum(['text', 'image', 'location', 'interactive', 'button']),
          text: z.object({ body: z.string() }).optional(),
          image: z.object({
            mime_type: z.string(),
            sha256: z.string(),
            id: z.string(),
          }).optional(),
          location: z.object({
            latitude: z.number(),
            longitude: z.number(),
            name: z.string().optional(),
            address: z.string().optional(),
          }).optional(),
          interactive: z.object({
            type: z.enum(['list_reply', 'button_reply']),
            list_reply: z.object({ id: z.string(), title: z.string() }).optional(),
            button_reply: z.object({ id: z.string(), title: z.string() }).optional(),
          }).optional(),
        })),
      }),
      field: z.string(),
    })),
  })),
});

// Esquema para reporte parseado
export const ParsedReportSchema = z.object({
  type: z.enum(['person', 'damage']),
  fields: z.record(z.string()),
  cedula: z.string().optional(),
  source: z.literal('whatsapp'),
  wa_message_id: z.string(),
  wa_from: z.string(),
});

// Respuestas del bot
export const BOT_RESPONSES = {
  WELCOME: `🇻🇪 *Ayuda Venezuela - Emergencias*

Bienvenido. Soy el bot oficial de reporte de emergencias.

Para reportar, elige una opción:
1️⃣ Persona desaparecida/herida/atrapada
2️⃣ Daño estructural (edificio, puente, vialidad, vivienda)
3️⃣ Ver mis reportes

Responde con el *número* de la opción.`,

  ASK_PERSON_NAME: `📋 *Reporte: Persona*

Escribe el *nombre completo* de la persona:`,
  ASK_PERSON_CEDULA: `Escribe la *cédula* (ej: V-12345678):`,
  ASK_PERSON_AGE: `Edad (solo número, opcional):`,
  ASK_PERSON_PHONE: `Teléfono de familiar (ej: +58 412 000 0000):`,
  ASK_PERSON_LOCATION: `Última ubicación conocida (sector, ciudad, o envía tu *ubicación GPS* con el clip 📍):`,
  ASK_PERSON_STATUS: `Condición:
1️⃣ Desaparecido
2️⃣ Herido
3️⃣ Atrapado
4️⃣ Localizado
Responde con el número:`,
  ASK_PERSON_DESC: `Descripción física (ropa, señas, etc. Opcional):`,

  ASK_DAMAGE_TYPE: `🏗️ *Reporte: Daño Estructural*

Tipo de estructura:
1️⃣ Edificio
2️⃣ Puente
3️⃣ Vialidad
4️⃣ Vivienda
5️⃣ Servicio Público
Responde con el número:`,
  ASK_DAMAGE_LEVEL: `Nivel de daño:
1️⃣ Leve
2️⃣ Moderado
3️⃣ Grave
4️⃣ Colapso
Responde con el número:`,
  ASK_DAMAGE_ADDRESS: `Dirección exacta / Sector (o envía *ubicación GPS* 📍):`,
  ASK_DAMAGE_TRAPPED: `¿Hay personas atrapadas?
1️⃣ No
2️⃣ Posiblemente
3️⃣ Sí, confirmado
Responde con el número:`,
  ASK_DAMAGE_PHONE: `Tu teléfono de contacto (para que Protección Civil verifique):`,
  ASK_DAMAGE_DESC: `Describe el daño (grietas, derrumbes, inundación, etc.):`,

  CONFIRM_PERSON: (data) => `✅ *Resumen - Persona*
Nombre: ${data.name}
Cédula: ${data.cedula}
Edad: ${data.age || 'N/A'}
Tel. familiar: ${data.phone || 'N/A'}
Ubicación: ${data.location}
Estado: ${data.status}
Descripción: ${data.desc || 'Sin detalles'}

¿Confirmar envío?
1️⃣ Sí, enviar
2️⃣ Cancelar`,

  CONFIRM_DAMAGE: (data) => `✅ *Resumen - Daño Estructural*
Tipo: ${data.structureType}
Nivel: ${data.damageLevel}
Dirección: ${data.address}
Atrapados: ${data.trapped}
Tel. reportero: ${data.reporterPhone || 'N/A'}
Descripción: ${data.desc || 'Sin detalles'}

¿Confirmar envío?
1️⃣ Sí, enviar
2️⃣ Cancelar`,

  SUCCESS: `✅ *Reporte enviado correctamente*

Tu reporte ha sido registrado y enviado a Protección Civil.
Número de caso: *{caseId}*

Si no tienes señal de datos, el sistema lo enviará automáticamente al recuperar conexión.
También puedes usar el botón "Enviar por SMS" en la app web.

Gracias por ayudar. 🇻🇪`,

  ERROR_DUPLICATE: `⚠️ *Cédula ya registrada*

Ya existe un reporte activo con esta cédula.
Si es una actualización, contacta al 911 directamente.`,

  ERROR_GENERIC: `❌ Error procesando tu reporte. Intenta de nuevo o usa la app web: https://ayudavenezuela.org`,

  CANCELLED: `❌ Reporte cancelado. Escribe *HOLA* para empezar de nuevo.`,

  INVALID_OPTION: `❌ Opción no válida. Escribe el número correspondiente.`,

  MY_REPORTS_EMPTY: `📭 No tienes reportes registrados.`,

  MY_REPORTS_HEADER: `📋 *Tus reportes:*\n\n`,
};

export const FLOW_STEPS = {
  PERSON: ['name', 'cedula', 'age', 'phone', 'location', 'status', 'desc', 'confirm'],
  DAMAGE: ['type', 'level', 'address', 'trapped', 'phone', 'desc', 'confirm'],
};

export const FIELD_LABELS = {
  PERSON: {
    name: 'Nombre',
    cedula: 'Cédula',
    age: 'Edad',
    phone: 'Tel. familiar',
    location: 'Ubicación',
    status: 'Estado',
    desc: 'Descripción',
  },
  DAMAGE: {
    type: 'Tipo estructura',
    level: 'Nivel daño',
    address: 'Dirección',
    trapped: 'Atrapados',
    phone: 'Tel. contacto',
    desc: 'Descripción',
  },
};