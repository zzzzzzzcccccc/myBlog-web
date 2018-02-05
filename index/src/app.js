import Vue from 'vue'
import App from './App.vue'
import store from './store'

export function createApp () {
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return { app, store }
}
