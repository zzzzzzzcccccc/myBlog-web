import api from './api'
import request from './request'
import enums from './enums'
import helper from './helper'

/*
* 首页数据
* */
const indexService = {
  async navList({ cb }) {
    const { code, data } = await request.apiGet(api.index.navList)
    if (code === enums.SUCCESS_CODE) cb(data)
  },
  async allArticleList({ articleTypeId, cb }) {
    const { code, data } = await request.apiGet(api.index.allArticleList, { articleTypeId })
    if (code === enums.SUCCESS_CODE) cb(data)
  }
}
/*
* 分享数据
* */
const shareService = {
  async list ({ searchData={}, cb }) {
    const { code, data } = await request.apiGet(api.share.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
  },
  async updateVisitCount ({ id, cb }) {
    const { code } = await request.apiGet(api.share.updateVisitCount, { id })
    if (code === enums.SUCCESS_CODE) cb()
  },
  addOne (params={}) {
    return request.apiPost(api.share.addOne, params)
  },
  updateOne (params={}) {
    return request.apiPost(api.share.updateOne, params)
  },
  deleteOne (id) {
    return request.apiGet(api.share.deleteOne, { id })
  }
}
/*
* 文章类型数据
* */
const articleTypeService = {
  async allList ({ cb }) {
    const { code, data } = await request.apiGet(api.articleType.allList)
    if (code === enums.SUCCESS_CODE) cb(data)
  }
}
/*
* 文章数据
* */
const articleService = {
  async list ({ searchData={}, cb }) {
    const { code, data } = await request.apiGet(api.article.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
  },
  async updateVisitCount ({ id, cb }) {
    const { code } = await request.apiGet(api.article.updateVisitCount, { id })
    if (code === enums.SUCCESS_CODE) cb()
  },
  async findById ({ searchData={}, cb }) {
    const { code, data } = await request.apiPost(api.article.findById, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
  },
  addOne (params={}) {
    return request.apiPost(api.article.addOne, params)
  },
  updateOne (params={}) {
    return request.apiPost(api.article.updateOne, params)
  },
  updateByArticleContent(params={}) {
    return request.apiPost(api.article.updateByArticleContent, params)
  },
  deleteOne (id) {
    return request.apiGet(api.article.deleteOne, { id })
  }
}
/*
* 评论数据
* */
const commentService = {
  async list ({ searchData={}, cb }) {
    const { code, data } = await request.apiGet(api.comment.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
  },
  addOne (params={}) {
    return request.apiPost(api.comment.addOne, params)
  }
}
/*
* 历程数据
* */
const progressService = {
  async list ({ searchData={}, cb }) {
    const { code, data } = await request.apiGet(api.progress.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
  }
}
/*
* 用户数据
* */
const sysUserService = {
  accountLogin (params={}) {
    return request.apiPost(api.sysUser.accountLogin, params)
  },
  async list ({ searchData={}, cb }) {
    const { code, msg, data } = await request.apiGet(api.sysUser.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
    else helper.error(msg)
  },
  addOne (params={}) {
    return request.apiPost(api.sysUser.addOne, params)
  },
  updateOne (params={}) {
    return request.apiPost(api.sysUser.updateOne, params)
  },
  deleteOne (id) {
    return request.apiGet(api.sysUser.deleteOne, { id })
  }
}
/*
* 角色数据
* */
const sysRoleService = {
  async list ({ searchData={}, cb }) {
    const { code, msg, data } = await request.apiGet(api.sysRole.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
    else helper.error(msg)
  },
  addOne (params={}) {
    return request.apiPost(api.sysRole.addOne, params)
  },
  updateByRoleName (params={}) {
    return request.apiPost(api.sysRole.updateByRoleName, params)
  },
  updateByAuthorityList (params={}) {
    return request.apiPost(api.sysRole.updateByAuthorityList, params)
  },
  deleteOne (id) {
    return request.apiGet(api.sysRole.deleteOne, { id })
  }
}

/*
* 单张图片上传
* @params file
* */
const imgUploadService = (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return request.apiFile(api.imgUpload, formData)
}

export {
  indexService,
  shareService,
  articleTypeService,
  articleService,
  commentService,
  progressService,
  sysUserService,
  sysRoleService,
  imgUploadService
}
