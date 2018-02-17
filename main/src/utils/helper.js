import { Message } from 'element-ui'

const success = () => {
  Message.success("成功")
}

const warn = (msg='') => {
  Message.warning(msg)
}

const error = (msg='') => {
  Message.error(msg)
}

export default {
  success,
  warn,
  error
}
