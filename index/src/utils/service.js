import api from './api'
import request from './request'

export function configService () {
  return request.apiGet(api.config)
}

export function findByArticleTitle (articleTitle) {
  return request.apiGet(api.findByArticleTitle, { articleTitle })
}
