<template>
  <div class="header">
    <div class="header-arrow" @click="bindClickArrow">
      <i class="fa fa-align-justify"></i>
      <span class="title">管理平台</span>
    </div>
    <div class="header-name">
      <el-dropdown @command="handleCommand">
        <span class="username"><i class="fa fa-user-o icon-user"></i> {{ username }} <i class="el-icon-arrow-down icon-arrow"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { clearSessionLoginInfo } from '../../../utils/public'

  export default {
    computed: {
      username () { return sessionStorage.getItem('username') }
    },
    methods: {
      handleCommand (item) {
        if (item === 'loginOut') {
          clearSessionLoginInfo()
          this.$router.replace('/')
        }
      },
      bindClickArrow () {
        this.$emit('handleArrow')
      }
    }
  }
</script>

<style lang="css" scoped>
  .header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .header-arrow{
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #d8dce6;
    cursor: pointer;
  }

  .header-arrow, .username{
    color: #409eff;
    cursor: pointer;
  }
</style>
