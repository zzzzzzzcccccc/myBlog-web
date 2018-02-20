<template>
  <div class="comment-container">
    <ul class="comment-body" v-if="list.length === 0 ? false : true">
      <li class="comment-header"><span>评论：</span></li>
      <li v-for="(item, index) in list" :key="index" :id="`commentId-${item.id}`">
        <h3 class="comment-title">{{ item.commentName }}</h3>
        <article class="comment-txt" v-html="item.commentContent"></article>
        <section class="comment-footer">
          <span>{{ item.createTime }}</span>
          <span class="comment-copy" @click="bindCopyComment(item)">引用</span>
        </section>
      </li>
      <li class="comment-more" style="border: 0" v-if="list.length >= 10 ? true : false">
        <button @click="bindGetMore">查看更多</button>
      </li>
    </ul>
    <section class="add-comment-container">
      <div class="add-comment-header"><span>我的看法：</span></div>
      <div class="add-item">
        <div class="add-item-label">*你的留言：</div>
        <textarea class="add-txt" v-model.trim="form.commentContent"></textarea>
        <div class="add-item-footer" v-if="form.commentContent">
          <span>字数：{{ form.commentContent.length }}</span>
        </div>
      </div>
      <div class="add-item">
        <div class="add-item-label">*你的昵称：</div>
        <input type="text" v-model.trim="form.commentName" class="add-input" />
      </div>
      <div class="add-item">
        <div class="add-item-label">*你的邮箱：</div>
        <input type="text" v-model.trim="form.commentEmail" class="add-input" />
      </div>
      <div class="add-submit"><button @click="bindCommentSubmit">提交</button></div>
    </section>
  </div>
</template>

<script>
  import { clearObj } from '../../../utils/public'

  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        form: {
          commentContent: null,
          commentName: null,
          commentEmail: null
        },
        copyStr: null
      }
    },
    methods: {
      bindCopyComment (item) {
        this.copyStr = `<blockquote>\n<pre>引用<strong>${item.commentName}</strong>的发言：</pre>\n\n  ${ item.commentContent }\n</blockquote>\n\n\n`
        this.form.commentContent = this.copyStr
      },
      bindGetMore () {
        this.$emit('handleMoreComment')
      },
      bindCommentSubmit () {
        this.$emit('handleSubmit', this.form)
      },
      setCommentContent (val) {
        this.form.commentContent(val)
      },
      clearForm () {
        clearObj(this.form, null)
      }
    }
  }
</script>

<style lang="css">
  /* 移动 */
  @media screen and (min-width: 320px) and (max-width: 720px) {
    .comment-container{
      width: 100%;
      padding: 10px;
    }
    .comment-header, .add-comment-header{
      font-size: 20px;
      font-weight: 500;
    }
    .add-txt{
      width: 100%;
      height: 220px;
    }
    .add-input{
      width: 100%;
    }
    .add-submit button{
      width: 100%;
    }
    .add-item-footer{
      width: 100%;
    }
  }

  /* pc */
  @media screen and (min-width: 721px) {
    .comment-container{
      min-width: 720px;
      max-width: 1000px;
      padding: 20px;
    }
    .comment-header, .add-comment-header{
      font-size: 24px;
      font-weight: 500;
    }
    .add-txt{
      width: 80%;
      height: 200px;
    }
    .add-input{
      width: 40%;
    }
    .add-submit button{
      width: 20%;
    }
    .add-item-footer{
      width: 80%;
    }
  }

  .comment-container{
    margin: 0 auto;
  }

  .comment-header{
    border-bottom: 1px solid #a1a1a1;
  }

  .comment-body li {
    border-bottom: 1px solid #a1a1a1;
    padding: 8px;
  }

  .comment-title{
    font-weight: 500;
    padding-bottom: 10px;
  }

  .comment-txt{
    padding: 4px;
  }
  .comment-txt blockquote{
    background-color: #8cc5ff;
    padding: 1em;
    margin: 1em;
    border-radius: 0.5em;
    font-size: 1rem;
  }
  .comment-footer{
    width: 100%;
    text-align: right;
    color: #999;
  }
  .comment-copy{
    text-decoration: underline;
    color: #333;
    cursor: pointer;
  }

  .comment-more{
    width: 100%;
    text-align: center;
    padding: 8px 0;
  }
  .comment-more button{
    outline: none;
    border: 0;
    color: #2fa6db;
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
    background: transparent;
  }
  .comment-more button:active{
    color: #3a8ee6;
  }

  .add-comment-container{
    width: 100%;
  }
  .add-comment-header{
    padding-bottom: 16px;
    font-weight: 300;
    border-bottom: 1px solid #a1a1a1;
  }

  .add-item{
    width: 100%;
    padding: 5px 10px;
  }
  .add-item-label{
    padding-bottom: 8px;
    font-size: 16px;
  }
  .add-txt{
    border: 1px solid #a1a1a1;
    padding: 4px;
    border-radius: 4px;
    font-size: 16px;
    font-family: 'Trebuchet MS', Arial, 'Lucida Grande', Verdana, Lucida, Helvetica, sans-serif;
  }
  .add-input{
    border: 1px solid #a1a1a1;
    padding: 2px;
    border-radius: 4px;
    font-size: 16px;
    font-family: 'Trebuchet MS', Arial, 'Lucida Grande', Verdana, Lucida, Helvetica, sans-serif;
    height: 36px;
    line-height: 36px;
  }
  .add-item-footer{
    text-align: right;
    font-size: 14px;
    color: #ccc;
  }
  .add-submit{
    width: 100%;
    padding: 10px;
  }
  .add-submit button{
    font-size: 16px;
    background: #2fa6db;
    outline: none;
    border: 0;
    color: #fff;
    border-radius: 4px;
    padding: 6px 0;
    text-align: center;
    cursor: pointer;
  }
  .add-submit button:active{
    background: #3a8ee6;
  }
</style>
