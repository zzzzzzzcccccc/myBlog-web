<template>
  <div class="spinner-item" :style="{ borderTopColor: borderColor, borderLeftColor: borderColor, borderBottomColor: borderColor }"
       :class="[ `spinner-size-${size}` ]"></div>
</template>

<script>
  export default {
    props: {
      borderColor: {
        type: String,
        default: '#ccc'
      },
      size: {
        type: String,
        default: 'normal'
      }
    }
  }
</script>

<style lang="css" scoped>
  .spinner-item{
    animation: spinner-item-rotate 0.8s infinite linear;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  .spinner-size-normal{
    width: 30px;
    height: 30px;
  }
  .spinner-size-small{
    width: 24px;
    height: 24px;
  }
  .spinner-size-mini{
    width: 16px;
    height: 16px;
  }
  @keyframes spinner-item-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
