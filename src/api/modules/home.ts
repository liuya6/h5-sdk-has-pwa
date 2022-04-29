import { http } from "../http";

// 首页轮播
export function getHomePage() {
  return http.get("api/homepage/block/page");
}

// 首页推荐歌单
export function getMusicRecommend() {
  return http.get("api/top/playlist/highquality");
}

// 排行
export function getRanking() {
  return http.get("api/toplist/detail");
}

// 歌手
export function getSinger() {
  return http.get("api/top/artists");
}
