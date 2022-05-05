console.log("come in registerServiceWorker");
import { register, unregister } from "register-service-worker";

const cacheVersion =
  process.env.NODE_ENV === "production"
    ? process.env.CACHE_VERSION
    : Date.now();

register(
  `${process.env.BASE_URL}service-worker.js?cacheVersion=${cacheVersion}`,
  {
    ready() {
      console.log(
        "service worker正在从缓存中为app提供服务.\n" +
          "查看更多, 访问 https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service Worker 已注册.");
    },
    cached() {
      console.log("内容已缓存以供离线使用.");
    },
    updatefound() {
      console.log("正在下载新内容");
    },
    updated() {
      console.log("有新内容可用；请刷新。");
    },
    offline() {
      console.log("未找到互联网连接。应用程序正在离线模式下运行。");
    },
    error(error) {
      console.error("Service Worker 注册期间的错误：", error);
    },
  }
);

// if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//   register(
//     `${process.env.BASE_URL}service-worker.js?cacheVersion=${cacheVersion}`,
//     {}
//   );
// }
