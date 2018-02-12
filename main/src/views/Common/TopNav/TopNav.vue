<template>
  <section id="mainHeader" class="header-wrapper">
    <!--移动端导航-->
    <div class="mobile-wrapper">
      <div class="mobile-nav-container">
        <div class="mobile-home">
          <div class="mobile-nav-info"><a :href="homeItem.href"><span class="mobile-nav-name">{{ homeItem.enName }}</span></a></div>
        </div>
        <div class="mobile-item">
          <button
            class="mobile-nav-toggle"
            @click="navListVisible ? navListVisible = false : navListVisible = true">
            <span v-for="item in 3" class="icon icon-bar"></span>
          </button>
        </div>
      </div>
      <collapse-transition>
        <div class="mobile-item-nav-list" v-show="navListVisible">
          <div class="mobile-nav-info"
               :class="item.id === activeId ? 'mobile-active' : ''"
               v-for="(item, index) in navList" :key="index"
               v-if="item.id === 1 ? false : true">
            <a :href="item.href"><span class="mobile-nav-name">{{ item.enName }}</span></a>
          </div>
        </div>
      </collapse-transition>
    </div>
    <!--pc端导航-->
    <div class="pc-wrapper">
      <div class="pc-nav-container">
        <div class="pc-home">
          <a :href="homeItem.href"><div class="pc-nav-list-info"><span class="pc-nav-name">{{ homeItem.enName }}</span></div></a>
        </div>
        <div class="pc-item">
          <div class="pc-nav-list"
               :class="item.id === activeId ? 'pc-active' : ''"
               v-for="(item, index) in navList" v-if="item.id === 1 ? false : true">
            <a :href="item.href">
              <div class="pc-nav-list-info">
                <span class="pc-nav-name">{{ item.enName }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { indexService } from '../../../utils/service'
  import { CollapseTransition } from '../../../components'

  export default {
    components: {
      CollapseTransition
    },
    props: {
      activeId: {
        type: [Number, String]
      }
    },
    data () {
      return {
        navList: [],
        homeItem: {},
        navListVisible: false
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        indexService.navList({
          cb: data => {
            this.navList = data
            this.homeItem = (data.filter(item => item.id === 1))[0]
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  @import "../../../assets/css/pages/pc-nav.css";
  @import "../../../assets/css/pages/mobile-nav.css";
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
</style>
