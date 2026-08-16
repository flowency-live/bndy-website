/*
 * Legacy public-site service worker tombstone.
 *
 * bndy-backstage was previously hosted on www.bndy.co.uk and registered a
 * Workbox service worker at /sw.js with scope '/'. Browsers can retain that
 * registration long after DNS/Amplify moves the hostname to this Astro site,
 * causing the old Backstage SPA to keep being served from its precache.
 *
 * KEEP THIS FILE at /sw.js. Do not turn the marketing site into a PWA without
 * first replacing this migration deliberately.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Remove every Cache Storage entry owned by the legacy public origin.
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));

    // Take control of any tab still running the old cached SPA so its next
    // navigation cannot be answered by the retired Workbox precache.
    await self.clients.claim();

    const windows = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });

    // Remove the registration permanently. Existing controlled windows remain
    // under this worker until their navigation below completes.
    await self.registration.unregister();

    await Promise.all(windows.map(async (client) => {
      try {
        await client.navigate(client.url);
      } catch {
        // A closing/background tab is harmless; its next normal visit will use
        // the network because the legacy registration has already been removed.
      }
    }));
  })());
});

// During the very short handover window, force document navigations to the
// network rather than allowing an HTTP-cache copy of the retired SPA shell.
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request, { cache: 'reload' }));
  }
});
