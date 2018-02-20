import Vue from 'vue'
import TemplateToast from './Toast.vue'

const constructorToast = Vue.extend(TemplateToast)

let instance

const Toast = (options) => {
  if (!instance) {
    instance = new constructorToast({
      el: document.createElement('div'),
    })
    document.body.appendChild(instance.$el)
  }

  Vue.nextTick(() => {
    clearTimeout(instance.timer)
    instance.closed = false
    instance.visible = true
    instance.message = options.message === undefined ? options : options.message
    instance.position = options.position === undefined ? 'middle' : options.position
    instance.timer = setTimeout(() => {
      if (instance.closed) return false
      instance.visible = false
      instance.closed = true
    }, options.duration === undefined ? 3000 : options.duration)
  })

  return instance
}

export default Toast
