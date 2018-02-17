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
  }
}
/*
* 评论数据
* */
const commentService = {
  async list ({ searchData={}, cb }) {
    const { code, data } = await request.apiGet(api.comment.list, searchData)
    if (code === enums.SUCCESS_CODE) cb(data)
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
  }
}

export {
  indexService,
  shareService,
  articleService,
  commentService,
  progressService,
  sysUserService
}
