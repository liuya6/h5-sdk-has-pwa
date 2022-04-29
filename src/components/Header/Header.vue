<template>
  <div>
    <div class="header">
      <span> {{ title }} </span>
      <div class="left">
        <slot name="left"> </slot>
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop()
  title: string | undefined;

  back() {
    return this.$router.back();
  }

  created() {
    console.log(this.title, "title");
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  z-index: 99;
  width: 100%;
  line-height: 44px;
  background-color: $theme;
  color: #fff;
  font-size: 16px;
  text-align: center;
  .left,
  .right {
    position: absolute;
    top: 0;
    width: 44px;
    text-align: center;
    line-height: 44px;
    .iconfont {
      font-size: 20px;
    }
  }
  .right {
    right: 0;
  }
}
.placeholder {
  height: 44px;
}
</style>
