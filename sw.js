/* RiskBook service worker — offline + instalável (PWA).
   HTML: network-first (apanha atualizações; cai para cache offline).
   CDN/fonte/ícone: cache-first (não mudam). Funciona em https, não em file://. */
const CACHE = 'riskbook-v2';

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
    self.skipWaiting();   // ativa a nova versão o quanto antes
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));  // limpa caches antigas
    self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isDoc = req.mode === 'navigate' || req.destination === 'document'
    || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');

  if (isDoc) {
    // HTML: rede primeiro (atualizações), cache como fallback offline.
    event.respondWith((async () => {
      try {
        const resp = await fetch(req);
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return resp;
      } catch (e) {
        return (await caches.match(req)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // Restante (CDN/fonte/ícone/manifest): cache primeiro.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const resp = await fetch(req);
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return resp;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
