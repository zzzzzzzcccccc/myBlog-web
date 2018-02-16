<template>
  <div class="wrapper">
    <!--文章-->
    <section class="wrapper-article">
      <article-container :articleTypeList="articleTypeList" :insideArticle="insideArticle"></article-container>
    </section>
    <!--评论-->
    <section class="wrapper-comment">
      <comment :commentList="commentList" :commentPage="commentPage"></comment>
    </section>
  </div>
</template>

<script>
  import { getParams } from '../../utils/public'
  import { articleService, commentService } from '../../utils/service'
  import { ArticleContainer, Comment } from '../Common'

  export default {
    components: {
      ArticleContainer,
      Comment
    },
    computed: {
      httpParams () { return getParams() }
    },
    data () {
      return {
        articleTypeList: [],
        insideArticle: {},
        commentList: [],
        commentPage: {
          pageNum: 1,
          pageSize: 10,
          totalPage: null,
          total: null,
          limitPageNum: null
        }
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.getArticleContent()
        this.getCommentList()
      },
      getArticleContent () { // 获取文章
        articleService.findById({
          searchData: this.httpParams,
          cb: ({ articleTypeList, insideArticle }) => {
            this.articleTypeList = articleTypeList
            this.insideArticle = insideArticle
          }
        })
      },
      getCommentList () { // 获取评论
        commentService.list({
          searchData: { articleId: this.httpParams.id, ...this.commentPage },
          cb: ({ list, page }) => {
            this.commentList = [...this.commentList, ...list]
            this.commentPage = page
          }
        })
      }
    }
  }
</script>

<style>
  @import "../../assets/css/pages/insideArticleInfo/index.less";
</style>
