<template>
  <section class="wrapper">

    <div class="wrapper-container">
      <top-nav :activeId="2"></top-nav>
    </div>

  </section>
</template>

<script>
  import { TopNav } from '../Common'

  export default {
    components: {
      TopNav
    }
  }
</script>

<style lang="css">
  .wrapper{
    width: 100%;
  }

  .wrapper-container{
  }
</style>
