import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/micro-sample/' : process.env.BASE_URL
  })
}
let router = null

function initRouter () {
  router = createRouter()
}

export { initRouter }
