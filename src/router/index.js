import Vue from 'vue'
import Router from 'vue-router'
import { AppLayout, ViewLayout } from '@/components/Layout'

Vue.use(Router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/micro-sample' : process.env.BASE_URL
  })
}
let router = null
// 初始化路由实例
function initRouter () {
  router = createRouter()
  
  return router
}
// 动态路由表
const routerMap = {
  'home': () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue')
}
// 动态路由处理
function generatorRouter (data) {
  return new Promise((resolve, reject) => {
    let routes = [
      {
        path: '/',
        name: '',
        meta: {
          title: ''
        },
        component: window.__POWERED_BY_QIANKUN__ ? ViewLayout : AppLayout,
        children: []
      }
    ]
    data.forEach(route => {
      const currentRoute = {
        // 路由路径，target地址
        path: '/' + route.target,
        // 路由名称
        name: route.title,
        // 该组件对应的路由组件
        component: routerMap[route.target],
        meta: {
          title: route.title
        }
      }
      routes[0].children.push(currentRoute)
      routes[0].redirect = routes[0].children[0].path
    })
    resolve(routes)
  })
}

export { initRouter, generatorRouter }
