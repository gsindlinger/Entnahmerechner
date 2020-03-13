const cacheName = 'rentenrechner-pwa';
const filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/root.css',
  '/css/rangeSlider.css',
  '/css/onOffSwitch.css',
  '/css/mediaQueries.css',
  '/css/css/all.css',
  '/css/css/all.min.css',
  '/css/css/brands.css',
  '/css/css/brands.min.css',
  '/css/css/fontawesome.css',
  '/css/css/fontawesome.min.css',
  '/css/css/regular.css',
  '/css/css/regular.min.css',
  '/css/css/solid.css',
  '/css/css/solid.min.css',
  '/css/css/svg-with-js.css',
  '/css/css/svg-with-js.min.css',
  '/css/css/v4-shims.css',
  '/css/css/v4-shims.min.css',
  '/css/fonts/changa-v9-latin-regular.eot',
  '/css/fonts/changa-v9-latin-regular.svg',
  '/css/fonts/changa-v9-latin-regular.ttf',
  '/css/fonts/changa-v9-latin-regular.woff',
  '/css/fonts/changa-v9-latin-regular.woff2',
  '/css/fonts/montserrat-v14-latin-regular.eot',
  '/css/fonts/montserrat-v14-latin-regular.svg',
  '/css/fonts/montserrat-v14-latin-regular.ttf',
  '/css/fonts/montserrat-v14-latin-regular.woff',
  '/css/fonts/montserrat-v14-latin-regular.woff2',
  '/css/webfonts/fa-brands-400.eot',
  '/css/webfonts/fa-brands-400.svg',
  '/css/webfonts/fa-brands-400.ttf',
  '/css/webfonts/fa-brands-400.woff',
  '/css/webfonts/fa-brands-400.woff2',
  '/css/webfonts/fa-regular-400.eot',
  '/css/webfonts/fa-regular-400.svg',
  '/css/webfonts/fa-regular-400.ttf',
  '/css/webfonts/fa-regular-400.woff',
  '/css/webfonts/fa-regular-400.woff2',
  '/css/webfonts/fa-solid-900.eot',
  '/css/webfonts/fa-solid-900.svg',
  '/css/webfonts/fa-solid-900.ttf',
  '/css/webfonts/fa-solid-900.woff',
  '/css/webfonts/fa-solid-900.woff2',
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
  '/css/Hintergrund.jpg',
  '/js/blackScholesModel.js',
  '/js/d3v5Min.js',
  '/js/fontAwesome.js',
  '/js/hilfsprozeduren.js',
  '/js/main.js',
  '/js/mediaQueries.js',
  '/js/openPopup.js',
  '/js/pageSlider.js',
  '/js/renteBerechnen.js',
  '/js/seedRandom.js',
  '/js/swiped-events.min.js',
  '/js/variables.js',
  '/js/vizFunctions.js',
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
