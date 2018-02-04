import api from './api'
import request from './request'

export function configService () {
  return request.apiGet(api.config)
}
