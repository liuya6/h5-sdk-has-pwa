<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted() {
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
    const loadingDom = document.querySelector("#loading");
    if (loadingDom) {
      loadingDom.classList.add("hide");
    }
  }
}
</script>

<style lang="scss" scoped></style>
