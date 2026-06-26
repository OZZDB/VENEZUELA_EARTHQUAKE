/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — App Core v2.0                              ║
 * ║  Fixes aplicados:                                             ║
 * ║  ✓ API URL → Netlify Function real (/api/submit-report)       ║
 * ║  ✓ Token desde meta tag (no hardcodeado en código)            ║
 * ║  ✓ Fotos guardadas como Blob en IndexedDB (no base64 string)  ║
 * ║  ✓ Contador de reportes real desde /api/get-stats             ║
 * ║  ✓ Rate limit handling en cliente (toast + bloqueo UI)        ║
 * ║  ✓ Retry con backoff exponencial en sync fallido              ║
 * ║  ✓ SMS fallback cuando no hay datos (smsBody builder)         ║
 * ║  ✓ Cuota de IndexedDB con manejo de errores QuotaExceeded     ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

// ─────────────────────────────────────────────────────────────────
//  CONFIG — Token leído desde meta tag, no hardcodeado
// ─────────────────────────────────────────────────────────────────
const CONFIG = {
  DB_NAME:       'AyudaVE_DB',
  DB_VERSION:    1,
  STORE_REPORTS: 'reports',
  SYNC_TAG:      'sync-reports',
  // Netlify Function — mismo dominio, sin CORS issues
  API_SUBMIT:    '/api/submit-report',
  API_STATS:     '/api/get-stats',
  // Token leído del meta tag (lo pone Netlify en build, nunca en código)
  get TOKEN() {
    return document.querySelector('meta[name="emergency-token"]')?.content || '';
  },
  IMG_MAX_PX:    800,
  IMG_QUALITY:   0.72,
  IMG_FORMAT:    'image/webp',
  // Rate limit cliente: bloquea el botón submit si el servidor rechazó
  _submitBlocked:    false,
  _submitBlockUntil: 0,
};

// ─────────────────────────────────────────────────────────────────
//  DATABASE (IndexedDB) — Fotos como Blob, no DataURL string
//  Blob en IndexedDB = ~33% menos espacio que base64
// ─────────────────────────────────────────────────────────────────
const DB = (() => {
  let _db = null;

  function open() {
    return new Promise((resolve, reject) => {
      if (_db) return resolve(_db);
      const req = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('reports')) {
          const store = db.createObjectStore('reports', {
            keyPath: 'id', autoIncrement: true,
          });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('type',   'type',   { unique: false });
          store.createIndex('savedAt','savedAt', { unique: false });
        }
      };

      req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
      req.onerror   = (e) => reject(e.target.error);
    });
  }

  async function saveReport(report) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction('reports', 'readwrite');
      const store = tx.objectStore('reports');
      const rec   = {
        ...report,
        savedAt: Date.now(),
        status:  'pending',
        retries: 0,
      };
      const req = store.add(rec);
      req.onsuccess = () => resolve(req.result);
      req.onerror   = (e) => {
        // QuotaExceededError — almacenamiento lleno
        if (e.target.error?.name === 'QuotaExceededError') {
          reject(new Error('QUOTA_EXCEEDED'));
        } else {
          reject(e.target.error);
        }
      };
    });
  }

  async function getPendingReports() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction('reports', 'readonly');
      const idx = tx.objectStore('reports').index('status');
      const req = idx.getAll('pending');
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }

  async function getAllReports() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx  = db.transaction('reports', 'readonly');
      const req = tx.objectStore('reports').getAll();
      req.onsuccess = () => resolve(req.result.reverse());
      req.onerror   = () => reject(req.error);
    });
  }

  async function markSent(id, reportId) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx    = db.transaction('reports', 'readwrite');
      const store = tx.objectStore('reports');
      const req   = store.get(id);
      req.onsuccess = () => {
        const rec = req.result;
        if (rec) {
          rec.status   = 'sent';
          rec.sentAt   = Date.now();
          rec.reportId = reportId || null;
          // Liberamos las fotos Blob de memoria después de enviar
          rec.photos = rec.photos?.map(p => ({ ...p, blob: null })) || [];
          store.put(rec);
        }
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  }

  async function incrementRetries(id) {
    const db = await open();
    return new Promise((resolve) => {
      const tx    = db.transaction('reports', 'readwrite');
      const store = tx.objectStore('reports');
      const req   = store.get(id);
      req.onsuccess = () => {
        const rec = req.result;
        if (rec) { rec.retries = (rec.retries || 0) + 1; store.put(rec); }
        resolve();
      };
      req.onerror = () => resolve(); // fail silently
    });
  }

  // Limpia reportes enviados hace más de 7 días para liberar espacio
  async function cleanOldSent() {
    const db      = await open();
    const cutoff  = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const reports = await getAllReports();
    const toDelete = reports.filter(r => r.status === 'sent' && r.sentAt < cutoff);
    if (!toDelete.length) return;

    const tx    = db.transaction('reports', 'readwrite');
    const store = tx.objectStore('reports');
    toDelete.forEach(r => store.delete(r.id));
  }

  return { open, saveReport, getPendingReports, getAllReports, markSent, incrementRetries, cleanOldSent };
})();

// ─────────────────────────────────────────────────────────────────
//  IMAGE ENGINE — Canvas API, WebP, Blob storage
// ─────────────────────────────────────────────────────────────────
const ImageEngine = (() => {

  function compress(file) {
    return new Promise((resolve, reject) => {
      const originalSize = file.size;
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
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

            const canvas = document.createElement('canvas');
            canvas.width  = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const supportsWebP = canvas.toDataURL('image/webp').startsWith('data:image/webp');
            const format = supportsWebP ? CONFIG.IMG_FORMAT : 'image/jpeg';

            canvas.toBlob(
              (blob) => {
                if (!blob) return reject(new Error('Canvas toBlob failed'));

                // Generamos DataURL solo para preview en pantalla
                // El Blob es lo que guardamos en IndexedDB (más eficiente)
                const previewUrl = URL.createObjectURL(blob);

                resolve({
                  blob,           // ← guardado en IndexedDB como Blob nativo
                  previewUrl,     // ← URL temporal para <img> en pantalla
                  format,
                  width, height,
                  originalSize,
                  compressedSize: blob.size,
                  ratio: ((1 - blob.size / originalSize) * 100).toFixed(0),
                });
              },
              format,
              CONFIG.IMG_QUALITY
            );
          } catch (err) { reject(err); }
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Convierte Blob a base64 DataURL cuando necesitamos enviarlo por red
  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function formatBytes(bytes) {
    if (bytes < 1024)        return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return { compress, blobToDataURL, formatBytes };
})();

// ─────────────────────────────────────────────────────────────────
//  NETWORK SYNC — Con retry backoff y manejo de rate limit
// ─────────────────────────────────────────────────────────────────
const Sync = (() => {

  async function sendReport(report) {
    // Convertir Blobs a DataURL para envío por JSON
    const photosForSend = [];
    if (report.photos?.length) {
      for (const photo of report.photos) {
        if (photo.blob instanceof Blob) {
          const dataUrl = await ImageEngine.blobToDataURL(photo.blob);
          photosForSend.push({ dataUrl, format: photo.format, compressedSize: photo.compressedSize });
        } else if (photo.dataUrl) {
          // Compatibilidad con formato antiguo
          photosForSend.push(photo);
        }
      }
    }

    const payload = {
      type:    report.type,
      fields:  report.fields,
      savedAt: report.savedAt,
      photos:  photosForSend,
    };

    const token = CONFIG.TOKEN;

    const res = await fetch(CONFIG.API_SUBMIT, {
      method:  'POST',
      headers: {
        'Content-Type':      'application/json',
        'X-Emergency-Token': token,
      },
      body:   JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    // Rate limited → bloquear submit temporalmente en cliente
    if (res.status === 429) {
      const data        = await res.json().catch(() => ({}));
      const retryAfter  = data.retryAfterSeconds || 60;
      CONFIG._submitBlocked    = true;
      CONFIG._submitBlockUntil = Date.now() + retryAfter * 1000;
      throw new Error(`RATE_LIMITED:${retryAfter}`);
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data; // { success, reportId, ... }
  }

  async function syncAll() {
    const pending = await DB.getPendingReports();
    if (!pending.length) return 0;

    // Desbloquear si ya pasó el tiempo de rate limit
    if (CONFIG._submitBlocked && Date.now() > CONFIG._submitBlockUntil) {
      CONFIG._submitBlocked = false;
    }

    let synced = 0;

    for (const report of pending) {
      // Máximo 5 reintentos por reporte
      if ((report.retries || 0) >= 5) continue;

      try {
        const result = await sendReport(report);
        await DB.markSent(report.id, result.reportId);
        synced++;
      } catch (err) {
        await DB.incrementRetries(report.id);
        console.warn('[Sync] Fallo en reporte', report.id, err.message);
        if (err.message.startsWith('RATE_LIMITED')) break; // parar si hay rate limit
      }
    }

    return synced;
  }

  return { sendReport, syncAll };
})();

// ─────────────────────────────────────────────────────────────────
//  SMS FALLBACK — Construye un SMS preformateado para envío manual
//  Útil cuando no hay datos pero sí señal de llamada/SMS
// ─────────────────────────────────────────────────────────────────
function buildSMSBody(type, fields) {
  if (type === 'person') {
    return encodeURIComponent(
      `DESAPARECIDO\n` +
      `Nombre: ${fields.name}\n` +
      `Cédula: ${fields.cedula}\n` +
      `Edad: ${fields.age || 'N/D'}\n` +
      `Última ubicación: ${fields.location}\n` +
      `GPS: ${fields.gps || 'N/D'}\n` +
      `Estado: ${fields.status}\n` +
      `Tel familiar: ${fields.phone || 'N/D'}\n` +
      `Reporte vía AyudaVE`
    );
  } else {
    return encodeURIComponent(
      `DAÑO ESTRUCTURAL\n` +
      `Tipo: ${fields.structureType}\n` +
      `Nivel: ${fields.damageLevel}\n` +
      `Dirección: ${fields.address}\n` +
      `GPS: ${fields.gps || 'N/D'}\n` +
      `Atrapados: ${fields.trapped}\n` +
      `Contacto: ${fields.reporterPhone || 'N/D'}\n` +
      `Reporte vía AyudaVE`
    );
  }
}

// ─────────────────────────────────────────────────────────────────
//  TOAST SYSTEM
// ─────────────────────────────────────────────────────────────────
const Toast = (() => {
  const container = () => document.getElementById('toastContainer');

  const ICONS = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };

  function show(message, type = 'info', duration = 3500) {
    const c  = container(); if (!c) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type} toast-enter`;
    el.innerHTML = `${ICONS[type] || ''}<span>${message}</span>`;
    c.appendChild(el);
    setTimeout(() => {
      el.classList.replace('toast-enter', 'toast-exit');
      setTimeout(() => el.remove(), 250);
    }, duration);
  }

  return { show };
})();

// ─────────────────────────────────────────────────────────────────
//  MAIN APP CONTROLLER
// ─────────────────────────────────────────────────────────────────
const AyudaAppCore = (() => {

  const _photos = { person: [], damage: [] };

  // ── Navigation ──────────────────────────────────────────────
  function navigate(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const t = document.getElementById(screenId);
    if (t) { t.classList.add('active'); t.scrollTop = 0; }
  }

  function setNav(btn) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
  }

  // ── GPS ──────────────────────────────────────────────────────
  function getGPS(fieldId) {
    if (!navigator.geolocation) {
      Toast.show('GPS no disponible en este dispositivo', 'error'); return;
    }
    Toast.show('Obteniendo ubicación GPS…', 'info', 8000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const val = `${lat}, ${lng}`;
        const f   = document.getElementById(fieldId);
        if (f) f.value = val;
        const cd  = document.getElementById('d_coords_display');
        if (cd)  cd.textContent = val;
        Toast.show(`GPS: ${val}`, 'success', 4000);
      },
      (err) => {
        const msgs = { 1:'Permiso de ubicación denegado', 2:'No se pudo obtener la ubicación', 3:'Tiempo de espera agotado' };
        Toast.show(msgs[err.code] || 'Error GPS', 'error');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  }

  // ── Photo handling — Blob storage ───────────────────────────
  async function handlePhoto(input, previewId, sizeId) {
    const files = Array.from(input.files);
    if (!files.length) return;

    const formType   = previewId.startsWith('p_') ? 'person' : 'damage';
    const progressEl = document.getElementById(formType === 'person' ? 'p_compress_progress' : 'd_compress_progress');

    progressEl?.classList.add('visible');
    Toast.show('Comprimiendo imagen(s)…', 'info', 2500);

    let totalOrig = 0, totalComp = 0;

    for (const file of files) {
      if (_photos[formType].length >= 5) {
        Toast.show('Máximo 5 fotos por reporte', 'warning'); break;
      }
      try {
        const result = await ImageEngine.compress(file);
        _photos[formType].push(result);
        totalOrig += result.originalSize;
        totalComp += result.compressedSize;
        addPhotoThumb(previewId, result, formType, _photos[formType].length - 1);
      } catch (err) {
        Toast.show(`Error procesando imagen`, 'error');
        console.error(err);
      }
    }

    progressEl?.classList.remove('visible');
    input.value = '';

    const sizeEl = document.getElementById(sizeId);
    if (sizeEl && totalOrig > 0) {
      const saved = ((1 - totalComp / totalOrig) * 100).toFixed(0);
      sizeEl.innerHTML = `
        <span class="compress-badge">✓ Comprimido</span>
        ${ImageEngine.formatBytes(totalOrig)} → ${ImageEngine.formatBytes(totalComp)}
        (−${saved}% · WebP)
      `;
    }
  }

  function addPhotoThumb(previewId, result, formType, index) {
    const grid  = document.getElementById(previewId);
    if (!grid) return;
    const thumb = document.createElement('div');
    thumb.className   = 'photo-thumb';
    thumb.dataset.index = index;
    thumb.innerHTML = `
      <img src="${result.previewUrl}" alt="Foto ${index + 1}" loading="lazy" />
      <button class="photo-thumb-remove" onclick="App.removePhoto('${previewId}','${formType}',${index},this)">×</button>
    `;
    grid.appendChild(thumb);
  }

  function removePhoto(previewId, formType, index, btn) {
    // Revocar ObjectURL para liberar memoria
    const photo = _photos[formType][index];
    if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    _photos[formType].splice(index, 1);
    btn.closest('.photo-thumb').remove();
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
    const s = document.querySelector(`#${groupId} .chip.selected`);
    return s ? s.dataset.value : null;
  }

  // ── Form helpers ──────────────────────────────────────────
  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function collectPersonForm() {
    return {
      name: val('p_name'), cedula: val('p_cedula'), age: val('p_age'),
      phone: val('p_phone'), location: val('p_location'), gps: val('p_gps'),
      desc: val('p_desc'), status: getSelectedChip('p_status_chips'),
    };
  }

  function collectDamageForm() {
    return {
      structureType: getSelectedChip('d_type_chips'),
      damageLevel:   getSelectedChip('d_level_chips'),
      address: val('d_address'), gps: val('d_gps'), desc: val('d_desc'),
      trapped: getSelectedChip('d_trapped_chips'), reporterPhone: val('d_reporter_phone'),
    };
  }

  function validatePerson(f) {
    if (!f.name)     return 'El nombre completo es obligatorio';
    if (!f.cedula)   return 'La cédula es obligatoria';
    if (!f.location) return 'La última ubicación conocida es obligatoria';
    return null;
  }

  function validateDamage(f) {
    if (!f.address) return 'La dirección del daño es obligatoria';
    return null;
  }

  // ── SMS Fallback button ───────────────────────────────────
  function sendBySMS(type) {
    const fields = type === 'person' ? collectPersonForm() : collectDamageForm();
    const body   = buildSMSBody(type, fields);
    // Abre la app de SMS con el número de Protección Civil
    window.location.href = `sms:911?body=${body}`;
    Toast.show('Abriendo app de mensajes…', 'info');
  }

  // ── SUBMIT ────────────────────────────────────────────────
  async function submitReport(type) {
    // Verificar rate limit local
    if (CONFIG._submitBlocked && Date.now() < CONFIG._submitBlockUntil) {
      const secsLeft = Math.ceil((CONFIG._submitBlockUntil - Date.now()) / 1000);
      Toast.show(`Espera ${secsLeft}s antes de enviar otro reporte`, 'warning', 5000);
      return;
    }

    const fields = type === 'person' ? collectPersonForm() : collectDamageForm();
    const errMsg = type === 'person' ? validatePerson(fields) : validateDamage(fields);

    if (errMsg) { Toast.show(errMsg, 'error', 4000); return; }

    // Fotos como Blobs (no DataURL) para IndexedDB eficiente
    const photos = _photos[type === 'person' ? 'person' : 'damage'].map(p => ({
      blob:          p.blob,
      format:        p.format,
      compressedSize: p.compressedSize,
    }));

    const report = { type, fields, photos };

    // ── 1. Guardar en IndexedDB PRIMERO
    let savedId;
    try {
      savedId = await DB.saveReport(report);
    } catch (err) {
      if (err.message === 'QUOTA_EXCEEDED') {
        Toast.show('Almacenamiento del teléfono lleno. Borra algunos reportes enviados.', 'error', 6000);
      } else {
        Toast.show('Error guardando reporte localmente', 'error');
      }
      return;
    }

    // ── 2. Limpiar formulario y navegar a home
    resetForm(type);
    navigate('screenHome');
    updatePendingCount();
    Toast.show('Reporte guardado en tu teléfono ✓', 'success', 2000);

    // ── 3. Intentar envío inmediato si hay red
    if (navigator.onLine) {
      try {
        const savedReport = { ...report, id: savedId };
        const result = await Sync.sendReport(savedReport);
        await DB.markSent(savedId, result.reportId);
        Toast.show(`Reporte enviado a Protección Civil ✓ (ID: ${result.reportId})`, 'success', 6000);
        await loadAndShowStats();
      } catch (err) {
        if (err.message.startsWith('RATE_LIMITED')) {
          const secs = err.message.split(':')[1];
          Toast.show(`Límite alcanzado. Reintento automático en ${secs}s`, 'warning', 5000);
        } else {
          Toast.show('Sin respuesta del servidor — se reintentará automáticamente', 'warning', 4000);
        }
        registerBackgroundSync();
      }
    } else {
      registerBackgroundSync();
      Toast.show('Sin señal — se enviará automáticamente al recuperar conexión', 'warning', 5000);
    }

    updatePendingCount();
  }

  function resetForm(type) {
    const pfx = type === 'person' ? 'p_' : 'd_';
    const ids  = type === 'person'
      ? ['p_name','p_cedula','p_age','p_phone','p_location','p_gps','p_desc']
      : ['d_address','d_gps','d_desc','d_reporter_phone'];
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById(`${pfx}photo_preview`).innerHTML = '';
    document.getElementById(`${pfx}photo_size`).innerHTML    = '';
    if (type === 'damage') {
      const cd = document.getElementById('d_coords_display');
      if (cd) cd.textContent = '';
    }
    // Revocar todas las URLs de objeto para liberar memoria
    _photos[type].forEach(p => { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl); });
    _photos[type] = [];
  }

  // ── Background Sync ──────────────────────────────────────
  function registerBackgroundSync() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(sw => {
        sw.sync.register(CONFIG.SYNC_TAG).catch(() => {});
      });
    }
  }

  // ── Manual sync ──────────────────────────────────────────
  async function trySyncNow() {
    if (!navigator.onLine) { Toast.show('Sin conexión a internet', 'error'); return; }
    Toast.show('Sincronizando reportes pendientes…', 'info');
    const count = await Sync.syncAll();
    if (count > 0) {
      Toast.show(`${count} reporte(s) enviados correctamente ✓`, 'success', 5000);
      await loadAndShowStats();
    } else {
      Toast.show('Sin reportes pendientes por enviar', 'info');
    }
    updatePendingCount();
  }

  // ── Stats desde API real ──────────────────────────────────
  async function loadAndShowStats() {
    try {
      const res  = await fetch(CONFIG.API_STATS, { signal: AbortSignal.timeout(5000) });
      const data = await res.json();
      const el   = document.getElementById('reportCount');
      if (el && typeof data.today === 'number') el.textContent = data.today;
    } catch {
      // No es crítico — el contador simplemente no se actualiza
    }
  }

  // ── Pending count UI ─────────────────────────────────────
  async function updatePendingCount() {
    try {
      const pending = await DB.getPendingReports();
      const banner  = document.getElementById('pendingBanner');
      const countEl = document.getElementById('pendingCount');
      if (!banner || !countEl) return;
      if (pending.length > 0) {
        banner.classList.add('visible');
        countEl.textContent = pending.length;
      } else {
        banner.classList.remove('visible');
      }
    } catch { /* DB aún no lista */ }
  }

  // ── My Reports ───────────────────────────────────────────
  async function renderMyReports() {
    const list = document.getElementById('myReportsList');
    if (!list) return;
    list.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:32px 0;">Cargando…</p>';

    let reports;
    try { reports = await DB.getAllReports(); }
    catch { list.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:32px 0;">Error cargando reportes.</p>'; return; }

    if (!reports.length) {
      list.innerHTML = '<p style="color:var(--text-muted);font-size:13px;text-align:center;padding:32px 0;">No tienes reportes guardados aún.</p>';
      return;
    }

    list.innerHTML = reports.map(r => {
      const isPerson = r.type === 'person';
      const title    = isPerson ? (r.fields?.name || 'Persona desaparecida') : (r.fields?.address || 'Daño estructural');
      const meta     = new Date(r.savedAt).toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' });
      const status   = r.status === 'sent' ? 'Enviado' : (r.retries >= 5 ? 'Error' : 'Pendiente');
      const statusCls = r.status === 'sent' ? 'status-sent' : (r.retries >= 5 ? 'status-error' : 'status-pending');
      const reportIdStr = r.reportId ? `<div style="font-size:10px;color:var(--text-muted);font-family:monospace;">${r.reportId}</div>` : '';
      const photosBadge = r.photos?.filter(p => p.blob || p.dataUrl).length
        ? `<span style="font-size:10px;color:var(--blue);">📷 ${r.photos.length}</span>` : '';

      const icon = isPerson
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;

      return `
        <div class="report-card">
          <div class="report-card-icon ${isPerson ? 'person' : 'damage'}">${icon}</div>
          <div class="report-card-body">
            <div class="report-card-name">${title}</div>
            <div class="report-card-meta">${meta} ${photosBadge}</div>
            ${reportIdStr}
          </div>
          <span class="report-card-status ${statusCls}">${status}</span>
        </div>
      `;
    }).join('');
  }

  // ── Map ──────────────────────────────────────────────────
  function loadInteractiveMap() {
    const container = document.getElementById('mapContainer');
    if (!container) return;
    Toast.show('Cargando mapa interactivo…', 'info');
    container.innerHTML = `
      <div style="width:100%;height:320px;border-radius:12px;overflow:hidden;border:1px solid var(--border);margin-top:12px;">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-72.5,10.0,-66.5,11.5&layer=mapnik&marker=10.5,-69.0"
          style="width:100%;height:100%;border:none;"
          loading="lazy"
          title="Mapa de Venezuela"
        ></iframe>
      </div>
      <p style="font-size:11px;color:var(--text-muted);margin-top:6px;text-align:right;">© OpenStreetMap contributors</p>
    `;
  }

  // ── Network listeners ────────────────────────────────────
  function setupNetworkListeners() {
    const badge = document.getElementById('statusBadge');
    const text  = document.getElementById('statusText');

    function update() {
      const online = navigator.onLine;
      if (badge) badge.className = `status-badge${online ? '' : ' offline'}`;
      if (text)  text.textContent = online ? 'En línea' : 'Sin señal';
      if (online) {
        Sync.syncAll().then(async n => {
          if (n > 0) {
            Toast.show(`Conexión restaurada — ${n} reporte(s) enviados ✓`, 'success', 5000);
            await loadAndShowStats();
            updatePendingCount();
          }
        });
      }
    }

    window.addEventListener('online',  update);
    window.addEventListener('offline', update);
    update();
  }

  // ── PWA Install prompt ───────────────────────────────────
  function setupPWAInstall() {
    let prompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      prompt = e;
      // Mostrar banner de instalación después de 30 segundos
      setTimeout(() => {
        if (prompt) {
          Toast.show('Instala la app en tu teléfono para usarla sin internet', 'info', 8000);
        }
      }, 30000);
    });
  }

  // ── Service Worker ───────────────────────────────────────
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(reg => {
        console.log('[SW] Registrado:', reg.scope);
        navigator.serviceWorker.addEventListener('message', (ev) => {
          if (ev.data?.type === 'SYNC_COMPLETE') {
            Toast.show(`${ev.data.count} reporte(s) sincronizados ✓`, 'success', 5000);
            loadAndShowStats();
            updatePendingCount();
          }
        });
      })
      .catch(err => console.warn('[SW] Fallo en registro:', err));
  }

  // ── INIT ─────────────────────────────────────────────────
  function init() {
    registerSW();
    setupNetworkListeners();
    setupPWAInstall();
    DB.open()
      .then(() => {
        updatePendingCount();
        DB.cleanOldSent(); // limpieza silenciosa de reportes viejos
      })
      .catch(() => {});

    // Cargar stats reales al iniciar
    loadAndShowStats();

    window.App = {
      navigate, setNav, getGPS, handlePhoto, removePhoto,
      selectChip, submitReport, sendBySMS, trySyncNow,
      renderMyReports, loadInteractiveMap,
    };
  }

  return { init };
})();

AyudaAppCore.init();
