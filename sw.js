const cacheName = 'sola-v1';
const staticAssets = [
  './',
  './index.html',
  './sadrzaj.html',
  './css/tptpstil.css',
  './js/tptpskripte.js',
  './images/haljina.jpg',
  './images/hlace.jpg',
  './images/haljina2.jpg',
  './images/kosulja.jpg',
  './images/suknja.jpg',
  './images/muska kosulja.jpg',
  './images/ikona192.png',
  './images/ikona512.png'
];

// Instalacija i keširanje resursa
self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// Slušanje zahtjeva i serviranje iz keša ako nema mreže
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});