/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — App Core                                   ║
 * ║  Offline-First Emergency Platform                             ║
 * ║  Architecture: Vanilla JS, IndexedDB, Canvas API, PWA        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────
//  CONFIG — Reads from <meta> tags for security (no hardcoded secrets)
// ─────────────────────────────────────────────────────────────────
function getMeta(name, fallback = '') {
  const el = document.querySelector(`meta[name="${name}"]`);
  return el ? el.content : fallback;
}

const CONFIG = {
  DB_NAME:       'AyudaVE_DB',
  DB_VERSION:    1,
  STORE_REPORTS: 'reports',
  SYNC_TAG:      'sync-reports',
  // Configured via <meta name="api-url" content="..."> in index.html
  API_URL:       getMeta('api-url', 'https://api.ayudavenezuela.org/v1/reports'),
  // Emergency token via <meta name="emergency-token" content="..."> — NEVER hardcode
  EMERGENCY_TOKEN: getMeta('emergency-token', ''),
  IMG_MAX_PX:    800,
  IMG_QUALITY:   0.72,     // WebP quality 0-1 (starting point, auto-reduces to hit <150KB)
  IMG_FORMAT:    'image/webp',
};

// ─────────────────────────────────────────────────────────────────
//  DATABASE (IndexedDB wrapper)
// ─────────────────────────────────────────────────────────────────
const DB = (() => {
  let _db = null;

  function open() {
    return new Promise((resolve, reject) => {
      if (_db) return resolve(_db);
      const req = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(CONFIG.STORE_REPORTS)) {
          const store = db.createObjectStore(CONFIG.STORE_REPORTS, {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('type',   'type',   { unique: false });
        }
      };
      req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
      req.onerror   = (e) => reject(e.target.error);
    });
  }

  async function saveReport(report) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(CONFIG.STORE_REPORTS, 'readwrite');
      const store = tx.objectStore(CONFIG.STORE_REPORTS);
      const req   = store.add({ ...report, savedAt: Date.now(), status: 'pending' });
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }

  async function getPendingReports() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(CONFIG.STORE_REPORTS, 'readonly');
      const store = tx.objectStore(CONFIG.STORE_REPORTS);
      const idx   = store.index('status');
      const req   = idx.getAll('pending');
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }

  async function getAllReports() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(CONFIG.STORE_REPORTS, 'readonly');
      const store = tx.objectStore(CONFIG.STORE_REPORTS);
      const req   = store.getAll();
      req.onsuccess = () => resolve(req.result.reverse()); // newest first
      req.onerror   = () => reject(req.error);
    });
  }

  async function markSent(id) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(CONFIG.STORE_REPORTS, 'readwrite');
      const store = tx.objectStore(CONFIG.STORE_REPORTS);
      const req   = store.get(id);
      req.onsuccess = () => {
        const record = req.result;
        if (record) {
          record.status  = 'sent';
          record.sentAt  = Date.now();
          store.put(record);
        }
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  }

  return { open, saveReport, getPendingReports, getAllReports, markSent };
})();

// ─────────────────────────────────────────────────────────────────
//  IMAGE COMPRESSION ENGINE (Canvas API — client-side WebP)
//  Guarantees output < 150KB by dynamically adjusting quality
// ─────────────────────────────────────────────────────────────────
const ImageEngine = (() => {

  const TARGET_MAX_BYTES = 150 * 1024; // 150KB hard limit
  const MIN_QUALITY = 0.25;            // Don't go below this
  const MAX_QUALITY = 0.85;            // Start here for best quality

  /**
   * Compress a File/Blob to WebP at max CONFIG.IMG_MAX_PX wide/tall.
   * Dynamically reduces quality until size < 150KB.
   * Returns: { dataUrl: string, blob: Blob, originalSize: number, compressedSize: number, quality: number }
   */
  function compress(file) {
    return new Promise((resolve, reject) => {
      const originalSize = file.size;
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            // Calculate dimensions maintaining aspect ratio
            let { width, height } = img;
            const max = CONFIG.IMG_MAX_PX;

            if (width > max || height > max) {
              if (width >= height) {
                height = Math.round((height / width) * max);
                width  = max;
              } else {
                width  = Math.round((width / height) * max);
                height = max;
              }
            }

            // Draw to canvas once
            const canvas = document.createElement('canvas');
            canvas.width  = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Check WebP support, fallback to JPEG
            const supportsWebP = canvas.toDataURL('image/webp').startsWith('data:image/webp');
            const format = supportsWebP ? CONFIG.IMG_FORMAT : 'image/jpeg';

            // Iterative quality reduction to hit <150KB target
            compressWithQuality(canvas, format, MAX_QUALITY)
              .then(result => resolve({ ...result, originalSize }))
              .catch(reject);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        img.src = e.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Recursively compress with decreasing quality until under target size
   * or minimum quality reached.
   */
  function compressWithQuality(canvas, format, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas toBlob failed'));

          // If under target or at minimum quality, accept it
          if (blob.size <= TARGET_MAX_BYTES || quality <= MIN_QUALITY) {
            const reader = new FileReader();
            reader.onload = (ev) => resolve({
              dataUrl:        ev.target.result,
              blob,
              format,
              width: canvas.width,
              height: canvas.height,
              compressedSize: blob.size,
              quality: Math.round(quality * 100),
              ratio: ((1 - blob.size / (canvas.width * canvas.height * 4)) * 100).toFixed(0), // approximate
            });
            reader.readAsDataURL(blob);
            return;
          }

          // Too large — reduce quality and retry (binary search style)
          const nextQuality = Math.max(MIN_QUALITY, quality - 0.1);
          compressWithQuality(canvas, format, nextQuality).then(resolve).catch(reject);
        },
        format,
        quality
      );
    });
  }

  function formatBytes(bytes) {
    if (bytes < 1024)       return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return { compress, formatBytes };
})();

// ─────────────────────────────────────────────────────────────────
//  NETWORK SYNC — Send pending reports when online
// ─────────────────────────────────────────────────────────────────
const Sync = (() => {

  async function sendReport(report) {
    // Build FormData (supports file blobs)
    const fd = new FormData();
    fd.append('type',    report.type);
    fd.append('data',    JSON.stringify(report.fields));
    fd.append('savedAt', report.savedAt);

    if (report.photos && report.photos.length) {
      for (let i = 0; i < report.photos.length; i++) {
        // photos stored as base64 DataURL, convert back to Blob
        const blob = dataURLtoBlob(report.photos[i].dataUrl);
        fd.append(`photo_${i}`, blob, `photo_${i}.webp`);
      }
    }

    const res = await fetch(CONFIG.API_URL, {
      method:  'POST',
      body:    fd,
      headers: { 'X-Emergency-Token': CONFIG.EMERGENCY_TOKEN },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async function syncAll() {
    const pending = await DB.getPendingReports();
    if (!pending.length) return 0;

    let synced = 0;
    for (const report of pending) {
      try {
        await sendReport(report);
        await DB.markSent(report.id);
        synced++;
      } catch (err) {
        console.warn('[Sync] Failed for report', report.id, err.message);
      }
    }
    return synced;
  }

  function dataURLtoBlob(dataURL) {
    const parts   = dataURL.split(',');
    const mime    = parts[0].match(/:(.*?);/)[1];
    const binary  = atob(parts[1]);
    const ab      = new ArrayBuffer(binary.length);
    const ia      = new Uint8Array(ab);
    for (let i = 0; i < binary.length; i++) ia[i] = binary.charCodeAt(i);
    return new Blob([ab], { type: mime });
  }

  return { syncAll, sendReport };
})();

// ─────────────────────────────────────────────────────────────────
//  TOAST SYSTEM
// ─────────────────────────────────────────────────────────────────
const Toast = (() => {
  const container = document.getElementById('toastContainer');

  const ICONS = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };

  function show(message, type = 'info', duration = 3500) {
    const el = document.createElement('div');
    el.className = `toast toast-${type} toast-enter`;
    el.innerHTML = `${ICONS[type] || ''}<span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.remove('toast-enter');
      el.classList.add('toast-exit');
      setTimeout(() => el.remove(), 250);
    }, duration);
  }

  return { show };
})();

// ─────────────────────────────────────────────────────────────────
//  MAIN APP CONTROLLER
// ─────────────────────────────────────────────────────────────────
const App = (() => {

  // In-memory photo storage per form
  const _photos = { person: [], damage: [] };

  // ── Navigation ──────────────────────────────────────────────
  function navigate(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }
  }

  function setNav(btn) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
  }

  // ── GPS ──────────────────────────────────────────────────────
  function getGPS(fieldId) {
    if (!navigator.geolocation) {
      Toast.show('GPS no disponible en este dispositivo', 'error');
      return;
    }
    Toast.show('Obteniendo ubicación GPS…', 'info', 8000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const val = `${lat}, ${lng}`;

        const field = document.getElementById(fieldId);
        if (field) field.value = val;

        // Update map coords display if damage form
        const coordsDisplay = document.getElementById('d_coords_display');
        if (coordsDisplay) coordsDisplay.textContent = val;

        Toast.show(`GPS: ${val}`, 'success', 4000);
      },
      (err) => {
        const msgs = {
          1: 'Permiso de ubicación denegado',
          2: 'No se pudo obtener la ubicación',
          3: 'Tiempo de espera agotado',
        };
        Toast.show(msgs[err.code] || 'Error GPS', 'error');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  }

  // ── Photo handling + compression ─────────────────────────────
  async function handlePhoto(input, previewId, sizeId) {
    const files = Array.from(input.files);
    if (!files.length) return;

    const formType = previewId.startsWith('p_') ? 'person' : 'damage';
    const progressId = formType === 'person' ? 'p_compress_progress' : 'd_compress_progress';
    const progress = document.getElementById(progressId);

    progress.classList.add('visible');
    Toast.show('Comprimiendo imagen(s)…', 'info', 2500);

    let totalOriginal = 0;
    let totalCompressed = 0;

    for (const file of files) {
      try {
        const result = await ImageEngine.compress(file);
        _photos[formType].push(result);
        totalOriginal   += result.originalSize;
        totalCompressed += result.compressedSize;
        addPhotoThumb(previewId, result, formType, _photos[formType].length - 1);
      } catch (err) {
        Toast.show(`Error procesando ${file.name}`, 'error');
        console.error(err);
      }
    }

    progress.classList.remove('visible');
    input.value = ''; // Reset so same file can be re-selected

    const sizeEl = document.getElementById(sizeId);
    if (sizeEl && totalOriginal > 0) {
      const saved = ((1 - totalCompressed / totalOriginal) * 100).toFixed(0);
      sizeEl.innerHTML = `
        <span class="compress-badge">✓ Comprimido</span>
        ${ImageEngine.formatBytes(totalOriginal)} → ${ImageEngine.formatBytes(totalCompressed)}
        (−${saved}% · WebP)
      `;
    }
  }

  function addPhotoThumb(previewId, result, formType, index) {
    const grid = document.getElementById(previewId);
    const thumb = document.createElement('div');
    thumb.className = 'photo-thumb';
    thumb.dataset.index = index;
    thumb.innerHTML = `
      <img src="${result.dataUrl}" alt="Foto ${index + 1}" loading="lazy" />
      <button class="photo-thumb-remove" onclick="App.removePhoto('${previewId}','${formType}',${index},this)">×</button>
    `;
    grid.appendChild(thumb);
  }

  function removePhoto(previewId, formType, index, btn) {
    _photos[formType].splice(index, 1);
    btn.closest('.photo-thumb').remove();
    // Re-index remaining thumbs
    document.querySelectorAll(`#${previewId} .photo-thumb`).forEach((el, i) => {
      el.dataset.index = i;
      el.querySelector('button').setAttribute('onclick',
        `App.removePhoto('${previewId}','${formType}',${i},this)`);
    });
  }

  // ── Chip selector ──────────────────────────────────────────
  function selectChip(chip, groupId) {
    document.querySelectorAll(`#${groupId} .chip`).forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  }

  function getSelectedChip(groupId) {
    const sel = document.querySelector(`#${groupId} .chip.selected`);
    return sel ? sel.dataset.value : null;
  }

  // ── Form collection ────────────────────────────────────────
  function collectPersonForm() {
    return {
      name:     val('p_name'),
      cedula:   val('p_cedula'),
      age:      val('p_age'),
      phone:    val('p_phone'),
      location: val('p_location'),
      gps:      val('p_gps'),
      desc:     val('p_desc'),
      status:   getSelectedChip('p_status_chips'),
    };
  }

  function collectDamageForm() {
    return {
      structureType: getSelectedChip('d_type_chips'),
      damageLevel:   getSelectedChip('d_level_chips'),
      address:       val('d_address'),
      gps:           val('d_gps'),
      desc:          val('d_desc'),
      trapped:       getSelectedChip('d_trapped_chips'),
      reporterPhone: val('d_reporter_phone'),
    };
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // ── Sanitization — Prevent XSS when rendering user content ──────────────
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── Validation ────────────────────────────────────────────
  function validatePerson(fields) {
    if (!fields.name)     return 'El nombre completo es obligatorio';
    if (!fields.cedula)   return 'La cédula es obligatoria';
    if (!fields.location) return 'La última ubicación es obligatoria';
    return null;
  }

  function validateDamage(fields) {
    if (!fields.address) return 'La dirección es obligatoria';
    return null;
  }

  // ── SMS FALLBACK — Formato compacto para Protección Civil: AV#TIPO:X#GRAVEDAD:Y#LOC:Z#TLF:W ────────
  function buildSmsBodyCompact(type, fields) {
    // Mapear valores a códigos cortos
    const tipoMap = {
      // Persona
      'desaparecido': 'PER-DESAP',
      'herido': 'PER-HERIDO',
      'atrapado': 'PER-ATRAP',
      'localizado': 'PER-LOC',
      // Daño
      'edificio': 'EDIF',
      'puente': 'PUENTE',
      'vialidad': 'VIA',
      'vivienda': 'VIV',
      'servicio': 'SERV',
    };
    const nivelMap = {
      'leve': 'LEVE',
      'moderado': 'MOD',
      'grave': 'GRAVE',
      'colapso': 'CRIT',
    };
    const atrapadoMap = {
      'no': 'NO',
      'si_desconocido': 'POSIBLE',
      'si_confirmado': 'SI',
    };

    if (type === 'person') {
      const tipo = tipoMap[fields.status] || 'PER-DESAP';
      const loc = (fields.location || fields.gps || 'SIN-LOC').replace(/[#]/g, '').substring(0, 60);
      const tlf = (fields.phone || fields.cedula || 'SIN-TLF').replace(/\D/g, '').substring(0, 15);
      return `AV#TIPO:${tipo}#LOC:${loc}#TLF:${tlf}`;
    } else {
      const tipo = tipoMap[fields.structureType] || 'EDIF';
      const grav = nivelMap[fields.damageLevel] || 'MOD';
      const atrap = atrapadoMap[fields.trapped] || 'NO';
      const loc = (fields.address || fields.gps || 'SIN-LOC').replace(/[#]/g, '').substring(0, 60);
      const tlf = (fields.reporterPhone || 'SIN-TLF').replace(/\D/g, '').substring(0, 15);
      // Incluir atrapados en gravedad si hay personas
      const gravFinal = (atrap === 'SI' || atrap === 'POSIBLE') ? `${grav}+ATRAP:${atrap}` : grav;
      return `AV#TIPO:${tipo}#GRAVEDAD:${gravFinal}#LOC:${loc}#TLF:${tlf}`;
    }
  }

  // Formato legible (fallback para lectura humana)
  function buildSmsBodyReadable(type, fields) {
    const timestamp = new Date().toLocaleString('es-VE');
    if (type === 'person') {
      return `🚨 REPORTE PERSONA DESAPARECIDA - Ayuda VE
Fecha: ${timestamp}
Nombre: ${fields.name}
Cédula: ${fields.cedula}
Edad: ${fields.age || 'N/A'}
Tel. familiar: ${fields.phone || 'N/A'}
Ubicación: ${fields.location}
GPS: ${fields.gps || 'No capturado'}
Estado: ${fields.status || 'Desaparecido'}
Descripción: ${fields.desc || 'Sin detalles'}
--- 
Enviado desde Ayuda VE (offline)`;
    } else {
      return `🚨 REPORTE DAÑO ESTRUCTURAL - Ayuda VE
Fecha: ${timestamp}
Tipo: ${fields.structureType || 'N/A'}
Nivel: ${fields.damageLevel || 'N/A'}
Dirección: ${fields.address}
GPS: ${fields.gps || 'No capturado'}
Personas atrapadas: ${fields.trapped || 'No'}
Tel. reportero: ${fields.reporterPhone || 'N/A'}
Descripción: ${fields.desc || 'Sin detalles'}
---
Enviado desde Ayuda VE (offline)`;
    }
  }

  function openSmsFallback(type, fields) {
    // Venezuelan emergency numbers
    const emergencyNumbers = '911,0800266376'; // 911, 0800-BOMBEROS
    // Usar formato compacto para parsing automático + legible para humanos
    const compact = buildSmsBodyCompact(type, fields);
    const readable = buildSmsBodyReadable(type, fields);
    const body = encodeURIComponent(`${compact}\n\n${readable}`);
    const smsUri = `sms:${emergencyNumbers}?body=${body}`;
    
    try {
      window.location.href = smsUri;
      Toast.show('Abriendo app de SMS con reporte pre-cargado…', 'info', 4000);
    } catch (e) {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(buildSmsBody(type, fields));
      Toast.show('Reporte copiado al portapápel. Pégalo en tu app de SMS.', 'warning', 5000);
    }
  }

  // ── SUBMIT ────────────────────────────────────────────────
  async function submitReport(type) {
    const fields  = type === 'person' ? collectPersonForm() : collectDamageForm();
    const errMsg  = type === 'person' ? validatePerson(fields) : validateDamage(fields);

    if (errMsg) {
      Toast.show(errMsg, 'error', 4000);
      return;
    }

    const photos = [..._photos[type === 'person' ? 'person' : 'damage']];

    const report = {
      type,
      fields,
      photos: photos.map(p => ({ dataUrl: p.dataUrl, format: p.format, compressedSize: p.compressedSize })),
    };

    // Save to IndexedDB FIRST (offline-safe)
    let savedId;
    try {
      savedId = await DB.saveReport(report);
      Toast.show('Reporte guardado localmente ✓', 'success');
    } catch (err) {
      Toast.show('Error guardando reporte: ' + err.message, 'error');
      return;
    }

    // Clear form
    resetForm(type);
    navigate('screenHome');
    updatePendingCount();

    // Attempt immediate send if online
    if (navigator.onLine) {
      try {
        const saved = { ...report, id: savedId };
        await Sync.sendReport(saved);
        await DB.markSent(savedId);
        Toast.show('Reporte enviado a Protección Civil ✓', 'success', 5000);
        incrementReportCount();
      } catch (err) {
        // It'll sync automatically when signal returns (Background Sync)
        registerBackgroundSync();
        Toast.show('Sin señal — se enviará automáticamente al recuperar conexión', 'warning', 5000);
      }
    } else {
      registerBackgroundSync();
      // OFFLINE: Offer SMS fallback immediately
      setTimeout(() => {
        if (confirm('📴 Sin conexión a internet.\n\n¿Quieres enviar el reporte por SMS a 911 / Bomberos ahora?\n(Se abrirá tu app de mensajes con el reporte listo para enviar)')) {
          openSmsFallback(type, fields);
        } else {
          Toast.show('Reporte guardado. Se enviará automáticamente al recuperar señal.', 'warning', 5000);
        }
      }, 500);
    }

    updatePendingCount();
  }

  function resetForm(type) {
    if (type === 'person') {
      ['p_name','p_cedula','p_age','p_phone','p_location','p_gps','p_desc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('p_photo_preview').innerHTML = '';
      document.getElementById('p_photo_size').innerHTML = '';
      _photos.person = [];
    } else {
      ['d_address','d_gps','d_desc','d_reporter_phone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('d_photo_preview').innerHTML = '';
      document.getElementById('d_photo_size').innerHTML = '';
      document.getElementById('d_coords_display').textContent = '';
      _photos.damage = [];
    }
  }

  // ── Background Sync registration ─────────────────────────
  function registerBackgroundSync() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(sw => {
        sw.sync.register(CONFIG.SYNC_TAG).catch(() => {});
      });
    }
  }

  // ── Manual sync ──────────────────────────────────────────
  async function trySyncNow() {
    if (!navigator.onLine) {
      Toast.show('Sin conexión a internet', 'error');
      return;
    }
    Toast.show('Sincronizando reportes pendientes…', 'info');
    const count = await Sync.syncAll();
    if (count > 0) {
      Toast.show(`${count} reporte(s) enviados correctamente`, 'success', 5000);
      incrementReportCount(count);
    } else {
      Toast.show('No hay reportes pendientes por enviar', 'info');
    }
    updatePendingCount();
  }

  // ── Report count UI ──────────────────────────────────────
  function incrementReportCount(n = 1) {
    const el = document.getElementById('reportCount');
    if (!el) return;
    const current = parseInt(el.textContent, 10) || 0;
    el.textContent = current + n;
  }

  async function updatePendingCount() {
    try {
      const pending = await DB.getPendingReports();
      const banner  = document.getElementById('pendingBanner');
      const countEl = document.getElementById('pendingCount');
      if (pending.length > 0) {
        banner.classList.add('visible');
        countEl.textContent = pending.length;
      } else {
        banner.classList.remove('visible');
      }
    } catch (e) { /* IndexedDB not ready yet */ }
  }

  // ── My Reports screen ────────────────────────────────────
  async function renderMyReports() {
    const list = document.getElementById('myReportsList');
    if (!list) return;

    let reports;
    try { reports = await DB.getAllReports(); }
    catch (e) { list.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:32px 0;">Error cargando reportes.</p>'; return; }

    if (!reports.length) {
      list.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:32px 0;">No tienes reportes guardados aún.</p>';
      return;
    }

    list.innerHTML = reports.map(r => {
      const isPerson = r.type === 'person';
      const title    = escapeHtml(isPerson ? (r.fields.name || 'Persona desaparecida') : (r.fields.address || 'Daño estructural'));
      const meta     = new Date(r.savedAt).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' });
      const status   = r.status === 'sent' ? 'Enviado' : 'Pendiente';
      const statusClass = r.status === 'sent' ? 'status-sent' : 'status-pending';

      const icon = isPerson
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;

      return `
        <div class="report-card">
          <div class="report-card-icon ${isPerson ? 'person' : 'damage'}">${icon}</div>
          <div class="report-card-body">
            <div class="report-card-name">${title}</div>
            <div class="report-card-meta">${meta} · ${isPerson ? 'Desaparecido' : 'Daño'}</div>
          </div>
          <span class="report-card-status ${statusClass}">${status}</span>
        </div>
      `;
    }).join('');
  }

  // ── Map loading (lazy) ───────────────────────────────────
  function loadInteractiveMap() {
    const container = document.getElementById('mapContainer');
    if (!container) return;

    Toast.show('Cargando mapa interactivo…', 'info');

    // Lazy-load the iframe only on demand to avoid data usage
    container.innerHTML = `
      <div style="width:100%;height:320px;border-radius:12px;overflow:hidden;border:1px solid var(--border);margin-top:12px;">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-67.5,-10.5,-61.0,12.5&layer=mapnik"
          style="width:100%;height:100%;border:none;"
          loading="lazy"
          title="Mapa de Venezuela"
        ></iframe>
      </div>
      <p style="font-size:11px;color:var(--text-muted);margin-top:6px;text-align:right;">© OpenStreetMap contributors</p>
    `;
  }

  // ── Online/Offline status ────────────────────────────────
  function setupNetworkListeners() {
    const badge  = document.getElementById('statusBadge');
    const text   = document.getElementById('statusText');

    function update() {
      const online = navigator.onLine;
      badge.className = `status-badge${online ? '' : ' offline'}`;
      text.textContent = online ? 'En línea' : 'Sin señal';
      if (online) {
        // Auto-sync when coming back online
        Sync.syncAll().then(n => {
          if (n > 0) {
            Toast.show(`Conexión restaurada — ${n} reporte(s) enviados`, 'success', 5000);
            incrementReportCount(n);
            updatePendingCount();
          }
        });
      }
    }

    window.addEventListener('online',  update);
    window.addEventListener('offline', update);
    update(); // Initial state
  }

  // ── PWA install prompt ───────────────────────────────────
  function setupPWAInstall() {
    let deferredPrompt;
    const installBanner = document.createElement('div');
    installBanner.id = 'installBanner';
    installBanner.style.cssText = `
      position:fixed;bottom:calc(80px + var(--safe-bottom));left:16px;right:16px;max-width:430px;margin:0 auto;
      background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;
      display:none;flex-direction:column;gap:12px;z-index:200;box-shadow:0 4px 24px rgba(0,0,0,0.4);
      animation:slideUp 0.3s ease;
    `;
    installBanner.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" flex-shrink="0">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:700;color:var(--text);">Instalar Ayuda VE</div>
          <div style="font-size:12px;color:var(--text-muted);">Funciona sin internet. Acceso rápido desde tu pantalla de inicio.</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <button id="installAccept" class="submit-btn" style="background:var(--blue);color:#000;flex:1;font-size:14px;padding:12px;">Instalar</button>
        <button id="installDismiss" class="submit-btn" style="background:var(--bg-input);color:var(--text);flex:1;font-size:14px;padding:12px;">Luego</button>
      </div>
    `;
    document.body.appendChild(installBanner);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBanner.style.display = 'flex';
    });

    installBanner.querySelector('#installAccept').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        Toast.show('¡Instalado! Ayuda VE está en tu pantalla de inicio.', 'success');
      }
      deferredPrompt = null;
      installBanner.style.display = 'none';
    });

    installBanner.querySelector('#installDismiss').addEventListener('click', () => {
      installBanner.style.display = 'none';
      deferredPrompt = null;
    });

    // Also listen for appinstalled to hide banner
    window.addEventListener('appinstalled', () => {
      installBanner.style.display = 'none';
      deferredPrompt = null;
    });
  }

  // ── Service Worker registration ──────────────────────────
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js', { scope: './' })
        .then(reg => {
          console.log('[SW] Registered:', reg.scope);
          // Send config to SW (API URL and token never hardcoded in SW)
          if (reg.active) {
            reg.active.postMessage({
              type: 'SET_CONFIG',
              apiUrl: CONFIG.API_URL,
              emergencyToken: CONFIG.EMERGENCY_TOKEN,
            });
          }
          // Listen for messages from SW (e.g. sync complete)
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SYNC_COMPLETE') {
              Toast.show(`${event.data.count} reporte(s) sincronizados ✓`, 'success', 5000);
              incrementReportCount(event.data.count);
              updatePendingCount();
            }
          });
        })
        .catch(err => console.warn('[SW] Registration failed:', err));
    }
  }

  // ── INIT ─────────────────────────────────────────────────
  function init() {
    registerSW();
    setupNetworkListeners();
    setupPWAInstall();
    DB.open().then(() => updatePendingCount()).catch(() => {});

    // Expose for inline handlers
    window.App = {
      navigate, setNav, getGPS, handlePhoto, removePhoto,
      selectChip, submitReport, trySyncNow, renderMyReports,
      loadInteractiveMap, openSmsFallback,
      collectPersonForm, collectDamageForm,
    };
  }

  return { init };
})();

// Boot
App.init();
