importScripts(
  "https://cdn.bootcdn.net/ajax/libs/workbox-sw/6.5.3/workbox-sw.min.js"
);

if (workbox) {
  console.log("workbox加载成功。");
  self.addEventListener("message", (event) => {
    const replyPort = event.ports[0];
    const message = event.data;
    if (replyPort && message && message.type === "skip-waiting") {
      event.waitUntil(
        self
          .skipWaiting()
          .then(() => {
            workbox.core.clientsClaim();
            replyPort.postMessage({ error: null });
          })
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

  // 跳过等待期
  // workbox.core.skipWaiting();
  // 一旦激活就开始控制任何现有客户机（通常是与skipWaiting配合使用）
  // workbox.core.clientsClaim();

  // 删除过期缓存
  workbox.precaching.cleanupOutdatedCaches();

  // 预缓存 index.html
  workbox.precaching.precacheAndRoute([
    {
      url: "/index.html",
      revision: "1.0.1",
    },
  ]);

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

  // api接口的缓存策略
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

  // 图片的缓存策略
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
}
