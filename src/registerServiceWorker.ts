import { register, unregister } from "register-service-worker";

import { Dialog, Notify } from "vant";

const cacheVersion =
  process.env.NODE_ENV === "production"
    ? process.env.CACHE_VERSION
    : Date.now();

if ("serviceWorker" in navigator) {
  // unregister();
  register(
    `${process.env.BASE_URL}service-worker.js?cacheVersion=${cacheVersion}`,
    {
      ready() {
        console.log(
          "service worker正在从缓存中为app提供服务.\n" +
            "查看更多, 访问 https://goo.gl/AFskqB"
        );
      },
      registered(registration) {
        if (process.env.NODE_ENV === "production") {
          Dialog.confirm({
            title: "提示",
            message: "有新内容可用；请刷新。",
          }).then(() => {
            navigator.serviceWorker
              .getRegistration()
              .then(() => {
                skipWaiting(registration);
              })
              .then(() => {
                window.location.reload();
              });
          });
        }

        if (registration.waiting) {
          return;
        }
        Notify({
          type: "success",
          message: "service worker 已注册",
        });
      },
      cached() {
        Notify({
          type: "success",
          message: "内容已缓存以供离线使用",
        });
      },
      updatefound() {
        // Notify({
        //   type: "success",
        //   message: "service worker 正在下载新内容",
        // });
        console.log("service worker 正在下载新内容");
      },
      updated() {
        console.log("updated");
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
        // unregister(); // 注册期间失败直接卸载sw
        console.log(error, "error");
      },
    }
  );
}

function skipWaiting(registration: any) {
  const worker = registration.waiting;
  if (!worker) {
    return Promise.resolve();
  }
  // 这里是参考vue-press的写法
  // 利用MessageChannel返回一个promise
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    worker.postMessage({ type: "skip-waiting" }, [channel.port2]);
  });
}
