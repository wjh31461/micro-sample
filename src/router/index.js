import config from '@/../package.json'
import Vue from 'vue'
import Router from 'vue-router'
import { AppLayout, ViewLayout } from '@/components/Layout'

Vue.use(Router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/' + config.name : process.env.BASE_URL
  })
}
let router = null
// 初始化路由实例
export function initRouter () {
  router = createRouter()
  
  return router
}
// routerConfig对象
let routes = {
  path: '/',
  name: '',
  meta: { title: '' },
  // 在微前端模式下采用ViewLayout自启动模式下采用完整的AppLayout
  component: window.__POWERED_BY_QIANKUN__ ? ViewLayout : AppLayout,
  children: []
}

// 动态路由表
const routerMap = {
  'home': () => import('@/views/home/home.vue'),
  '404': () => import('@/views/error/404.vue')
}
// 动态路由处理
export function generatorRouter (data) {
  return new Promise((resolve, reject) => {
    data.forEach(route => {
      const currentRoute = {
        // 路由路径，target地址
        path: '/' + route.target,
        // 路由名称
        name: route.target,
        // 该组件对应的路由组件
        component: routerMap[route.target] ? routerMap[route.target] : routerMap['404'],
        meta: {
          title: route.title
        }
      }
      routes.children.push(currentRoute)
    })
    // 设置动态路由重定向路径
    routes.redirect = routes.children[0].path
    resolve(routes)
  })
}
