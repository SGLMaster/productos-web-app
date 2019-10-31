/* eslint-disable no-undef */
// @ts-nocheck
importScripts('./packages/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'));

  workbox.routing.setCatchHandler(() => console.log('Error fetching...'));

  workbox.routing.registerRoute(/\.js$/, new workbox.strategies.CacheFirst());
  workbox.routing.registerRoute(/\.html$/, new workbox.strategies.CacheFirst());
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
