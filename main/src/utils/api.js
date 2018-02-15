// const baseUrl = `http://127.0.0.1:8080`
const baseUrl = `https://zouchenwd.cn:8090`

export default {
  index: {
    navList: baseUrl + '/index/navList'
  },
  share: {
    list: baseUrl + '/outside/article/list',
    updateVisitCount: baseUrl + '/outside/article/updateVisitCount'
  },
  progress: {
    list: baseUrl + '/progress/list'
  }
}
