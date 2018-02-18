const baseUrl = `http://127.0.0.1:8080`
// const baseUrl = `https://zouchenwd.cn:8090`

export default {
  index: {
    navList: baseUrl + '/index/navList'
  },
  share: {
    list: baseUrl + '/outside/article/list',
    updateVisitCount: baseUrl + '/outside/article/updateVisitCount'
  },
  article: {
    list: baseUrl + '/inside/article/list',
    updateVisitCount: baseUrl + '/inside/article/updateVisitCount',
    findById: baseUrl + '/inside/article/findById'
  },
  comment: {
    list: baseUrl + '/comment/list'
  },
  progress: {
    list: baseUrl + '/progress/list'
  },
  sysUser: {
    accountLogin: baseUrl + '/sysUser/accountLogin',
    list: baseUrl + '/sysUser/list',
    addOne: baseUrl + '/sysUser/addOne',
    updateOne: baseUrl + '/sysUser/updateOne',
    deleteOne: baseUrl + '/sysUser/deleteOne'
  },
  sysRole: {
    list: baseUrl + '/sysRole/list',
    addOne: baseUrl + '/sysRole/addOne',
    updateOne: baseUrl + '/sysRole/updateOne',
    deleteOne: baseUrl + '/sysRole/deleteOne'
  }
}
