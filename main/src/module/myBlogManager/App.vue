<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { formatRouter, clearSessionLoginInfo } from '../../utils/public'

  export default {
    name: 'app',
    computed: {
      sysModules () { return JSON.parse(sessionStorage.getItem('sysModules')) }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.checkLogin()
      },
      checkLogin () {
        if (this.sysModules) {
          this.$router.addRoutes(formatRouter(this.sysModules))
        } else {
          clearSessionLoginInfo()
          this.$router.replace('/')
        }
      }
    }
  }
</script>
