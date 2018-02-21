<template>
  <section id="wrapperSearch" class="wrapper-search">
    <div class="search-container" :class="searchActive ? 'search-active' : ''">
      <div class="search-container-info">
        <search-icon class="icon"></search-icon>
        <input type="text" @input="searchKey" v-model.trim="searchData" @focus="handleInputFocus" class="search-input" ref="searchInput" />
      </div>
      <div class="search-list-container" v-if="searchActive">
        <section class="search-list search-now" v-if="!(list.length === 0)">
          <div class="search-list-header">搜索</div>
          <div class="search-list-info font-over" v-for="(item, index) in list" :key="index" @click="handleSearchClick(item)" :title="item.articleTitle"><span class="font-over">{{ item.articleTitle }}</span></div>
        </section>
        <section class="search-list search-history" v-if="historyVisible">
          <div class="search-list-header">历史</div>
          <div class="search-list-info font-over search-list-info-pr" v-for="(item, index) in historySearchList" :key="index" :title="item.articleTitle">
            <span class="font-over" @click="handleSearchClick(item)">{{ item.articleTitle }}</span>
            <span @click="deleteOneHistorySearchList(item)" class="search-delete-icon"><close-icon></close-icon></span>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import { SearchIcon, CloseIcon } from '../components'
  import { findByArticleTitle } from '../utils/service'

  export default {
    name: "wrapperSearch",
    components: {
      SearchIcon,
      CloseIcon
    },
    data () {
      return {
        searchActive: false,
        searchData: '',
        list: [],
        historyVisible: false,
        historySearchList: []
      }
    },
    methods: {
      searchKey (e) {
        const key = this.searchData

        this.historyVisible = false

        if (key === null || key === '') {
          return false
        }
        this.doSearch(key)
      },
      handleInputFocus () { // 在输入框里
        this.searchActive = true
        this.setHistorySearchList()
        if (this.historySearchList.length !== 0) this.historyVisible = true
      },
      handleInputBlur () { // 焦点离开
        this.searchActive = false
        this.historyVisible = false
        this.list = []
        this.searchData = ''
      },
      handleSearchClick (item) {
        this.addOneHistorySearchList(item)

        if (item.articleHref) {
          location.href = item.articleHref
        } else {
          location.href = `/main/insideArticleInfo.html?id=${item.id}`
        }
      },
      setHistorySearchList() {
        this.historySearchList = localStorage.getItem('historySearchList') ? JSON.parse(localStorage.getItem('historySearchList')) : []
      },
      addOneHistorySearchList (item) {
        this.setHistorySearchList()
        if (this.historySearchList.length === 0) {
          this.historySearchList.push(item)
          localStorage.setItem('historySearchList', JSON.stringify(this.historySearchList))
        } else {
          const findArr = this.historySearchList.filter(findItem => item.articleTitle === findItem.articleTitle)
          if (findArr.length === 0) {
            this.historySearchList.push(item)
            localStorage.setItem('historySearchList', JSON.stringify(this.historySearchList))
          }
        }
      },
      deleteOneHistorySearchList (item) {
        this.setHistorySearchList()
        this.historySearchList.map((keyItem, index) => {
          if (item.articleTitle === keyItem.articleTitle) {
            this.historySearchList.splice(index, 1)
          }
        })

        if (this.historySearchList.length === 0) {
          this.historyVisible = false
          localStorage.removeItem('historySearchList')
        } else {
          localStorage.setItem('historySearchList', JSON.stringify(this.historySearchList))
        }
      },
      doSearch (key) {
        findByArticleTitle(key).then(({ code, msg, data }) => {
          this.list = [...data.insideArticles, ...data.outsideArticles]
        })
      }
    }
  }
</script>

<style scoped>
  /* 移动 */
  @media screen and (min-width: 320px) and (max-width: 720px) {
  }

  /* pc */
  @media screen and (min-width: 721px) {
  }

  .search-container{
    width: 100px;
    transition: width 0.5s;
  }

  .search-container-info{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.7);
    padding: 0 4px;
  }

  .search-active {
    width: 240px;
  }

  .search-active .search-container-info{
    border: 1px solid #108ee9;
  }

  .search-active .icon{
    color: #108ee9;
  }

  .icon{
    font-size: 18px;
  }

  .search-input{
    width: 100%;
    height: 100%;
    border: 0;
    background: transparent;
    text-indent: 4px;
  }

  .search-list-container{
  }
  .search-list-container, .search-list, .search-list-info{
    width: 100%;
  }
  .search-list{
    background: #ffffff;
    border-radius: 4px;
    margin-top: 2px;
  }

  .search-list-header{
    width: 100%;
    text-align: center;
    padding: 2px 4px;
    border-bottom: 1px solid #a1a1a1;
  }

  .search-list-info{
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 4px 6px;
    cursor: pointer;
    position: relative;
  }
  .search-list-info-pr{
    padding-right: 30px;
  }
  .search-list-info:hover{
    background: rgba(0, 0, 0, 0.15)
  }

  .search-delete-icon{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    margin-top: -10px;
    right: 6px;
  }

</style>
