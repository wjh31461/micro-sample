<template>
  <div class="content-container">
    <!-- tab组件容器 -->
    <div class="tab-container">
      <TAB></TAB>
    </div>
    <div class="app-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TAB from '@comp/Tab/index.vue'

export default {
  components: { TAB },
  data () {
    return {
      theme: window.custom.menuTheme
    }
  }
}
</script>

<style lang="less" scoped>
  .content-container{
    height: 100%;
    .tab-container{
      height: 40px;
    }
    .app-container{
      height: calc(~"100% - 40px");
    }
  }
</style>
