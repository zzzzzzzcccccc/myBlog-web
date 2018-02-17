<template>
  <div class="login-wrapper" :style="{ background: `url(${wrapperBg}) no-repeat top center`, backgroundSize: `100% 100%` }">
    <div class="login-container">
      <h3 class="login-title">管理平台</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" status-icon>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="form-submit">
          <el-button type="primary" @click="login('ruleForm')" :loading="loading">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { sysUserService } from '../../utils/service'
  import { sessionLoginInfo, formatSysModule } from '../../utils/public'
  import enums from '../../utils/enums'
  import helper from '../../utils/helper'

  export default {
    data () {
      return {
        wrapperBg: 'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/21/c0/17587163_1358748614515.jpg',
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        },
        loading: false
      }
    },
    methods: {
      login (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) this.doLogin()
        })
      },
      async doLogin () {
        this.loading = true
        const { code, msg, data } = await sysUserService.accountLogin(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) this.doLoginSuccess(data)
        else helper.error(msg)
      },
      doLoginSuccess ({ sysRole, sysModules }) {
        sessionLoginInfo(sysRole, sysModules, this.ruleForm.username)
        console.log(formatSysModule(sysModules))
      }
    }
  }
</script>

<style scoped>
  .login-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
  }
  .login-container{
    width: 320px;
    position: fixed;
    z-index: 20;
    left: 50%;
    top: 36%;
    margin-left: -160px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.6);
    border-radius: 4px;
  }
  .login-title{
    width: 100%;
    text-align: center;
    color: #ffffff;
    padding-bottom: 10px;
  }
  .form-submit{
    width: 100%;
    text-align: center;
  }
  .form-submit button{
    width: 100%;
  }
</style>
