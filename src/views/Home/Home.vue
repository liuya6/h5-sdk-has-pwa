<template>
  <div class="home">
    <HomeHeader />
    <div class="homeContent cl">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HomeHeader from "./components/HomeHeader.vue";

@Component({
  components: {
    HomeHeader,
  },
})
export default class Home extends Vue {}
</script>
