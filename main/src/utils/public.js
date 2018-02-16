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


