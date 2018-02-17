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


