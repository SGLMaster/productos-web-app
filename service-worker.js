/* eslint-disable no-undef */
// @ts-nocheck
importScripts('./packages/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "packages/card-producto/card-producto.js",
    "revision": "81fcb5cb9fa8dd9ba32f483de401f4f0"
  },
  {
    "url": "packages/dialog-agregar-producto/dialog-agregar-producto.js",
    "revision": "47a6ab01c112e478bcbf61c2f4626c92"
  },
  {
    "url": "packages/dialog-agregar-producto/index.js",
    "revision": "6199427c518cc397ee95b9471f6d474c"
  },
  {
    "url": "packages/dialog-agregar-producto/src/DialogAgregarProducto.js",
    "revision": "05d76f9e0d92e728cea4cd4fc2bbc251"
  },
  {
    "url": "packages/dialog-login/dialog-login.js",
    "revision": "612cf901008d5e0e984da6c90a55fa55"
  },
  {
    "url": "packages/dialog-login/index.js",
    "revision": "92e9eca0da7f3cb42949b758ac1ce638"
  },
  {
    "url": "packages/dialog-login/src/DialogLogin.js",
    "revision": "53dcedc1d38b2e17bb3a1f3a9dddcbbc"
  },
  {
    "url": "packages/page-main/index.js",
    "revision": "49691480d9143d7490adc7d387fce8bd"
  },
  {
    "url": "packages/page-main/page-main.js",
    "revision": "a93e0b7ac5029b2626ad693c1dd9d72e"
  },
  {
    "url": "packages/page-main/src/PageMain.js",
    "revision": "4b02b3e8b1a29b3b26538946bd9bcb8d"
  },
  {
    "url": "packages/page-main/stories/index.stories.js",
    "revision": "739f8e440bc194852c6af700e76b2ad6"
  },
  {
    "url": "packages/page-main/test/page-main.test.js",
    "revision": "d571ede798983dbb6fe310976b53d801"
  },
  {
    "url": "packages/page-one/index.js",
    "revision": "a7e823eb2747e1955dc84e6b36409e46"
  },
  {
    "url": "packages/page-one/page-one.js",
    "revision": "f79ae07812f9820fb06e003fab7f15b1"
  },
  {
    "url": "packages/page-one/src/PageOne.js",
    "revision": "149e812be9b291d0f31a8fac3fe8e30a"
  },
  {
    "url": "packages/page-one/stories/index.stories.js",
    "revision": "33465cfedc04be4e5fef84f2a08c3cac"
  },
  {
    "url": "packages/page-one/test/page-one.test.js",
    "revision": "41057399760452b38190d47b580a210b"
  },
  {
    "url": "packages/page-productos/index.js",
    "revision": "ae94995377f3a4517d302c5b3e50ed72"
  },
  {
    "url": "packages/page-productos/page-productos.js",
    "revision": "f13699c5e72d90d10d0b76bbf3d4025e"
  },
  {
    "url": "packages/page-productos/src/PageProductos.js",
    "revision": "0371194852ae063c8e6032c3c5875b02"
  },
  {
    "url": "packages/productos-app/index.js",
    "revision": "9de98eabfea1fe01041e745f810cbd9d"
  },
  {
    "url": "packages/productos-app/productos-app.js",
    "revision": "5c4109b17eaf19c143c0421e9c256d11"
  },
  {
    "url": "packages/productos-app/src/open-wc-logo.js",
    "revision": "53092aca0574aea80781b7bb0f096864"
  },
  {
    "url": "packages/productos-app/src/ProductosApp.js",
    "revision": "74e5b95cb3fed98bc08bee918d06cc24"
  },
  {
    "url": "packages/productos-app/src/templateAbout.js",
    "revision": "c587ecd87f318cba49eec45c1c1fd59b"
  },
  {
    "url": "packages/productos-app/stories/index.stories.js",
    "revision": "f0e05024797ccdec453cc224527c70a3"
  },
  {
    "url": "packages/productos-app/test/productos-app.test.js",
    "revision": "a144c4360b21c629561d9d495f9564ab"
  },
  {
    "url": "packages/redux/actions/actions.js",
    "revision": "4738e0274e76955f7cd7082e9067a6d2"
  },
  {
    "url": "packages/redux/reducers/reducer.js",
    "revision": "b0d541bc5793be501a5c5bb330067702"
  },
  {
    "url": "packages/redux/store.js",
    "revision": "3b38cb92978f3ef6169e4d199a81113e"
  },
  {
    "url": "packages/workbox-sw.js",
    "revision": "6e1e47d706556eac8524f396e785d4bb"
  },
  {
    "url": "index.html",
    "revision": "440b29f78785616b8c13c71af5b34fa8"
  }
]);

  workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'));

  workbox.routing.setCatchHandler(() => console.log('Error fetching...'));

  workbox.routing.registerRoute(/\.js$/, new workbox.strategies.CacheFirst());
  workbox.routing.registerRoute(/\.html$/, new workbox.strategies.CacheFirst());
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
