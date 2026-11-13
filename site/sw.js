// Lisân Campus : lecture hors connexion.
// Changez VERSION à chaque mise à jour du site pour renouveler le cache.
const VERSION = 'lisan-campus-2026-11-13f';
const CORE = ['./', 'styles.css', 'app.js', 'config.js', 'auth.js', 'inscription.js', 'admin.js', 'certificats.js', 'boot.js', 'ptr.js', 'emoji.js', 'vendor/qrcode.min.js', 'logo.png',
  'data/droit.js', 'data/romans.js', 'data/ia.js', 'data/arabe.js', 'data/coran.js', 'data/islam.js', 'data/mini.js', 'data/livres.js', 'lecteur.js', 'data/audio.js', 'fonts/LisanNaskh-R.woff2', 'fonts/LisanNaskh-B.woff2',
  'fonts/literata-600.woff2', 'fonts/literata-800.woff2', 'fonts/literata-600-ext.woff2', 'fonts/literata-800-ext.woff2', 'fonts/atkinson-400.woff2', 'fonts/atkinson-700.woff2', 'fonts/atkinson-400i.woff2',
  'fonts/atkinson-400-ext.woff2', 'fonts/atkinson-700-ext.woff2', 'fonts/atkinson-400i-ext.woff2',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'favicon-32.png',
  'img/en/campus.svg', 'img/en/justice.svg', 'img/en/professions.svg', 'img/en/courts.svg', 'img/en/courtroom.svg', 'img/en/police.svg', 'img/en/lawfirm.svg', 'img/en/contract.svg', 'img/en/persons.svg', 'img/en/falsefriends.svg', 'img/en/pronunciation.svg', 'img/eco/maslow.svg', 'img/eco/keynes.svg', 'img/eco/phillips.svg', 'img/droit/kelsen.svg', 'img/droit/droits.svg', 'img/droit/juridictions.svg', 'img/droit/penal.svg', 'img/droit/absence.svg', 'img/droit/sources-dm.svg', 'img/droit/etat-elements.svg', 'img/droit/formes-etat.svg', 'img/droit/constitution-sens.svg', 'img/droit/democratie-principes.svg', 'img/droit/dissertation.svg', 'img/droit/vonneumann.svg', 'img/droit/proces-civil.svg', 'img/romans/will.svg', 'img/romans/part1.svg', 'img/romans/part2.svg', 'img/romans/part3.svg', 'img/romans/v_prologue.svg', 'img/romans/v_ch1.svg', 'img/romans/v_ch2.svg', 'img/romans/v_ch3.svg', 'img/romans/v_ch4.svg', 'img/romans/v_ch5.svg', 'img/romans/v_ch6.svg', 'img/romans/v_ch7.svg', 'img/romans/v_ch8.svg', 'img/romans/v_ch9.svg', 'img/romans/v_ch10.svg', 'img/romans/v_epilogue.svg'];

self.addEventListener('install', e => {
  // cache: 'reload' : on prend les fichiers sur le serveur, jamais dans le cache du navigateur
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Vidéos : laissées au navigateur (lecture par morceaux), jamais mises en cache.
  if (/\.(mp4|webm|mp3|pdf)$/.test(url.pathname)) return;   // vidéos, son de veille et livres PDF : jamais en cache
  // Pages : le réseau d'abord (pour recevoir les mises à jour) ; le cache si l'on est hors connexion
  // ou si le réseau ne répond pas en 3 secondes.
  if (req.mode === 'navigate') {
    e.respondWith(new Promise(res => {
      let done = false; const finish = r => { if (!done && r) { done = true; res(r); } };
      const t = setTimeout(() => caches.match('./').then(finish), 3000);
      fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./', copy)); clearTimeout(t); finish(r); })
        .catch(() => caches.match('./').then(h => { clearTimeout(t); finish(h || Response.error()); }));
    }));
    return;
  }
  // Bibliothèque de connexion Google (Firebase) : adresse versionnée, donc gardée en cache.
  if (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }))));
    return;
  }
  // Code du site (scripts, styles, données) : le cache de la version en cours d'abord, pour un démarrage
  // immédiat. Chaque mise à jour change VERSION : le nouveau service worker recharge alors tous les fichiers
  // et la page se recharge une fois d'elle-même (boot.js).
  if (url.origin === location.origin && /\.(js|css|webmanifest)$/.test(url.pathname)) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req, { ignoreSearch: true }).then(hit => hit ||
      fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }))));
    return;
  }
  // Images et polices : le cache d'abord, puis mise à jour en arrière-plan.
  if (url.origin === location.origin) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
