import { http } from "../http";

// 获取歌单全部音乐
export function getPlayListDetail(params: { id: string }) {
  return http.get("api/playlist/detail", {
    params: {
      timerstamp: Date.now(),
      ...params,
    },
  });
}

// 获取歌曲详情 // ids=1,2
export function getMusicDetail(params: { ids: string }) {
  return http.get("api/song/detail", { params });
}
