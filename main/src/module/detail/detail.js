import Vue from 'vue'
import App from './App'

// 写入全局样式
import '@/assets/css/reset.css'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

export default app
