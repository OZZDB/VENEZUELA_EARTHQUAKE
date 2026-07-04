/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — Service Worker                           ║
 * ║  Strategy: Cache-First (shell) + Network-First (API)       ║
 * ║  Features: Background Sync, Offline Fallback               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

'use strict';

const SW_VERSION = 'v3.3.0';
const CACHE_SHELL = `ayudave-shell-${SW_VERSION}`;
const CACHE_DYNAMIC = `ayudave-dynamic-${SW_VERSION}`;
const SYNC_TAG = 'sync-reports';
const API_SUBMIT = '/api/submit-report';

const SHELL_ASSETS = [
  './',
  './index.html',
  './app.js',
  './emergency-data.js',
  './manifest.json',
  './offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_SHELL)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => ![CACHE_SHELL, CACHE_DYNAMIC].includes(k))
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html')
        .then((cached) => cached || fetch('./index.html'))
        .catch(() => caches.match('./offline.html'))
    );
    return;
  }

  event.respondWith(cacheFirstStrategy(request));
});

async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request.clone());
    if (response && response.ok && response.type !== 'opaque') {
      const cache = await caches.open(CACHE_DYNAMIC);
      await limitCache(cache, 50);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const accept = request.headers.get('Accept') || '';
    if (accept.includes('text/html')) {
      return caches.match('./offline.html') || new Response('<h1>Sin conexión</h1>', {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    return new Response('Recurso no disponible sin conexión', { status: 503 });
  }
}

async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request.clone());
    if (response && response.ok && response.type !== 'opaque') {
      const cache = await caches.open(CACHE_DYNAMIC);
      await limitCache(cache, 50);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response(
      JSON.stringify({ error: 'offline', message: 'Sin conexión a internet' }),
      { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }
}

async function limitCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length >= maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries + 1);
    await Promise.all(toDelete.map((k) => cache.delete(k)));
  }
}

self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(syncPendingReports());
  }
});

async function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('AyudaVE_DB', 1);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('reports')) {
        const store = db.createObjectStore('reports', { keyPath: 'id', autoIncrement: true });
        store.createIndex('status', 'status', { unique: false });
      }
    };

    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function getPendingFromDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('reports', 'readonly');
    const store = tx.objectStore('reports');
    const idx = store.index('status');
    const req = idx.getAll('pending');
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function markSentInDB(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('reports', 'readwrite');
    const store = tx.objectStore('reports');
    const req = store.get(id);

    req.onsuccess = () => {
      const rec = req.result;
      if (rec) {
        rec.status = 'sent';
        rec.sentAt = Date.now();
        if (rec.photos?.length) {
          rec.photos = rec.photos.map((p) => ({ ...p, blob: null }));
        }
        store.put(rec);
      }
      resolve();
    };

    req.onerror = () => reject(req.error);
  });
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function sendReportToAPI(report) {
  const photosForSend = [];
  if (report.photos?.length) {
    for (const photo of report.photos) {
      if (photo?.blob instanceof Blob) {
        const dataUrl = await blobToDataURL(photo.blob);
        photosForSend.push({
          dataUrl,
          format: photo.format || 'image/webp',
          compressedSize: photo.compressedSize || photo.blob.size,
        });
      } else if (photo?.dataUrl) {
        photosForSend.push(photo);
      }
    }
  }

  const payload = {
    type: report.type,
    fields: report.fields,
    savedAt: report.savedAt,
    photos: photosForSend,
  };

  const res = await fetch(API_SUBMIT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `API responded ${res.status}`);
  }

  return res.json().catch(() => ({}));
}

async function syncPendingReports() {
  const pending = await getPendingFromDB();
  if (!pending.length) return 0;

  let synced = 0;

  for (const report of pending) {
    try {
      const result = await sendReportToAPI(report);
      await markSentInDB(report.id);
      synced++;
      if (result?.reportId) {
        await notifyClients({ type: 'SYNC_REPORT_SENT', id: report.id, reportId: result.reportId });
      }
    } catch (err) {
      console.warn('[SW] Failed to sync report', report.id, err?.message || err);
    }
  }

  if (synced > 0) {
    await notifyClients({ type: 'SYNC_COMPLETE', count: synced });
  }

  return synced;
}

async function notifyClients(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  clients.forEach((client) => client.postMessage(message));
}

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'Alerta', body: event.data.text() };
  }

  const options = {
    body: data.body || 'Nueva alerta de emergencia',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200, 100, 400],
    tag: data.tag || 'ayudave-alert',
    renotify: true,
    data: { url: data.url || './' },
    actions: [
      { action: 'view', title: 'Ver' },
      { action: 'close', title: 'Cerrar' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Ayuda Venezuela', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(self.clients.openWindow(event.notification.data?.url || './'));
  }
});

console.log(`[SW] AyudaVenezuela Service Worker ${SW_VERSION} loaded`);