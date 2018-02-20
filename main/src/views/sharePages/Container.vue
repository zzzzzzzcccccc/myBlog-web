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
                  <div class="article-list-title"><span>{{ item.articleTitle }}</span></div>
                  <div class="article-list-attr">
                    <a :href="item.articleTypeHref">
                      <span class="article-list-type" :style="{ backgroundColor: `${item.articleTypeLabelColor}` }">{{ item.articleTypeName }}</span>
                    </a>
                    <span :title="item.articleAuthor ? item.articleAuthor : '未知作者'" class="article-list-label-item article-list-author font-over">{{ item.articleAuthor ? item.articleAuthor : '未知作者' }}</span>
                    <span :title="item.createTime" class="article-list-label-item font-over">{{ item.createTime }}</span>
                    <span :title="item.visitCount" class="article-list-label-item font-over">{{ item.visitCount }}人阅读</span>
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
        page: {
          pageNum: 0,
          pageSize: 10,
          total: null
        },
        loading: false
      }
    },
    methods: {
      loadMore () {
        this.page.pageNum++
        if (this.page.total) if (this.page.total === this.list.length) return false
        this.loading = true
        shareService.list({
          searchData: { ...this.page },
          cb: ({ articleTypeList, list, page }) => {
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
          item.articleTypeHref = filterObj.href
        })

        return list
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
  @import "../../assets/css/pages/share/index.less";

  .wrapper, .wrapper-container, .wrapper-body{
    width: 100%;
  }
</style>
