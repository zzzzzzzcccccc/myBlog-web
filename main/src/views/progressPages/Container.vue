<template>
  <section class="wrapper">
    <div class="wrapper-container">
      <!--头部-->
      <top-nav :activeId="5"></top-nav>
      <!--身体-->
      <section class="wrapper-body">
      </section>
    </div>

    <div class="wrapper-bg"></div>
  </section>
</template>

<script>
  import { TopNav } from '../Common'
  import { progressService } from '../../utils/service';

  export default {
    components: {
      TopNav
    },
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        progressService.list({
          cb: data => this.list = data
        })
      }
    }
  }
</script>

<style>
  @import "../../assets/css/pages/progress/index.less";
</style>
