<template>
  <section class="wrapper">
    <div class="wrapper-container">
      <!--头部-->
      <top-nav :activeId="4" class="wrapper-header" :isShadow="false"></top-nav>
      <!--身体-->
      <section class="wrapper-body">
        <div class="wrapper-body-top">
          <img src="../../assets/img/ico.jpeg" class="name-img" />
          <div class="name">一位致力于成为全栈的前端开发工程师</div>
        </div>
        <div class="wrapper-body-center">
          <h3>个人信息</h3>
          <div class="wrapper-body-center-item font-over">姓名:邹晨</div>
          <div class="wrapper-body-center-item font-over">爱好:动漫、游戏、电子产品</div>
          <div class="wrapper-body-center-item font-over">厌恶:做重复的事情</div>
        </div>
      </section>
    </div>
    <section class="canvas">
      <canvas width="100%" height="100%" class="snow"></canvas>
    </section>
  </section>
</template>

<script>
  import { TopNav } from '../Common'

  export default {
    components: {
      TopNav
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.setBg('#ffffff')
      },
      setBg (color) {
        $("canvas.snow").let_it_snow({
          windPower: 0,
          speed: 0,
          color: color,
          size: 10,
          opacity: 0.00000001,
          count: 25,
          interaction: true
        })
      }
    }
  }
</script>

<style>
  @import "../../assets/css/pages/about/index.less";
</style>
