/*
* 枚举
* */
const SUCCESS_CODE = 200
const NULL_CODE = 404
const ERROR_CODE = 500
const PARAMS_ERROR_CODE = 501

const NICK_NAME_CHECK = (val) => {
  return new RegExp('^[\u4E00-\u9FA5A-Za-z0-9_]+$').test(val)
}

const EMAIL_CHECK = (val) => {
  return new RegExp(`^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$`).test(val)
}

export default {
  SUCCESS_CODE,
  NULL_CODE,
  ERROR_CODE,
  PARAMS_ERROR_CODE,

  EMAIL_CHECK,
  NICK_NAME_CHECK
}
