<template>
  <div class="content-container">
    <!-- tab组件容器 -->
    <div class="tab-container">
      <TAB></TAB>
    </div>
    <!-- 子应用渲染容器 -->
    <div class="app-container">
      <!-- 动态渲染微应用挂载容器 -->
      <!-- 实现多实例同时运行，实现跨应用的keepAlive功能 -->
      <div v-for="app in apps" :key="app.name" :id="app.name"></div>
    </div>
  </div>
</template>

<script>
import TAB from '@comp/Tab/index.vue'
import apps from '@/micro/apps'

export default {
  components: { TAB },
  data () {
    return {
      theme: window.custom.menuTheme,
      apps
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
