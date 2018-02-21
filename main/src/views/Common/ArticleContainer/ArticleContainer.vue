<template>
  <div class="article-container">
    <div class="article-info">
      <h1 class="article-title font-over">{{ insideArticle.articleTitle }}</h1>
      <div class="article-label">
        <div v-if="insideArticle.articleAuthor" class="article-label-item font-over">作者：{{ insideArticle.articleAuthor }}</div>
        <div v-if="insideArticle.createTime" class="article-label-item font-over">日期：{{ insideArticle.createTime }}</div>
      </div>
      <article id="articleTxt" class="article-txt" v-html="insideArticle.articleContent" v-if="insideArticle.articleContent"></article>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      insideArticle: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="css">
  /* 移动 */
  @media screen and (min-width: 320px) and (max-width: 720px){
    .article-container{
      padding: 10px;
    }
    .article-info{
      width: 100%;
    }
    .article-title{
      font-size: 30px;
    }
    .article-label{
      font-size: 16px;
    }
  }

  /* pc */
  @media screen and (min-width: 721px) {
    .article-container{
      padding: 20px;
    }
    .article-info{
      min-width: 720px;
      max-width: 1000px;
    }
    .article-title{
      font-size: 32px;
    }
    .article-label{
      font-size: 18px;
    }
  }

  .article-info{
    margin: 0 auto;
  }
  .article-title{
    text-align: left;
    border-bottom: 1px solid #a1a1a1;
    padding-bottom: 16px;
    font-weight: 300;
  }
  .article-label{
    padding: 20px 0;
    color: #999;
  }
  .article-label-item{
    padding: 10px 0;
  }
  .article-txt{
    width: 100%;
    font-family: 'Trebuchet MS', Arial, 'Lucida Grande', Verdana, Lucida, Helvetica, sans-serif;
  }
  /* 图 */
  #articleTxt img{
    max-width: 100%;
  }
  /* 代码 */
  #articleTxt code{
    font-family: "PingFangSC-Regular", "Helvetica Neue", Helvetica, Arial, "微软雅黑", sans-serif;
    display: inline-block;
    background: #b5f9e2;
    padding: 0.3rem 0.6rem;
    font-weight: 200;
    border-radius: 0.3rem;
  }
</style>
