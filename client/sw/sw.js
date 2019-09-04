'use strict';

const FALLBACK_IMAGE_URL = 'https://localhost:3100/images/fallback-grocery.png'
const fallbackImages = 'fallback-images';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(fallbackImages)
      .then(cache => {
        cache.add(FALLBACK_IMAGE_URL);
      })
  )
});
self.addEventListener('activate', (event) => {
  caches.open(fallbackImages).then(cache => {
    caches.keys().then(cacheNames => {

    });
  })

});

self.addEventListener('fetch', event => {
  let acceptHeader = event.request.headers.get('accept');
  let requestUrl = new URL(event.request.url);
  if (acceptHeader.indexOf('image/*') >= 0 &&
    requestUrl.pathname.indexOf('/images/') === 0) {
    event.respondWith(fetchImageOrFallback(event));
  }
});

function fetchImageOrFallback(event) {

  return fetch(event.request, {
    mode: 'cors'
  }).then((response) => {
    if (response.ok) {
      return response;
    }
    return caches.match(FALLBACK_IMAGE_URL, {
      cacheName: fallbackImages
    });
  }).catch((e) => caches.match(FALLBACK_IMAGE_URL, {
    cacheName: fallbackImages
  }));

}
