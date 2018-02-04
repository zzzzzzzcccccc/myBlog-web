import Vue from 'vue'
import { createApp } from './app'
import {
  configService
} from './utils/service'

const { app, store } = createApp()

export default function (context) {
  return Promise.all([
    configService()
  ]).then((res) => {
    res.forEach((item, index) => {
      if (index === 0) setState('config', item.data)
    })

    context.state = store.state
    return app
  })
}

const setState = (tagName, data) => {
  Vue.set(store.state, tagName, data)
}
