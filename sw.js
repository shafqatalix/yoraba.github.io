const CACHE_NAME = 'yoraba-pwa-v3.1';

const INITIAL_CACHED_RESOURCES = [
  '/',
  '/tools/',
  '/finance/',
  '/multimedia/',
  '/calculators/',
  '/manifest.json',
  '/images/logo.svg'
];

// Install event - cache initial resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(INITIAL_CACHED_RESOURCES);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Stale-while-revalidate strategy
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip browser-sync or extension requests
  if (event.request.url.includes('browser-sync') || event.request.url.startsWith('chrome-extension')) {
    return;
  }

  // Bypass service worker for cross-origin CDN and third-party requests
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Only cache valid responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(error => {
        // Network failed (offline), return cached response if it exists
        if (cachedResponse) {
          return cachedResponse;
        }
        throw error;
      });

      // Return cached response immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
