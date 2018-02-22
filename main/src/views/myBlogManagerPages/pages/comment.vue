<template>
  <div>
    <div class="item-header">
      <div class="item-header-path">
        <el-row>
          <el-col :span="4"><el-input class="w100" placeholder="昵称" v-model="searchData.commentName"></el-input></el-col>
          <el-col :span="4"><el-input class="w100" placeholder="邮箱" v-model="searchData.commentEmail"></el-input></el-col>
          <el-col :span="8"><el-input class="w100" placeholder="内容" v-model="searchData.commentContent"></el-input></el-col>
          <el-col :span="1"><el-button icon="el-icon-search" size="mini" type="primary" round plain @click="onReady(searchData)"></el-button></el-col>
          <el-col :span="1"><el-button icon="el-icon-delete" size="mini" type="danger" round plain @click="searchDataClear"></el-button></el-col>
        </el-row>
      </div>
      <div class="item-header-button">
      </div>
    </div>
    <div class="item-body">
      <el-table :data="tableData" class="item-body-table">
        <el-table-column v-for="(item, index) in table"
                         :key="index"
                         :label="item.label"
                         :sortable="item.sortable ? true : false"
                         :prop="item.name">
          <template slot-scope="scope">
            <el-tooltip class="font-over" effect="dark" :content="'' + scope.row[item.name]" placement="top-start">
              <span class="cell-inner">{{ scope.row[item.name] }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button type="danger" size="small" plain round icon="el-icon-delete" @click="bindDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="item-body-page">
        <el-pagination layout="prev, pager, next, total" :total="page.total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { commentService } from '../../../utils/service'
  import { clearObj, showConfirm } from '../../../utils/public'
  import enums from '../../../utils/enums'
  import helper from '../../../utils/helper'

  export default {
    data () {
      return {
        table: [
          {name: 'commentName', label: '昵称'},
          {name: 'commentEmail', label: '邮箱'},
          {name: 'commentContent', label: '内容'},
          {name: 'createTime', label: '创建时间', sortable: true}
        ],
        tableData: [],
        searchData: {
          commentName: null,
          commentEmail: null,
          commentContent: null
        },
        page: {
          pageNum: 1,
          pageSiz: 10,
          total: 0
        }
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady (searchData) {
        this.doGetData(searchData)
      },
      handleCurrentChange (pageNum) {
        this.page.pageNum = pageNum
        this.doGetData({ ...this.page, ...this.searchData })
      },
      doGetData (searchData={}) {
        commentService.list({searchData,
          cb: ({ list, page }) => {
            this.tableData = list
            this.page = page
          }
        })
      },
      searchDataClear () {
        clearObj(this.searchData, null)
      },
      bindDelete (index, row) {
        showConfirm({
          cb: () => {
            commentService.deleteOne(row.id).then(({ code, msg }) => {
              if (code === enums.SUCCESS_CODE) {
                this.tableData.splice(index, 1)
                helper.success()
              } else helper.error(msg)
            })
          }
        })
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/pages/myBlogManager/index.less";
</style>
