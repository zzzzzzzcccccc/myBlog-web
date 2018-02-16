<template>
  <section class="wrapper">
    <div class="wrapper-container">
      <!--头部-->
      <top-nav :activeId="5" :isShadow="false"></top-nav>
      <!--身体-->
      <section class="wrapper-body">
        <ul class="progress-list" :style="{ height: `${listHeight * list.length}px` }">
          <li class="progress-list-item" v-for="(item, index) in list" :key="index" :style="{ height: `${listHeight}px` }">
            <div class="list-wrapper">
              <h3 class="progress-title font-over">{{ item.title }}<span class="progress-time">({{ item.createTime }})</span></h3>
              <div class="list-icon">
                <span class="progress-git" v-if="item.githubHref"><a :href="item.githubHref" target="_blank"><git-icon class="icon-item"></git-icon></a></span>
                <span class="progress-project" v-if="item.projectHref"><a :href="item.projectHref" target="_blank"><project-icon class="icon-item"></project-icon></a></span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <div class="wrapper-bg" :style="{ background: `url(${progressBg}) no-repeat top center`, backgroundSize: `100% 100%` }">
      <point-canvas lineColor="#fff" pointColor="#fff"></point-canvas>
    </div>
  </section>
</template>

<script>
  import { TopNav } from '../Common'
  import { PointCanvas, GitIcon, ProjectIcon } from '../../components'
  import { progressService } from '../../utils/service';

  export default {
    components: {
      TopNav,
      PointCanvas,
      GitIcon,
      ProjectIcon
    },
    data () {
      return {
        list: [],
        listHeight: 46,
        progressBg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518766094189&di=edecf5932ab4f3f936b9bba36d22a68d&imgtype=0&src=http%3A%2F%2Fimgstore.cdn.sogou.com%2Fapp%2Fa%2F100540002%2F718502.jpg'
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        progressService.list({ cb: data => this.list = data })
      }
    }
  }
</script>

<style>
  @import "../../assets/css/pages/progress/index.less";
</style>
