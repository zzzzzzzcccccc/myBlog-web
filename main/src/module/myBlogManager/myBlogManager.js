import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import { createRouter } from '../../router/MyBlogManagerRouter'
import {
  Icon,
  Button,
  Form,
  FormItem
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(Icon)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)

const router = createRouter()

// 写入全局样式
import '@/assets/css/reset.css'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

export default app
