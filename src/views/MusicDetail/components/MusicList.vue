<template>
  <div>
    <ul class="musicList">
      <li
        v-for="(item, i) in musicList"
        :key="item.id"
        :class="{
          'bd-btm': true,
        }"
      >
        <span>
          {{ i + 1 }}
        </span>
        <div class="des">
          <p>{{ item.name }}</p>
          <p>
            <span v-for="(child, j) in item.ar" :key="j"
              >{{ child.name }},</span
            >
            <span>{{ `<${item.al.name}>` }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MusicList extends Vue {
  @Prop()
  musicList: any;
}
</script>

<style scoped lang="scss">
.musicList {
  transform: translate3d(0, 0, 0);
  li {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    &.disable {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #eee;
        opacity: 0.8;
      }
    }

    &:last-child {
      border-bottom: none;
    }
    > span {
      width: 35px;
      font-size: 15px;
      &.iconfont {
        font-size: 18px;
        color: $theme;
      }
      &:last-child {
        line-height: 60px;
        font-size: 25px;
      }
    }
    p {
      width: calc(100vw - 10px - 35px - 35px);
    }
  }
}

.des {
  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    &:first-child {
      font-size: 18px;
      color: #2d2f2d;
    }
    &:last-child {
      font-size: 13px;
      margin-top: 5px;
      color: #7a7b7a;
    }
    span {
      &:last-child {
        font-size: 12px;
        padding-left: 5px;
        color: #999;
      }
    }
  }
}
</style>
