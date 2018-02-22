// const baseUrl = `http://127.0.0.1:8080`
const baseUrl = `https://zouchenwd.cn:8090`

export default {
  index: { // 首页
    navList: baseUrl + '/index/navList',
    allArticleList: baseUrl + '/index/allArticleList',
    visitCountList: baseUrl + '/index/visitCountList'
  },
  share: { // 分享
    list: baseUrl + '/outside/article/list',
    updateVisitCount: baseUrl + '/outside/article/updateVisitCount',
    addOne: baseUrl + '/outside/article/addOne',
    updateOne: baseUrl + '/outside/article/updateOne',
    deleteOne: baseUrl + '/outside/article/deleteOne'
  },
  articleType: { // 文章分类
    allList: baseUrl + '/articleType/allList',
    addOne: baseUrl + '/articleType/addOne',
    updateOne: baseUrl + '/articleType/updateOne',
    deleteOne: baseUrl + '/articleType/deleteOne',
  },
  article: { // 文章
    list: baseUrl + '/inside/article/list',
    updateVisitCount: baseUrl + '/inside/article/updateVisitCount',
    findById: baseUrl + '/inside/article/findById',
    addOne: baseUrl + '/inside/article/addOne',
    updateOne: baseUrl + '/inside/article/updateOne',
    updateByArticleContent: baseUrl + '/inside/article/updateByArticleContent',
    deleteOne: baseUrl + '/inside/article/deleteOne'
  },
  comment: { // 评论
    list: baseUrl + '/comment/list',
    addOne: baseUrl + '/comment/addOne',
    deleteOne: baseUrl + '/comment/deleteOne'
  },
  progress: { // 历程
    list: baseUrl + '/progress/list',
    addOne: baseUrl + '/progress/addOne',
    updateOne: baseUrl + '/progress/updateOne',
    deleteOne: baseUrl + '/progress/deleteOne'
  },
  sysUser: { // 用户管理
    accountLogin: baseUrl + '/sysUser/accountLogin',
    list: baseUrl + '/sysUser/list',
    addOne: baseUrl + '/sysUser/addOne',
    updateOne: baseUrl + '/sysUser/updateOne',
    deleteOne: baseUrl + '/sysUser/deleteOne'
  },
  sysRole: { // 角色/权限管理
    list: baseUrl + '/sysRole/list',
    addOne: baseUrl + '/sysRole/addOne',
    updateByRoleName: baseUrl + '/sysRole/updateByRoleName',
    updateByAuthorityList: baseUrl + '/sysRole/updateByAuthorityList',
    deleteOne: baseUrl + '/sysRole/deleteOne'
  },
  globalNav: { // 首页导航
    list: baseUrl + '/globalNav/list',
    addOne: baseUrl + '/globalNav/addOne',
    updateOne: baseUrl + '/globalNav/updateOne',
    deleteOne: baseUrl + '/globalNav/deleteOne'
  },
  globalBanner: { // 首页背景图
    list: baseUrl + '/globalBanner/list',
    addOne: baseUrl + '/globalBanner/addOne',
    updateOne: baseUrl + '/globalBanner/updateOne',
    deleteOne: baseUrl + '/globalBanner/deleteOne'
  },
  imgUpload: baseUrl + '/upload/file'
}
