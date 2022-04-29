<template>
  <div class="musicDetails">
    <Skeleton :row="27" :loading="loading">
      <div class="musicHeader">
        <div
          :class="{
            top: true,
            fixed: topFixedFlag,
          }"
          @click="$router.back()"
          ref="topEl"
        >
          <span class="iconfont"> ㄑ </span>
          {{ musicListData.title }}
        </div>
        <img v-lazy="musicListData.bg" alt="" />
      </div>
      <div
        class="content"
        v-if="musicListData.list && musicListData.list.length"
      >
        <div class="contentTop">
          <span class="length">（共{{ musicListData.list.length }}首）</span>
        </div>
        <MusicList :musicList="musicListData.list" :showPlay="true" />
      </div>
    </Skeleton>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Skeleton } from "vant";

import MusicList from "./components/MusicList.vue";

import { MusicDetail, MusicListData } from "./type";
import { MusicDetailsApi } from "@/api";

@Component({
  components: {
    MusicList,
    Skeleton,
  },
})
export default class MusicDetails extends Vue {
  topFixedFlag = false;
  musicListData = {};
  musicDetailData = {
    playlist: {} as any,
    recommend: [] as MusicDetail[] | [],
  };
  loading = false;

  get type() {
    return this.$route.query.type;
  }

  get isRecommend() {
    return this.type === "recommend";
  }

  created() {
    this.initData();
  }

  mounted() {
    window.addEventListener("scroll", this.scroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  }

  scroll() {
    const maxY = (this.$refs.topEl as any).offsetHeight;
    this.topFixedFlag = window.scrollY > maxY;
  }

  async initData() {
    this.loading = true;
    let id = this.$route.query.id as string;
    let getMusicList = MusicDetailsApi.getPlayListDetail;
    let result = await getMusicList({
      id,
    });
    this.loading = false;
    this.musicDetailData.recommend = result.privileges;
    this.musicDetailData.playlist = result.playlist;
    this.musicListData = this.getMusicListData();
  }

  getMusicListData() {
    let data: MusicListData = {
      title: "",
      tip: "",
      bg: "",
      list: [],
    };
    data.title = "歌单";
    data.tip = this.musicDetailData.playlist.name;
    data.bg = `${this.musicDetailData.playlist.coverImgUrl}?param=375y300`;
    data.list = this.musicDetailData.playlist.tracks;
    return data;
  }

  filterCount(count: number) {
    return `${Math.floor(count / 10000)}万`;
  }
}
</script>

<style scoped lang="scss">
.musicHeader {
  height: 300px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .top {
    width: 100%;
    font-size: 18px;
    line-height: 44px;
    padding-left: 10px;
    position: absolute;
    color: #fff;
    background-color: transparent;
    transition: 0.5s;
    .iconfont {
      color: #fff;
      margin-right: 5px;
    }
    &.fixed {
      position: fixed;
      z-index: 1;
      background-color: $theme;
      width: 100%;
    }
  }
  .btm {
    position: absolute;
    bottom: 0;
    color: #fff;
    padding: 5px 0 15px 5px;
    .name {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 5px 5px;
    }
    .playCount {
      font-size: 13px;
      margin-left: 5px;
    }
  }
}
.content {
  background-color: #f2f3f4;
  border-radius: 10px 10px 0 0;
  position: relative;
  top: -10px;
  margin-bottom: -10px;
  min-height: calc(100vh - 300px);
  .contentTop {
    line-height: 44px;
    color: #363838;
    font-size: 16px;
    border-bottom: 1px solid #e3e3e3;
    padding-left: 10px;
    .iconfont {
      font-size: 18px;
      display: inline-block;
      width: 30px;
    }
    span {
      &.length {
        color: #7a7b7a;
      }
      &.addAll {
        float: right;
        font-size: 13px;
        margin-right: 10px;
        color: #666;
      }
    }
  }
}
</style>
