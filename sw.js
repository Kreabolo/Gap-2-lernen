// Offline-Cache für den GAP II Trainer. Version wird bei jedem Build erneuert.
const CACHE = 'gap2-202610301400';
const CORE = ['./', 'index.html', 'css/app.css', 'js/inhalte.js', 'js/app.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Eigene Dateien (Seite, CSS, JS): erst Netz für Updates, sonst Cache
  if (req.mode === 'navigate' || (url.origin === location.origin && /\.(html|css|js)$/.test(url.pathname))) {
    const key = req.mode === 'navigate' ? 'index.html' : req;
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(key, c)); } return r; })
      .catch(() => caches.match(key, {ignoreSearch: true})));
    return;
  }
  // Alles andere (Icons, Schriften): Cache zuerst, dann Netz und merken
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return r;
  })));
});
