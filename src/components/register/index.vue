<template>
  <div id="register"></div>
</template>

<script>
import { loadMicroApp } from 'qiankun'
import apps from '@/micro/apps'
import actions from '@/micro/actions'

export default {
  data () {
    return {
      // 全部配置微应用信息
      apps,
      // 当前已加载的微应用信息
      loadedApp: {}
    }
  },
  mounted () {
    let self = this

    self.$bus.$on('onUpdateLoadedApp', function (tabs) {
      self.updateLoadedApp(tabs)
    })
  },
  beforeDestroy () {
    this.$bus.$off('onUpdateLoadedApp')
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (route) {
        if (route.fullPath !== '/') {
          this.loadApp(route)
        }
      }
    }
  },
  methods: {
    // 微应用加载
    loadApp (route) {
      let self = this
      return new Promise((resolve, reject) => {
        let microApp = apps.filter(app => route.fullPath.includes(app.activeRule))[0]
        if (!self.loadedApp[microApp.name]) {
          // 如果当前未加载该应用
          let app = loadMicroApp(microApp)
          self.loadedApp[microApp.name] = {
            app,
            route: []
          }
          app.mountPromise.then(() => {
            resolve()
          })
        } else {
          // 如果该微应用已经被加载过
          let app = self.loadedApp[microApp.name].app
          // 获取当前该子应用状态，当状态为NOT_MOUNTED时，从新触发该子应用的mount生命周期
          if (app.getStatus() === 'NOT_MOUNTED') {
            app.mount().then(() => {
              resolve()
            })
          } else {
            resolve()
          }
        }
      })
    },
    // 根据tab组件修改当前loadedApp中的route，传递给微应用完成keepAlive的渲染
    updateLoadedApp (tabs) {
      let self = this
      let keys = Object.keys(self.loadedApp)
      // 清空之前的路由缓存信息
      keys.forEach(key => {
        self.loadedApp[key].route = []
      })
      // 根据当前key与传递的tab信息记录路由缓存记录
      tabs.forEach(tab => {
        let key = keys.filter(key => tab.path.includes(key))[0]
        self.loadedApp[key].route.push(tab.path)
      })
      // 判断当前是否存在微应用已经关闭了所有tab页，如果存在则触发该微应用的unmount事件
      Promise.all(keys.map(key => {
        return new Promise((resolve, reject) => {
          if (!self.loadedApp[key].route.length) {
            // 如果该微应用的状态为MOUNTED，则卸载改微应用，释放占用资源
            if (self.loadedApp[key].app.getStatus() === 'MOUNTED') {
              self.loadedApp[key].app.unmount().then(() => {
                resolve()
              })
            } else {
              resolve()
            }
          } else {
            resolve()
          }
        })
      })).then(() => [
        // 更新loadedApp全局变量
        actions.setGlobalState({ 'loadedApp': self.loadedApp })
      ])
    }
  }
}
</script>
