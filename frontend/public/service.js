const CACHE_NAME = 'rural-edu-cache-v1';
const urlsToCache = ['/', '/index.html'];


self.addEventListener('install', event => {
event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});


self.addEventListener('fetch', event => {
event.respondWith(
fetch(event.request).catch(() => caches.match(event.request).then(resp => resp || caches.match('/index.html')))
);
});