import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import {
  Login
} from '../views/myBlogManagerPages'

export function createRouter () {
  return new Router({
    routes: [
      { path: '/', component: Login }
    ]
  })
}
