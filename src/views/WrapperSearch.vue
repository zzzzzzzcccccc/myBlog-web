<template>
  <section id="wrapperSearch" class="wrapper-search" @mouseleave="searchActive = false">
    <div class="search-container">
      <div class="search-container-info" :class="searchActive ? 'search-active' : ''" @click="searchActive = true">
        <search-icon class="icon"></search-icon>
        <input type="text" v-model="searchData" @focus="searchActive = true" class="search-input" />
      </div>
    </div>
  </section>
</template>

<script>
  import { SearchIcon } from '../components'

  export default {
    name: "wrapperSearch",
    components: {
      SearchIcon
    },
    data () {
      return {
        searchActive: false,
        searchData: ''
      }
    }
  }
</script>

<style scoped>
  .search-container{
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .search-container-info{
    width: 100px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.7);
    padding: 0 4px;
    transition: width 0.5s;
  }

  .search-active{
    width: 240px;
    border: 1px solid #108ee9;
  }

  .search-active .icon{
    color: #108ee9;
  }

  .icon{
    height: 100%;
    font-size: 18px;
  }

  .search-input{
    width: 100%;
    height: 100%;
    border: 0;
    background: transparent;
    text-indent: 4px;
  }
</style>
