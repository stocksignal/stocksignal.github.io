importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com'|'https://fonts.gstatic.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);


workbox.routing.registerRoute(
  ({request}) => request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
    })
  );

  workbox.routing.registerRoute(
  new RegExp('(https://api.niftytrader.in|https://oidata-server)*'),
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'data',
  })
);