// Lisân Campus : lecture hors connexion.
// Changez VERSION à chaque mise à jour du site pour renouveler le cache.
const VERSION = 'lisan-campus-2026-10-23p';
const CORE = ['./', 'index.html', 'styles.css', 'app.js', 'config.js', 'auth.js', 'inscription.js', 'admin.js', 'certificats.js', 'boot.js', 'vendor/qrcode.min.js', 'logo.png',
  'data/droit.js', 'data/ia.js', 'data/arabe.js', 'data/coran.js', 'fonts/LisanNaskh-R.woff2', 'fonts/LisanNaskh-B.woff2',
  'fonts/literata-600.woff2', 'fonts/literata-800.woff2', 'fonts/literata-600-ext.woff2', 'fonts/literata-800-ext.woff2', 'fonts/atkinson-400.woff2', 'fonts/atkinson-700.woff2', 'fonts/atkinson-400i.woff2',
  'fonts/atkinson-400-ext.woff2', 'fonts/atkinson-700-ext.woff2', 'fonts/atkinson-400i-ext.woff2',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Vidéos : laissées au navigateur (lecture par morceaux), jamais mises en cache.
  if (/\.(mp4|webm)$/.test(url.pathname)) return;
  // Pages : le réseau d'abord (pour recevoir les mises à jour), le cache si l'on est hors connexion.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  // Fichiers du site (polices comprises) : le cache d'abord, puis mise à jour en arrière-plan.
  if (url.origin === location.origin) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
