<template>
  <div class="article-container"></div>
</template>

<script>
  export default {
    props: {
      articleTypeList: {
        type: Array,
        default: []
      },
      insideArticle: {
        type: Object,
        default: {}
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
      }
    }
  }
</script>

<style scoped>
</style>
