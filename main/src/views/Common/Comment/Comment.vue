<template>
  <div class="comment-container"></div>
</template>

<script>
  export default {
    props: {
      commentList: {
        type: Array,
        default: []
      },
      commentPage: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
</style>
