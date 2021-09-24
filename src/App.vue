<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import actions from '@/micro/actions'

export default {
  name: 'App',
  data () {
    return {
      // 是否完成路由渲染
      flag: false,
      isMicro: window.__POWERED_BY_QIANKUN__
    }
  },
  computed: {
    listenRoutes () {
      return this.$store.state.user.routes
    }
  },
  watch: {
    listenRoutes: {
      deep: true,
      immediate: true,
      handler: function (routes) {
        // 添加动态路由信息
        routes.forEach(route => {
          this.$router.addRoute(route)
        })
      }
    }
  },
  created () {
    let self = this
    actions.onGlobalStateChange(state => {
      console.log(self.flag)
      if (!self.flag) {
        // 获取当前微应用应生成的路由
        let routes = state.routes['micro-sample']
        // 整理动态路由
        self.$store.dispatch('user/GenerateRoutes', routes)
        self.flag = true
      }
      // 获取当前微应用应该进行缓存的tab页
      // let keepAlive = state.loadedApps['micro-sample'].route
    })
  }
}
</script>

<style>

</style>
