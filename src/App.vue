<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  created() {
    this.hideLoading();
  }

  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }

  hideLoading() {
    setTimeout(() => {
      const loadingDom = document.querySelector("#loading");
      if (loadingDom) {
        loadingDom.classList.add("hide");
      }
    }, 500);
  }
}
</script>

<style lang="scss" scoped></style>
