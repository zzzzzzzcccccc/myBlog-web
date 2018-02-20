<template>
  <div class="wrapper">
    <section class="wrapper-container">
      <!--头部-->
      <article-top-nav :getListType="true" :activeId="httpParams.articleTypeId" ref="nav"></article-top-nav>
      <div class="wrapper-container-body" v-if="screen">
        <section class="article-type-info" v-if="allList.length === 0 ? false : true">
          <ul class="article-list" v-if="insideArticles.length === 0 ? false : true">
            <li v-for="(item, index) in insideArticles" :key="index" @click="link('inside', item)">
              <div class="article-list-item">
                <span class="article-list-item-label font-over">{{ item.articleTitle }}</span>
                <span class="article-list-item-label article-date font-over">{{ item.createTime.split(' ')[0] }}</span>
              </div>
            </li>
          </ul>
          <ul class="article-list" v-if="outsideArticles.length === 0 ? false : true">
            <li v-for="(item, index) in outsideArticles" :key="index" @click="link('outside', item)">
              <div class="article-list-item">
                <span class="article-list-item-label article-title font-over">{{ item.articleTitle }}</span>
                <span class="article-list-item-label article-date font-over">{{ item.createTime.split(' ')[0] }}</span>
              </div>
            </li>
          </ul>
        </section>
        <section class="article-type-info null" v-if="allList.length === 0 ? true : false">
          <div class="null-tips">
            <span>编辑作者跑路了暂无文章~</span>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import { ArticleTopNav } from '../Common'
  import { getParams, linkPath } from '../../utils/public'
  import { indexService, articleService, shareService } from '../../utils/service';

  export default {
    components: {
      ArticleTopNav
    },
    computed: {
      httpParams () { return getParams() }
    },
    data () {
      return {
        screen: false,
        allList: [],
        insideArticles: [],
        outsideArticles: []
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.$refs.nav.onReady()
        this.getList()
      },
      getList () {
        indexService.allArticleList({
          articleTypeId: this.httpParams.articleTypeId,
          cb: ({ insideArticles, outsideArticles }) => {
            this.allList = [...insideArticles, ...outsideArticles]
            this.insideArticles = insideArticles
            this.outsideArticles = outsideArticles
            this.screen = true
          }
        })
      },
      link (type, item) {
        if (type === 'inside') {
          articleService.updateVisitCount({
            id: item.id,
            cb: () => {
              linkPath(`/insideArticleInfo.html?id=${item.id}`)
            }
          })
        } else if (type === 'outside') {
          shareService.updateVisitCount({
            id: item.id,
            cb: () => location.href = item.articleHref
          })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/pages/articleType/index.less";
</style>
