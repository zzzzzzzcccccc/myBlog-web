import request from 'axios'
import qs from 'qs'

class Request {
  constructor() {
    /*
    * 公共参数
    * */
    request.defaults.params = {}
    /*
    * 请求最大时间
    * */
    request.defaults.timeout = 30 * 1000
    /*
    * 返回的http状态值
    * */
    request.defaults.validateStatus = status =>{
      return status >= 200 && status < 300
    }
    /*
    * 请求之前做的拦截器
    * */
    request.interceptors.request.use((config) => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    /*
    * 请求响应
    * */
    request.interceptors.request.use((response) => {
      return response
    }, error => {
      return Promise.reject(error)
    })
    /*
    * 赋予对象
    * */
    this.instance = request
  }

  getInstance () {
    return this.instance
  }

  apiGet(url, params={}) {
    return new Promise((resolve, reject) => {
      this.instance.get(url, { params }).then((res) => {
        resolve(res.data)
      })
    })
  }

  apiPost(url, params={}) {
    return new Promise((resolve, reject) => {
      this.instance.post(url, qs.stringify(params)).then((res) => {
        resolve(res.data)
      })
    })
  }
}

export default new Request()
