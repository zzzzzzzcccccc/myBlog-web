<template>
  <section id="globalBanner" class="wrapper-banner">
    <div class="wrapper-banner-info">
      <section id="banner" class="banner-container" :style="{ transform: `translateY(${bannerIndex * 100 * -1}%)` }">
        <div class="banner-container-list" v-for="(item, index) in list" :key="index">
          <img :src="item.imgUrl" />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'wrapperBanner',
    props: {
      list: {
        type: Array
      }
    },
    data () {
      return {
        bannerIndex: 0,
        timer: null,
        bannerSpeed: 1000 * 10
      }
    },
    created () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.timer = setInterval(() => {
          if (this.bannerIndex + 1 === this.list.length) this.bannerIndex = 0
          else this.bannerIndex++
        }, this.bannerSpeed)
      }
    }
  }
</script>

<style scoped>
  .wrapper-banner{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
  }

  .wrapper-banner-info, .banner-container, .banner-container-list, .banner-container-list img{
    width: 100%;
    height: 100%;
  }

  .banner-container{
    transition: transform .5s;
  }
</style>
