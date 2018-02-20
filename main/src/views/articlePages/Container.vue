<template>
  <section class="wrapper">
    <div class="wrapper-container">
      <!--头-->
      <top-nav :activeId="3"></top-nav>
      <!--内容-->
      <section class="wrapper-body">
        <div class="article-container">
          <div class="article-container-item">
            <ul class="article-list"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
              <li v-for="(item, index) in list" :key="index" @click="bindLink(item)">
                <div class="article-title"><span>{{ item.articleTitle }}</span></div>
                <div class="article-label">
                  <span class="article-list-type" :style="{ backgroundColor: `${item.articleTypeLabelColor}` }">{{ item.articleTypeName }}</span>
                  <span :title="item.articleAuthor ? item.articleAuthor : '未知作者'" class="article-label-item font-over">{{ item.articleAuthor ? item.articleAuthor : '未知作者' }}</span>
                  <span :title="item.createTime" class="article-label-item font-over">{{ item.createTime }}</span>
                  <span :title="item.visitCount" class="article-label-item font-over">{{ item.visitCount }}人阅读</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import { TopNav } from '../Common'
  import { linkPath } from '../../utils/public'
  import { articleService } from '../../utils/service'
  import { InfiniteScroll, ArrowLeftIcon, ClickCountIcon } from '../../components'

  Vue.use(InfiniteScroll)

  export default {
    components: {
      TopNav,
      ArrowLeftIcon,
      ClickCountIcon
    },
    data () {
      return {
        articleTypeList: [],
        list: [],
        page: {
          pageNum: 0,
          pageSize: 15,
          totalPage: null,
          total: null,
          limitPageNum: null
        },
        loading: false
      }
    },
    methods: {
      loadMore () {
        this.page.pageNum++
        if (this.page.total) if (this.page.total === this.list.length) return false
        this.loading = true
        articleService.list({
          searchData: { ...this.page },
          cb: ({ articleTypeList, list, page }) => {
            this.first = false
            this.articleTypeList = articleTypeList
            this.list = [...this.list, ...this.setList(list, articleTypeList)]
            this.page = page
            this.loading = false
          }
        })
      },
      setList (list, articleTypeList) {
        list.map((item) => {
          const filterObj = articleTypeList.filter(fItem => item.articleTypeId === fItem.id)[0]
          item.articleTypeName = filterObj.name
          item.articleTypeLabelColor = filterObj.labelColor
        })

        return list
      },
      bindLink ({ id }) {
        articleService.updateVisitCount({
          id: id,
          cb: () => {
            location.href = location.href.indexOf('/main') === -1 ? `/insideArticleInfo.html?id=${id}` : `/main/insideArticleInfo.html?id=${id}`
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/pages/article/index.less";
</style>
