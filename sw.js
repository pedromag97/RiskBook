/* RiskBook service worker — offline + instalável (PWA).
   Estratégia: cache-first com preenchimento de rede. Depois da 1ª visita online,
   a app abre offline. Funciona quando servido por https (ex. GitHub Pages),
   não em file:// (os service workers não correm em file://). */
const CACHE = 'riskbook-v1';

// App shell local + dependências externas (CDN/fonte).
const LOCAL = ['./', './index.html', './manifest.json', './icon.svg'];
const REMOTE = [
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(LOCAL).catch(() => {});
    // Dependências externas: pedido no-cors (respostas opacas) para funcionar offline.
    await Promise.all(REMOTE.map(url =>
      fetch(url, { mode: 'no-cors' }).then(r => cache.put(url, r)).catch(() => {})
    ));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const resp = await fetch(event.request);
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(event.request, copy)).catch(() => {});
      return resp;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
