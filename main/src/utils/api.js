const baseUrl = `http://zouchenwd.cn:8080`

export default {
  index: {
    navList: baseUrl + '/index/navList'
  },
  share: {
    list: baseUrl + '/outside/article/list',
    updateVisitCount: baseUrl + '/outside/article/updateVisitCount'
  }
}
