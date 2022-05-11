importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
);

if (workbox) {
  console.log("come in workbox");

  self.addEventListener("message", (event) => {
    console.log(event, "!!!");
    const replyPort = event.ports[0];
    const message = event.data;
    if (replyPort && message && message.type === "skip-waiting") {
      event.waitUntil(
        self
          .skipWaiting()
          .then(() => replyPort.postMessage({ error: null }))
          .catch((error) => replyPort.postMessage({ error }))
      );
    }
  });

  // 删除所有log
  workbox.setConfig({ debug: false });

  // Workbox 加载完成

  workbox.core.setCacheNameDetails({
    prefix: "h5-sdk",
    suffix: "v1",
    precache: "precache",
    runtime: "runtime",
  });

  // 预缓存
  workbox.precaching.precacheAndRoute([
    {
      url: "/index.html",
      revision: "1.0.0",
    },
  ]);

  // 跳过等待期
  // workbox.core.skipWaiting();
  // 一旦激活就开始控制任何现有客户机（通常是与skipWaiting配合使用）
  workbox.core.clientsClaim();

  // 删除过期缓存
  workbox.precaching.cleanupOutdatedCaches();

  // html的缓存策略
  workbox.routing.registerRoute(
    new RegExp("/"),
    new workbox.strategies.NetworkFirst({
      // 缓存自定义名称
      cacheName: "html-caches",
      plugins: [
        // 需要缓存的状态筛选
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        // 缓存时间（秒）
        new workbox.expiration.Plugin({
          // 最大缓存数量
          maxEntries: 20,
          // 缓存时间12小时
          maxAgeSeconds: 12 * 60 * 60,
        }),
      ],
    }),
    "GET"
  );

  // js css的缓存策略
  // workbox.routing.registerRoute(
  //   new RegExp("/js/.*.(?:js|css)"),
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: "js-css-caches",
  //     plugins: [
  //       // 需要缓存的状态筛选
  //       new workbox.cacheableResponse.Plugin({
  //         statuses: [0, 200],
  //       }),
  //       // 缓存时间
  //       new workbox.expiration.Plugin({
  //         maxEntries: 20,
  //         maxAgeSeconds: 60 * 60,
  //       }),
  //     ],
  //   })
  // );

  workbox.routing.registerRoute(
    /\/api/,
    new workbox.strategies.NetworkFirst({
      cacheName: "api-caches",
      plugins: [
        // 需要缓存的状态筛选
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        // 缓存时间
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 12 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\.(jpe?g|png|svg)/,
    new workbox.strategies.CacheFirst({
      cacheName: "image-runtime-cache",
      fetchOptions: {
        mode: "cors",
      },
      plugins: [
        new workbox.expiration.Plugin({
          // 对图片资源缓存 1 星期
          maxAgeSeconds: 7 * 24 * 60 * 60,
          // 匹配该策略的图片最多缓存 10 张
          // maxEntries: 10,
        }),
      ],
    })
  );
}
