/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  AYUDA VENEZUELA — Service Worker                             ║
 * ║  Strategy: Cache-First (shell) + Network-First (API)          ║
 * ║  Features: Background Sync, Offline Fallback                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  CACHE STRATEGY DIAGRAM:
 *
 *  ┌─────────────┐    ┌──────────────────────────────────────┐
 *  │   Browser   │───▶│          Service Worker               │
 *  └─────────────┘    │                                       │
 *         ▲           │  fetch(request)                       │
 *         │           │   ├── /api/*       → NetworkFirst     │
 *         │           │   ├── *.png/jpg/webp → CacheFirst     │
 *         │           │   └── everything else → CacheFirst    │
 *         │           │            └── fallback: offline.html │
 *         │           │                                       │
 *  ┌─────────────┐    │  sync('sync-reports')                 │
 *  │  Cache API  │◀───│   └── read IndexedDB pending reports  │
 *  └─────────────┘    │       └── POST each to API            │
 *                     └──────────────────────────────────────┘
 */

'use strict';

// ─────────────────────────────────────────────────────────────────
//  CONSTANTS — Configurable via postMessage from app (no hardcoded secrets)
// ─────────────────────────────────────────────────────────────────
const SW_VERSION    = 'v1.0.0';
const CACHE_SHELL   = `ayudave-shell-${SW_VERSION}`;
const CACHE_DYNAMIC = `ayudave-dynamic-${SW_VERSION}`;
const SYNC_TAG      = 'sync-reports';

// Default fallback — will be overridden by app via postMessage on registration
let API_URL         = 'https://api.ayudavenezuela.org/v1/reports';
let EMERGENCY_TOKEN = '';

// Core shell files — cached on install for 100% offline availability
const SHELL_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './offline.html',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
];

// ─────────────────────────────────────────────────────────────────
//  INSTALL — Pre-cache the app shell
// ─────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log(`[SW] Installing ${SW_VERSION}…`);

  event.waitUntil(
    caches.open(CACHE_SHELL)
      .then(cache => {
        console.log('[SW] Caching app shell…');
        // addAll is atomic — if ANY file fails, the whole install fails
        return cache.addAll(SHELL_ASSETS);
      })
      .then(() => {
        console.log('[SW] Shell cached. Skipping waiting…');
        // Activate immediately without waiting for existing clients to close
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Install failed:', err);
        // Don't block install on optional assets failing
      })
  );
});

// ─────────────────────────────────────────────────────────────────
//  ACTIVATE — Clean up old caches
// ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log(`[SW] Activating ${SW_VERSION}…`);

  event.waitUntil(
    caches.keys()
      .then(keys => {
        const keepsakes = [CACHE_SHELL, CACHE_DYNAMIC];
        return Promise.all(
          keys
            .filter(k => !keepsakes.includes(k))
            .map(k => {
              console.log('[SW] Deleting old cache:', k);
              return caches.delete(k);
            })
        );
      })
      .then(() => {
        console.log('[SW] Old caches cleared. Claiming clients…');
        // Take control of all open clients immediately
        return self.clients.claim();
      })
  );
});

// ─────────────────────────────────────────────────────────────────
//  FETCH — Request interception strategy
// ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ── Ignore non-GET and browser extension requests
  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http'))  return;

  // ── API calls → Network First (fresh data when possible)
  if (url.pathname.startsWith('/v1/') || url.hostname.includes('api.')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }

  // ── Navigation requests → Shell (SPA behavior)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html')
        .then(r => r || fetch('./index.html'))
        .catch(() => caches.match('./offline.html'))
    );
    return;
  }

  // ── All other requests → Cache First (JS, CSS, images, etc.)
  event.respondWith(cacheFirstStrategy(event.request));
});

// ─────────────────────────────────────────────────────────────────
//  STRATEGY: Cache First
//  Try cache → if miss, fetch from network and cache it → if no
//  network, return offline page for HTML, or opaque fallback.
// ─────────────────────────────────────────────────────────────────
async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request.clone());

    // Only cache successful, non-opaque responses
    if (response && response.status === 200 && response.type !== 'opaque') {
      const cache = await caches.open(CACHE_DYNAMIC);
      // Limit dynamic cache to 50 entries — remove oldest if exceeded
      await limitCache(CACHE_DYNAMIC, 50);
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    // Network failed — return offline fallback for HTML
    const isHTML = request.headers.get('Accept')?.includes('text/html');
    if (isHTML) {
      return caches.match('./offline.html') || new Response('<h1>Sin conexión</h1>', {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    // For other assets, return a basic 503
    return new Response('Recurso no disponible sin conexión', { status: 503 });
  }
}

// ─────────────────────────────────────────────────────────────────
//  STRATEGY: Network First
//  Try network → if fails, use cache → if no cache, error response
// ─────────────────────────────────────────────────────────────────
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request.clone());
    if (response.ok) {
      const cache = await caches.open(CACHE_DYNAMIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response(
      JSON.stringify({ error: 'offline', message: 'Sin conexión a internet' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// ─────────────────────────────────────────────────────────────────
//  CACHE LIMIT UTILITY — Evict oldest entries
// ─────────────────────────────────────────────────────────────────
async function limitCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys  = await cache.keys();
  if (keys.length >= maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries + 1);
    await Promise.all(toDelete.map(k => cache.delete(k)));
  }
}

// ─────────────────────────────────────────────────────────────────
//  BACKGROUND SYNC — Send queued reports when connection returns
//
//  FLOW:
//  1. App registers sync tag 'sync-reports' via sw.sync.register()
//  2. Browser fires 'sync' event when network is available
//  3. SW reads pending reports from IndexedDB
//  4. SW sends each report to the API
//  5. SW marks each sent report in IndexedDB
//  6. SW notifies the app client(s) of completion
//
//  This runs even if the app is closed / screen is off.
// ─────────────────────────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === SYNC_TAG) {
    event.waitUntil(
      syncPendingReports()
        .then(count => {
          console.log(`[SW] Synced ${count} report(s)`);
          if (count > 0) notifyClients({ type: 'SYNC_COMPLETE', count });
        })
        .catch(err => {
          console.error('[SW] Sync failed:', err);
          // Returning a rejected promise makes the browser retry the sync
          throw err;
        })
    );
  }
});

// ─────────────────────────────────────────────────────────────────
//  INDEXEDDB ACCESS from Service Worker
//  (SW has its own context — must open its own DB connection)
// ─────────────────────────────────────────────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('AyudaVE_DB', 1);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror   = (e) => reject(e.target.error);
    req.onupgradeneeded = (e) => {
      // SW shouldn't normally need to upgrade, but handle edge case
      const db = e.target.result;
      if (!db.objectStoreNames.contains('reports')) {
        const store = db.createObjectStore('reports', { keyPath: 'id', autoIncrement: true });
        store.createIndex('status', 'status', { unique: false });
      }
    };
  });
}

async function getPendingFromDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction('reports', 'readonly');
    const store = tx.objectStore('reports');
    const idx   = store.index('status');
    const req   = idx.getAll('pending');
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

async function markSentInDB(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction('reports', 'readwrite');
    const store = tx.objectStore('reports');
    const req   = store.get(id);
    req.onsuccess = () => {
      const rec = req.result;
      if (rec) {
        rec.status = 'sent';
        rec.sentAt = Date.now();
        store.put(rec);
      }
      resolve();
    };
    req.onerror = () => reject(req.error);
  });
}

// ─────────────────────────────────────────────────────────────────
//  SYNC EXECUTOR
// ─────────────────────────────────────────────────────────────────
async function syncPendingReports() {
  const pending = await getPendingFromDB();
  if (!pending.length) return 0;

  let synced = 0;

  for (const report of pending) {
    try {
      await sendReportToAPI(report);
      await markSentInDB(report.id);
      synced++;
    } catch (err) {
      console.warn('[SW] Failed to sync report', report.id, err.message);
      // Don't throw here — continue with next report
      // The sync event will retry all still-pending on next opportunity
    }
  }

  return synced;
}

async function sendReportToAPI(report) {
  const fd = new FormData();
  fd.append('type',    report.type);
  fd.append('data',    JSON.stringify(report.fields));
  fd.append('savedAt', report.savedAt);

  // Reattach compressed photos
  if (report.photos && report.photos.length) {
    for (let i = 0; i < report.photos.length; i++) {
      const photo = report.photos[i];
      if (photo.dataUrl) {
        const blob = dataURLToBlob(photo.dataUrl);
        fd.append(`photo_${i}`, blob, `photo_${i}.webp`);
      }
    }
  }

  const res = await fetch(API_URL, {
    method:  'POST',
    body:    fd,
    headers: { 'X-Emergency-Token': EMERGENCY_TOKEN },
  });

  if (!res.ok) throw new Error(`API responded ${res.status}`);
  return res.json();
}

function dataURLToBlob(dataURL) {
  const [header, data] = dataURL.split(',');
  const mime   = header.match(/:(.*?);/)[1];
  const bytes  = atob(data);
  const ab     = new ArrayBuffer(bytes.length);
  const ia     = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) ia[i] = bytes.charCodeAt(i);
  return new Blob([ab], { type: mime });
}

// ─────────────────────────────────────────────────────────────────
//  CLIENT MESSAGING — Notify open app windows
// ─────────────────────────────────────────────────────────────────
async function notifyClients(message) {
  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window',
  });
  clients.forEach(client => client.postMessage(message));
}

// ─────────────────────────────────────────────────────────────────
//  PUSH NOTIFICATIONS (future: Protección Civil server push)
// ─────────────────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try { data = event.data.json(); }
  catch { data = { title: 'Alerta', body: event.data.text() }; }

  const options = {
    body:    data.body || 'Nueva alerta de emergencia',
    icon:    './icon-192.png',
    badge:   './icon-192.png',
    vibrate: [200, 100, 200, 100, 400],
    tag:     data.tag || 'ayudave-alert',
    renotify: true,
    data:    { url: data.url || './' },
    actions: [
      { action: 'view', title: 'Ver reporte' },
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
    event.waitUntil(
      self.clients.openWindow(event.notification.data?.url || './')
    );
  }
});

// ─────────────────────────────────────────────────────────────────
//  CONFIG RECEIVER — Accept API URL and token from app via postMessage
// ─────────────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'SET_CONFIG') return;
  if (event.data.apiUrl) API_URL = event.data.apiUrl;
  if (event.data.emergencyToken) EMERGENCY_TOKEN = event.data.emergencyToken;
  console.log('[SW] Config updated:', { apiUrl: API_URL, hasToken: !!EMERGENCY_TOKEN });
});

console.log(`[SW] AyudaVenezuela Service Worker ${SW_VERSION} loaded`);
