<template>
  <section class="wrapper-nav">
    <ul class="nav-container">
      <li v-for="(item, index) in getListType ? defaultList : list" :key="index">
        <div class="nav-item"
             :style="(activeId * 1) === item.id ? { border: `1px solid ${item.labelColor}`, color: `${item.labelColor}` } : { backgroundColor: `${item.labelColor}` }" @click="bindClick(item)">
          <span>{{ item.name }}</span><span>{{ item.articleCount }}</span>
        </div>
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
      },
      bindClick ({ id }) {
        linkPath(`/articleType.html?articleTypeId=${id}`)
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
    }
    .nav-item{
      font-size: 14px;
      padding: 3px 6px;
      border-radius: 3px;
    }
  }

  /* pc */
  @media screen and (min-width: 721px) {
    .nav-container{
      min-width: 720px;
      max-width: 1000px;
    }
    .nav-item{
      font-size: 16px;
      padding: 6px 12px;
      border-radius: 6px;
    }
  }

  .wrapper-nav{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.1);
  }

  .nav-container{
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nav-item{
    color: #fff;
    cursor: pointer;
  }
</style>
