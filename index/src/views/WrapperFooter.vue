<template>
  <section id="wrapperFooter" class="wrapper-footer">
    <div class="wrapper-footer-container">
      <div class="footer-visit" title="当前访问人数">
        <visit-count-icon></visit-count-icon>
        {{ count }}
      </div>
      <div class="footer-content"></div>
      <div class="footer-share-list">
        <a v-for="(item, index) in shareList" :key="index" :href="item.href" target="_blank" :title="item.title">
          <component class="footer-share-list-item" :is="item.component" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
  import { VisitCountIcon, GitHubIcon } from '../components'

  export default {
    name: 'wrapperFooter',
    components: { VisitCountIcon, GitHubIcon },
    props: {
      count: {
        type: [String, Number],
        default: 0
      }
    },
    data () {
      return {
        shareList: [
          { title: 'github', component: 'git-hub-icon', href: 'https://github.com/z5829984520?tab=repositories' }
        ]
      }
    }
  }
</script>

<style scoped>
  .wrapper-footer-container{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .footer-visit{
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .footer-share-list-item{
    font-size: 16px;
    color: #ffffff;
  }

  .footer-share-list-item:hover{
    color: #108ee9;
  }
</style>
