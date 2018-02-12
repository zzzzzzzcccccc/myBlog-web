<template>
  <section class="wrapper">

    <div class="wrapper-container">
      <!--头部-->
      <top-nav :activeId="2" class="wrapper-header"></top-nav>
      <!--身体-->
      <section class="wrapper-body" id="mainBody">
        <div class="article-list">
          <ul class="article-list-item"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
            <li v-for="(item, index) in list" :key="index" class="article-list-info" @click="bindLink(item)">
              <div class="article-list-wrapper">
                <div class="article-list-label">
                  <h3 class="article-list-title font-over">{{ item.articleTitle }}</h3>
                  <div class="article-list-attr">
                    <span class="article-list-type" :style="{ backgroundColor: `${item.articleTypeLabelColor}` }">{{ item.articleTypeName }}</span>
                    <span class="article-list-label-item article-list-author font-over">{{ item.articleAuthor ? item.articleAuthor : '未知作者' }}</span>
                    <span class="article-list-label-item font-over">{{ item.createTime }}</span>
                    <span class="article-list-label-item font-over">{{ item.visitCount }}人阅读</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>

  </section>
</template>

<script>
  import Vue from 'vue'
  import { TopNav } from '../Common'
  import { shareService } from '../../utils/service'
  import { InfiniteScroll } from '../../components'

  Vue.use(InfiniteScroll)

  export default {
    components: {
      TopNav
    },
    data () {
      return {
        articleTypeList: [],
        list: [],
        first: true, // 是否第一次加载列表
        page: {
          pageNum: 0,
          pageSize: 15,
          totalPage: null,
          total: null,
          limitPageNum: null
        },
        loading: false // 是否开启无限加载
      }
    },
    methods: {
      loadMore () {
        this.setPage(5)
        this.loading = true
        shareService.list({
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
      setPage (pageSize) {
        this.page.pageNum++
        if (!this.first) {
          if (this.list.length === this.page.total) {
            return false
          } else {
            this.page.pageSize = pageSize
          }
        }
      },
      bindLink ({ id, articleHref }) {
        shareService.updateVisitCount({
          id: id,
          cb: () => {
            location.href = articleHref
          }
        })
      }
    }
  }
</script>

<style lang="css">
  @import "../../assets/css/pages/share/article.less";

  .wrapper, .wrapper-container, .wrapper-body{
    width: 100%;
  }
</style>
