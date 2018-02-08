<template>
  <section id="mainHeader" class="header-wrapper">
    <!--移动端导航-->
    <div class="mobile-wrapper"></div>
    <!--pc端导航-->
    <div class="pc-wrapper">
      <div class="pc-nav-container">
        <div class="pc-nav-list"
             :class="item.id === activeId ? 'pc-active' : ''"
             v-for="(item, index) in navList"
             :style="{ width: `${(100 / navList.length).toFixed(2)}%` }">
          <a :href="item.href">
            <div class="pc-nav-list-info">{{ item.name }}</div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { indexService } from '../../../utils/service'

  export default {
    props: {
      activeId: {
        type: [Number, String]
      }
    },
    data () {
      return {
        navList: []
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        indexService.navList({ cb: data => this.navList = data })
      }
    }
  }
</script>

<style lang="css">
  /*移动*/
  @media screen and (min-width: 320px) and (max-width: 720px) {
    .mobile-wrapper {
      display: block;
    }
    .pc-wrapper{
      display: none;
    }
  }
  /* pc */
  @media screen and (min-width: 721px) {
    .pc-wrapper{
      display: block;
    }
    .mobile-wrapper{
      display: none;
    }
  }

  /* pc css */
  .pc-wrapper{
    width: 100%;
  }
  .pc-nav-container{
    min-width: 720px;
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .pc-nav-list-info{
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
