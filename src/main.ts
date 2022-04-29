import Vue from "vue";

// css初始化
import "normalize.css";
// 移动端布局
import "amfe-flexible";
import "./style/index.scss";

// 注册三方库
import "@/plugins/vant";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
