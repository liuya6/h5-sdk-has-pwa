<template>
  <div class="recommend">
    <Skeleton :row="30" :loading="loading">
      <div class="banner">
        <Swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
          lazy-render
        >
          <SwipeItem v-for="item in banners" :key="item.pic">
            <img :src="`${item.pic}?param=357y150`" alt="" />
          </SwipeItem>
        </Swipe>
      </div>

      <div class="content">
        <h1>推荐歌单</h1>
        <ul>
          <li
            v-for="item in playlists"
            :key="item.id"
            @click="
              $router.push({
                name: 'musicDetail',
                query: {
                  id: item.id,
                },
              })
            "
          >
            <div>
              <img v-lazy="`${item.coverImgUrl}?param=115y115`" alt="" />
              <p>
                <span class="iconfont">🎵</span
                >{{ filterCount(item.playCount) }}
              </p>
            </div>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </Skeleton>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Swipe, SwipeItem, Skeleton } from "vant";

import { HomeApi } from "@/api";

@Component({
  components: {
    Swipe,
    SwipeItem,
    Skeleton,
  },
})
export default class Recommend extends Vue {
  banners = [];
  playlists = [];

  loading = false;

  created() {
    this.initData();
  }

  initData() {
    this.loading = true;
    Promise.all([this.getBanner(), this.getMusicRecommend()]).then((res) => {
      this.banners = res[0].data.blocks[0].extInfo.banners;
      this.playlists = res[1].playlists;
      this.loading = false;
    });
  }

  async getBanner() {
    return await HomeApi.getHomePage();
  }

  async getMusicRecommend() {
    return await HomeApi.getMusicRecommend();
  }

  filterCount(count: number) {
    return `${Math.floor(count / 10000)}万`;
  }
}
</script>

<style scoped lang="scss">
.recommend {
  .banner {
    background-image: linear-gradient($theme 85%, transparent 0%);
    display: flex;
    justify-content: center;
    .van-swipe {
      height: 150px;
      width: 95%;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    overflow: hidden;
    h1 {
      font-size: 16px;
      margin: 10px 0 20px 10px;
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 115px;
        margin-left: 7.5px;
        font-size: 12px;
        .iconfont {
          font-size: 12px;
          margin-right: 5px;
        }
        div {
          width: 100%;
          height: 115px;
          background-color: #888;
          border-radius: 5px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          p {
            position: absolute;
            right: 5px;
            top: 5px;
            color: #efeff0;
            margin: 0;
          }
        }
        > p {
          color: #4c4c4c;
          margin: 10px 0;
          font-size: 12px;
          min-height: 45px;
        }
      }
    }
  }
}
</style>
