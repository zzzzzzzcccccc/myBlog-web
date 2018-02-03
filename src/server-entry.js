import Vue from 'vue'
import { createApp } from './app'
import service from './utils/service'

const { app, store } = createApp()

export default function (context) {
  return Promise.all([
    service.indexNavService(),
    service.commentService()
  ]).then((res) => {
    res.forEach((item, index) => {
      if (index === 0) setState('navList', item.data)
      if (index === 1) setState('commitList', item.data.list)
    })

    context.state = store.state
    return app
  })
}

const setState = (tagName, data) => {
  Vue.set(store.state, tagName, data)
}
