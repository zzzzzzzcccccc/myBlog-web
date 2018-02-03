import api from './api'
import request from './request'

const indexNavService = () => {
  return request.apiGet(api.indexNav)
}

const commentService = () => {
  return request.apiPost(api.comment)
}

export default {
  indexNavService,
  commentService
}
