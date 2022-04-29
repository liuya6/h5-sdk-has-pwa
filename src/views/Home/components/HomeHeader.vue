<template>
  <div class="home">
    <Header :title="'M U S I C'" />
    <ul>
      <li v-for="item in tabList" :key="item.path">
        <router-link :to="item.path" exact-active-class="active">{{
          item.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Header from "@/components/Header/Header.vue";

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  tabList = [
    {
      path: "/",
      title: "推荐",
    },
    {
      path: "/rank",
      title: "排行",
    },
  ];
}
</script>

<style scoped lang="scss">
.home {
  ul {
    display: flex;
    background-color: $theme;
    color: #fff;
    li {
      flex: 1;
      text-align: center;
      line-height: 44px;
      .active {
        font-weight: bold;
        position: relative;
        &:after {
          background-color: #fff;
          content: "";
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }
  }
}
</style>
