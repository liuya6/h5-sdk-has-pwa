// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"
// );
importScripts(
  "https://cdn.bootcdn.net/ajax/libs/workbox-sw/6.5.3/workbox-sw.min.js"
);

console.log(workbox, "workbox");

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
  // workbox.routing.registerRoute(
  //   new RegExp("/"),
  //   new workbox.strategies.NetworkFirst({
  //     // 缓存自定义名称
  //     cacheName: "html-caches",
  //     plugins: [
  //       // 需要缓存的状态筛选
  //       new workbox.CacheableResponsePlugin({
  //         statuses: [0, 200],
  //       }),
  //       // 缓存时间（秒）
  //       new workbox.ExpirationPlugin({
  //         // 最大缓存数量
  //         maxEntries: 20,
  //         // 缓存时间12小时
  //         maxAgeSeconds: 12 * 60 * 60,
  //       }),
  //     ],
  //   }),
  //   "GET"
  // );

  // js css的缓存策略
  workbox.routing.registerRoute(
    /.*.(?:js|css|json|ico)/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "js-css-json-ico-caches",
      plugins: [
        // 需要缓存的状态筛选
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200, 304],
        }),
        // 缓存时间
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\/api/,
    new workbox.strategies.NetworkFirst({
      // 可能存在一些网络请求，他们花费的时间很长，那么通过一些配置，让任何在超时内无法响应的网络请求都强制回退到缓存获取。
      networkTimeoutSeconds: 10,
      cacheName: "api-caches",
      plugins: [
        // 需要缓存的状态筛选
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        // 缓存时间
        new workbox.expiration.ExpirationPlugin({
          // 缓存最多50个请求
          maxEntries: 50,
          // 缓存一小时
          maxAgeSeconds: 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\.(jpe?g|png|svg)/,
    new workbox.strategies.CacheFirst({
      cacheName: "image-cache",
      fetchOptions: {
        mode: "cors",
      },
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          // 对图片资源缓存 1 星期
          maxAgeSeconds: 7 * 24 * 60 * 60,
          // 匹配该策略的图片最多缓存 10 张
          // maxEntries: 10,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/p2.music.126\.net\/.*\.(jpe?g|png)/,
    new workbox.strategies.CacheFirst({
      cacheName: "cors-image-cache",
      fetchOptions: {
        mode: "cors",
      },
      // 假设图片资源缓存的存取需要忽略请求 URL 的 search 参数，可以通过设置 matchOptions 来实现
      matchOptions: {
        ignoreSearch: true,
      },
    })
  );
}

// 1 sw怎么删除所有缓存
// 2 workbox怎么导入
