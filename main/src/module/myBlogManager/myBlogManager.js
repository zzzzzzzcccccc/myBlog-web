import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import { createRouter } from '../../router/MyBlogManagerRouter'
import {
  Icon,
  Button,
  Input,
  Form,
  FormItem,
  Menu,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Pagination,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Dialog,
  Radio,
  Select,
  Option,
  Tree,
  Tag,
  ColorPicker
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(Icon)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(ColorPicker)

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
