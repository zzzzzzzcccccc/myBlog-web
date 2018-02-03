<template>
  <div id="app">
    <div class="wrapper">
      <wrapper-header></wrapper-header>
    </div>

    {{ navList }}

  </div>
</template>

<script>
  import { WrapperHeader } from './views'
  import { mapState } from 'vuex'

  export default {
    components: {
      WrapperHeader
    },
    computed: {
      ...mapState(['navList', 'commentList'])
    },
    created () {
      console.log(this.navList)
    }
  }
</script>

<style lang="css">
  @import "./assets/css/reset.css";
</style>
