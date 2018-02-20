<template>
  <div class="wrapper">
    <!--顶部文章类型导航-->
    <article-top-nav :list="articleTypeList"></article-top-nav>
    <!--文章-->
    <section class="wrapper-article">
      <article-container :insideArticle="insideArticle" ref="articleProps"></article-container>
    </section>
    <!--评论-->
    <section class="wrapper-comment">
      <comment :list="commentList"
               @handleMoreComment="handleMoreComment"
               ref="commentProps"
               @handleSubmit="handleSubmit" />
    </section>
  </div>
</template>

<script>
  import { getParams } from '../../utils/public'
  import { articleService, commentService } from '../../utils/service'
  import { ArticleTopNav, ArticleContainer, Comment } from '../Common'
  import { Toast } from '../../components'
  import enums from "../../utils/enums";

  export default {
    components: {
      ArticleTopNav,
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
          pageNum: 0,
          pageSize: 10,
          total: null
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
      handleMoreComment () { // 加载更多评论
        this.getCommentList()
      },
      handleSubmit (val) { // 提交 评论
        const formData = { articleId: this.httpParams.id * 1, ...val }
        if (formData.commentContent === null || formData.commentContent.length === 0) {
          Toast('请输入你的留言')
          return false
        }
        if (formData.commentName === null || formData.commentName.length === 0) {
          Toast('请输入你的大名')
          return false
        }
        if (formData.commentEmail === null || formData.commentEmail.length === 0) {
          Toast('请输入你的邮箱')
          return false
        }
        if (!enums.NICK_NAME_CHECK(formData.commentName)) {
          Toast('昵称不合法')
          return false
        }
        if (!enums.EMAIL_CHECK(formData.commentEmail)) {
          Toast('邮箱地址不合法')
          return false
        }
        this.doAddOneComment(formData)
      },
      getArticleContent () { // 获取文章
        articleService.findById({
          searchData: this.httpParams,
          cb: ({ articleTypeList, insideArticle }) => {
            this.articleTypeList = articleTypeList
            this.insideArticle = insideArticle
            document.title = this.insideArticle.articleTitle
          }
        })
      },
      getCommentList () { // 获取评论
        this.commentPage.pageNum++
        if (this.commentPage.total) if (this.commentPage.total === this.commentList.length) return false
        commentService.list({
          searchData: { articleId: this.httpParams.id, ...this.commentPage },
          cb: ({ list, page }) => {
            this.commentList = [...this.commentList, ...list]
            this.commentPage = page
          }
        })
      },
      async doAddOneComment (formData) {
        const { code, msg, data } = await commentService.addOne(formData)
        if (code === enums.SUCCESS_CODE) {
          this.commentList.unshift(data)
          this.$refs.commentProps.clearForm()
          Toast('成功~')
        } else Toast('服务器爆炸了')
      }
    }
  }
</script>

<style>
  @import "../../assets/css/pages/insideArticleInfo/index.less";
</style>
