import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
    children: [
      {
        path: "/",
        name: "recommend",
        component: () => import("../views/Home/components/Recommend.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/rank",
        name: "ranking",
        component: () => import("../views/Home/components/Ranking.vue"),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/detail",
    name: "musicDetail",
    component: () => import("../views/MusicDetail/MusicDetail.vue"),
    meta: {
      index: 2,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
