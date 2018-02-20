/*
* 获取http get请求参数
* */
export function getParams () {
  let url

  if (location.href.indexOf('?') === -1) {
    return {}
  } else {
    url = location.href
  }

  const paramsArr = url.split('?')[1].split('&')
  const paramsObj = {}

  for (let i = 0; i < paramsArr.length; i++) {
    const item = paramsArr[i].split('=')
    paramsObj[decodeURIComponent(item[0])] = decodeURIComponent(item[1])
  }

  return paramsObj
}

/*
* 缓存登录信息
* @params sysRole
* @params sysModules
* */
export function sessionLoginInfo (sysRole, sysModules, username) {
  sessionStorage.setItem('sysRole', JSON.stringify(sysRole))
  sessionStorage.setItem('sysModules', JSON.stringify(sysModules))
  sessionStorage.setItem('username', username)
}

/*
* 移除缓存
* */
export function clearSessionLoginInfo () {
  sessionStorage.removeItem('sysRole')
  sessionStorage.removeItem('sysModules')
  sessionStorage.removeItem('username')
}

/*
* 格式化登录的菜单列表
* @params modules
* */
export function formatSysModule (modules) {
  const returnModules = modules.filter(item => item.parentId === 0)

  for (let i = 0; i < returnModules.length; i++) {
    const returnModule = returnModules[i]
    returnModule.modules = []

    for (let j = 0; j < modules.length; j++) {
      const { parentId } = modules[j]

      if (parentId === returnModule.id) returnModule.modules.push(modules[j])
    }
  }

  return returnModules
}

/*
* 构造vue-router需要addRouters的数据结构
* @params modules
* */
export function formatRouter (modules) {
  const home = {
    path: '/Container',
    component: resolve => require(['../views/myBlogManagerPages/Container.vue'], resolve),
    children: [{
      path: '/readme',
      component: resolve => require(['../views/myBlogManagerPages/pages/readme.vue'], resolve)
    }]
  }

  for (let i = 0; i < modules.length; i++) {
    if (modules[i].parentId !== 0) {
      home.children.push({
        path: `/${modules[i].modulePath}`,
        component: resolve => require([`../views/myBlogManagerPages/pages/${modules[i].modulePath}.vue`], resolve)
      })
    }
  }

  return [home]
}

/*
* 打开/关闭全局loading
* */
import { Loading } from 'element-ui'
let LoadingService
export function toggleLoading (boolean=false) {
  if (boolean) {
    LoadingService = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)'
    })
  } else {
    LoadingService.close()
  }
}

/*
* 二次确认弹窗封装
* */
import { MessageBox } from 'element-ui'
export function showConfirm ({ params={
  message:'确认执行吗？',
  title:'提示',
  options:{ confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', center: true }
}, cb, cancelCb=()=> {} }) {
  MessageBox.confirm(params.message, params.title, params.options).then(() => {
    cb()
  }).catch(() => {
    cancelCb()
  })
}

/*
* 初始化对象
* @params obj
* @params val
* */
export function clearObj (obj={}, val) {
  for (const key in obj) {
    obj[key] = val
  }
}

/*
* 拷贝对象
* @params copyObj
* @params obj
* */
export function doCopyObj (copyObj, obj) {
  for (const key in obj) {
    copyObj[key] = obj[key]
  }

  return copyObj
}

/*
* 多页面之间跳转
* @params targetPath
* */
export function linkPath (targetPath) {
  const host = location.host
  location.href = location.href.indexOf('/main') === -1 ? `${host}${targetPath}` : `${host}/main${targetPath}`
}


