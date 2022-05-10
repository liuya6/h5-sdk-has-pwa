import { register, unregister } from "register-service-worker";

import { Dialog, Notify } from "vant";

const cacheVersion =
  process.env.NODE_ENV === "production"
    ? process.env.CACHE_VERSION
    : Date.now();

if ("serviceWorker" in navigator) {
  console.log("come in registerServiceWorker");

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
        Notify({
          type: "success",
          message: "service worker 已注册",
        });
        console.log("service worker 已注册");
      },
      cached() {
        Notify({
          type: "success",
          message: "内容已缓存以供离线使用",
        });
      },
      updatefound() {
        Notify({
          type: "success",
          message: "service worker 正在下载新内容",
        });
      },
      updated() {
        Dialog.confirm({
          title: "提示",
          message: "有新内容可用；请刷新。",
        }).then((res) => {
          console.log(res);
        });

        console.log("有新内容可用；请刷新。");
      },
      offline() {
        Notify({
          type: "danger",
          message: "未找到互联网连接。应用程序正在离线模式下运行。",
        });
      },
      error(error) {
        Notify({
          type: "danger",
          message: `Service Worker 注册期间的错误：${error}`,
        });
      },
    }
  );
}
