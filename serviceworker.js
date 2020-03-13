const cacheName = 'rentenrechner-pwa';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/rangeSlider.css',
  '/mediaQueries.css',
  '/onOffSwitch.css',
  '/root.css',
  '/blackScholesModel.js',
  '/d3v5Min.js',
  '/fontAwesome.js',
  '/hilfsprozeduren.js',
  '/main.js',
  '/mediaQueries.js',
  '/openPopup.js',
  '/pageSlider.js',
  '/renteBerechnen.js',
  '/seedRandom.js',
  '/swiped-events.min.js',
  '/variables.js',
  '/vizFunctions.js',
  '/Uni_Ulm_Logo_Ausschnitt.svg',
  '/Uni_ulm_logo.svg',
  '/svg/bad.svg',
  '/svg/check.svg',
  '/svg/confused.svg',
  '/svg/good.svg',
  '/svg/happy.svg',
  '/svg/histogram.svg',
  '/svg/lebenserwartung.svg',
  '/svg/medium.svg',
  '/svg/normal.svg',
  '/svg/rente.svg',
  '/svg/stop.svg',
  'Hintergrund.jpg',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
