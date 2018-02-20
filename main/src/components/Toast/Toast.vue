<template>

  <transition name="toast-fade">
    <div class="toast" v-show="visible" :class="[ `toast-${position}` ]">
      <div class="toast-content">
        <i :class="[ `toast-content-icon`, `${iconClassName}` ]" v-if="iconClassName === '' ? false : true"></i>{{ message }}
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: 'Toast',
    props: {
      message: {
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClassName: {
        default: ''
      }
    },
    data () {
      return {
        visible: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import './index.styl';
</style>
