<template>
  <div class="wrapper">
    <!--头部-->
    <section class="wrapper-header">
      <header-common @handleArrow="handleArrow"></header-common>
    </section>

    <section class="wrapper-main">
      <!--左侧菜单-->
      <section class="wrapper-slider">
        <slider-common :isCollapse="isCollapse"></slider-common>
      </section>
      <!--内容-->
      <section class="wrapper-container">
        <transition>
          <router-view class="wrapper-container-info"></router-view>
        </transition>
      </section>
    </section>
  </div>
</template>

<script>
  import { HeaderCommon, SliderCommon } from './Common'

  export default {
    components: {
      HeaderCommon,
      SliderCommon
    },
    data () {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleArrow () {
        this.isCollapse ? this.isCollapse = false : this.isCollapse = true
      }
    }
  }
</script>

<style lang="css" scoped>
  .wrapper{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .wrapper-header{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #a1a1a1;
  }

  .wrapper-main{
    background: #ffffff;
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .wrapper-container{
    flex: 1;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
