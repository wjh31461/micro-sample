import Vue from 'vue'
import App from './App.vue'
// 自定义插件
import './plugins'
// vue-x
import { store, initStore } from './store/index'
// vue-router
import { initRouter } from './router/index'
// 全局样式
import '@/styles/global.less'
// 微前端
import actions from '@/micro/actions'
// 获取webpack配置信息
import config from '@/../package.json'

Vue.config.productionTip = false

let instance = null
let router = null
function render (props) {
  router = initRouter()

  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }
  instance = new Vue({
    store,
    router,
    render: h => h(App),
    created () {
      // 初始化vuex存储空间
      initStore()
      // 根据配置进行渲染
      initRender()
    }
  })
  if (window.__POWERED_BY_QIANKUN__) {
    // 共享组件
    sharedComponents()
    const { container } = props
    instance.$mount(container ? container.querySelector('#app') : '#app')
  } else {
    instance.$mount('#app')
  }
}

function initRender () {
  if (!window.__POWERED_BY_QIANKUN__) {
    // 如果不存在登录页面，直接加载页面
    if (!window.custom.loginPage) {
      store.dispatch('user/Navigation')
    } else {
      // 如果存在登录页面，则先进入登录页面
      router.push('/login')
    }
  }
}

// 共享组件
function sharedComponents () {
  let sharedComponents = {}
  sharedComponents[config.name] = {}
  // 获取shared中入口文件注册的所有共享组件
  let components = require('@/components/shared/index.js')
  // 遍历注册
  Object.keys(components).forEach(name => {
    sharedComponents[config.name][name] = components[name]
  })
  sharedComponents = Object.assign(window.sharedComponents, sharedComponents)
  window.sharedComponents = _.cloneDeep(sharedComponents)
}

/* eslint-disable */
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
/* eslint-disable */

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
	render()
}

// bootstrap 只会在微应用初始化的时候调用一次
// 下次微应用重新进入时会直接调用mount钩子，不会再重复触发bootstrap
// 通常我们可以在这里做一些全局变量的初始化，比如不会在unmount阶段被销毁的应用级别的缓存等
export async function bootstrap () {
  
}

// 应用每次进入都会调用mount方法，通常我们在这里触发应用的渲染方法
export async function mount (props) {
	render(props)
}

// 应用每次切出/卸载会调用的方法，通常在这里我们会卸载微应用的应用实例
export async function unmount () {
  instance.$destroy()
  instance = null
  router = null
}