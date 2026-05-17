const cacheName = 'sola-v3';
const staticAssets = [
  './',
  './index.html',
  './sadrzaj.html',
  './kontakt.html',
  './css/tptpstil.css',
  './js/tptpskripte.js',
  './images/model.jpg',
  './images/model1.jpg',
  './images/model 2.jpg',
  './images/model3.jpg',
  './images/model4.jpg',
  './images/model5.jpg',
  './images/model6.jpg',
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
  try {
    const cache = await caches.open(cacheName);
    // Cachiramo resurse individualno da izbegnemo grešku ako jedan ne postoji
    for (const asset of staticAssets) {
      try {
        await cache.add(asset);
      } catch (err) {
        console.warn('Nije moguće cachirati resurc:', asset, err);
      }
    }
    self.skipWaiting(); // Aktiviramo SW odmah
  } catch (err) {
    console.error('Greška pri kešovanju resursa:', err);
  }
});

// Slušanje zahtjeva i serviranje iz keša ako nema mreže
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
      .catch(err => {
        console.warn('Fetch failed for:', e.request.url, err);
        return new Response('Nema dostupnog resursa', { status: 503 });
      })
  );
});

// Aktivacija i brisanje starih cache verzija
self.addEventListener('activate', async e => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(name => {
      if (name !== cacheName) {
        return caches.delete(name);
      }
    })
  );
  self.clients.claim();
});