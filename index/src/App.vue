<template>
  <div id="app">
    <section class="wrapper" id="globalWrapper">
      <!--全屏轮播-->
      <wrapper-banner :list="config.bannerList" v-if="config.bannerList"></wrapper-banner>

      <div class="wrapper-info">
        <!--搜索-->
        <wrapper-search class="wrapper-info-search" ref="searchProps"></wrapper-search>
        <section class="wrapper-info-container" @click="handleScreenClick">
          <!--导航栏-->
          <wrapper-nav :list="config.navList" v-if="config.navList"></wrapper-nav>
          <!--底部-->
          <wrapper-footer :count="config.allVisitCount"></wrapper-footer>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {
    WrapperBanner,
    WrapperNav,
    WrapperFooter,
    WrapperSearch
  } from './views'

  export default {
    components: {
      WrapperBanner,
      WrapperNav,
      WrapperFooter,
      WrapperSearch
    },
    computed: {
      ...mapState(['config'])
    },
    methods: {
      handleScreenClick () {
        this.$refs.searchProps.handleInputBlur()
      }
    }
  }
</script>

<style lang="css">
  @import "./assets/css/reset.css";

  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .wrapper-info{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }

  .wrapper-info-search{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 20;
  }

  .wrapper-info-container{
    width: 100%;
    height: 100%;
  }
</style>
