<template>
  <section class="wrapper-nav">
    <ul class="nav-container">
      <li v-for="(item, index) in getListType ? defaultList : list" :key="index">
        <a :href="item.href">
          <div class="nav-item"
               :style="(activeId * 1) === item.id ? { border: `1px solid ${item.labelColor}`, color: `${item.labelColor}` } : { backgroundColor: `${item.labelColor}` }">
            {{ item.name + item.articleCount }}
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  import { linkPath } from '../../../utils/public'
  import { articleTypeService } from '../../../utils/service'

  export default {
    props: {
      list: {
        type: [Array, Object]
      },
      activeId: {
        type: [String, Number],
        default: null
      },
      getListType: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        defaultList: []
      }
    },
    methods: {
      onReady () {
        this.getList()
      },
      getList () {
        if (this.getListType) {
          articleTypeService.allList({ cb: data => this.defaultList = data })
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  /* 移动 */
  @media screen and (min-width: 320px) and (max-width: 720px) {
    .nav-container{
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
    }
    .nav-container li {
      display: inline-block;
    }
    .nav-item{
      font-size: 14px;
      border-radius: 3px;
    }
  }

  /* pc */
  @media screen and (min-width: 721px) {
    .nav-container{
      min-width: 720px;
      max-width: 1000px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .nav-item{
      font-size: 16px;
      border-radius: 6px;
    }
  }

  .wrapper-nav{
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
  }

  .nav-container{
    margin: 0 auto;
  }

  .nav-item{
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    padding: 6px 12px;
    white-space: nowrap;
    display: inline-block;
  }
</style>
