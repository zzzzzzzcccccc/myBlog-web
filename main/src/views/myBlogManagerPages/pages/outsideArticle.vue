<template>
  <div>
    <div class="item-header">
      <div class="item-header-path">
      </div>
      <div class="item-header-button">
        <el-button type="primary" size="small" plain round icon="fa fa-plus" @click="bindAdd"></el-button>
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
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain round icon="el-icon-edit" @click="bindUpdate(scope.$index, scope.row)" :disabled="scope.row.id === 1 ? true : false"></el-button>
            <el-button type="danger" size="small" plain round icon="el-icon-delete" @click="bindDelete(scope.$index, scope.row)" :disabled="scope.row.id === 1 ? true : false"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="item-body-page">
        <el-pagination layout="prev, pager, next, total" :total="page.total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--弹窗-->
    <section class="item-dialog">
      <el-dialog :visible="dialogVisible" title="填写文章信息" width="30%" @close="bindDialogClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="60px" label-position="right">
          <el-form-item label="标题" prop="articleTitle">
            <el-input v-model="ruleForm.articleTitle"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="articleAuthor">
            <el-input v-model="ruleForm.articleAuthor"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="articleHref">
            <el-input v-model="ruleForm.articleHref"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="articleTypeId">
            <el-select v-model="ruleForm.articleTypeId" filterable placeholder="请选择" class="w100">
              <el-option v-for="(item, index) in articleTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="item-dialog-submit">
            <el-button type="primary" @click="bindSubmit('ruleForm')" :loading="loading">提交</el-button>
          </div>
        </el-form>
      </el-dialog>
    </section>
  </div>
</template>

<script>
  import { shareService } from '../../../utils/service'
  import { clearObj, doCopyObj, showConfirm } from '../../../utils/public'
  import enums from '../../../utils/enums'
  import helper from '../../../utils/helper'

  export default {
    data () {
      return {
        table: [
          {name: 'articleTitle', label: '标题'},
          {name: 'articleAuthor', label: '作者'},
          {name: 'articleHref', label: '链接'},
          {name: 'articleTypeName', label: '类型'},
          {name: 'visitCount', label: '访问次数', sortable: true},
          {name: 'createTime', label: '创建时间', sortable: true},
          {name: 'updateTime', label: '更新时间', sortable: true}
        ],
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        articleTypeList: [],
        dialogVisible: false,
        updateIndex: 0,
        submitType: true,
        ruleForm: {
          articleTitle: null,
          articleAuthor: null,
          articleHref: null,
          articleTypeId: null
        },
        rules: {
          articleTitle: [{ required: true, message: '请输入文章标题' }],
          articleHref: [{ required: true, message: '请输入文章链接' }],
          articleTypeId: [{ required: true, message: '请选择文章类型' }]
        },
        loading: false
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady() {
        this.doGetData()
      },
      handleCurrentChange (pageNum) {
        this.page.pageNum = pageNum
        this.doGetData(this.page)
      },
      doGetData (searchData) {
        shareService.list({
          searchData,
          cb: ({ page, articleTypeList, list }) => {
            this.page = page
            this.articleTypeList = articleTypeList
            this.tableData = this.setTableData(list)
          }
        })
      },
      setTableData (list) {
        if (Array.isArray(list)) {
          list.map((item) => {
            const filterOjb = this.articleTypeList.filter(cItem => item.articleTypeId === cItem.id)[0]
            item.articleTypeName = filterOjb.name
          })
        } else {
          const filterOjb = this.articleTypeList.filter(item => list.articleTypeId === item.id)[0]
          list.articleTypeName = filterOjb.name
        }

        return list
      },
      bindAdd () {
        this.submitType = true
        this.dialogVisible = true
      },
      bindUpdate (index, row) {
        this.submitType = false
        this.updateIndex = index
        this.ruleForm = JSON.parse(JSON.stringify(row))
        this.dialogVisible = true
      },
      bindDelete (index, row) {
        showConfirm({
          cb: () => {
            shareService.deleteOne(row.id).then(({ code, msg }) => {
              if (code === enums.SUCCESS_CODE) {
                this.tableData.splice(index, 1)
                helper.success()
              } else helper.error(msg)
            })
          }
        })
      },
      bindSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) this.submitType ? this.doAddOne() : this.doUpdateOne()
        })
      },
      bindDialogClose () {
        this.$refs.ruleForm.resetFields()
        clearObj(this.ruleForm, undefined)
        this.ruleForm.visible = true
        this.dialogVisible = false
      },
      async doAddOne () {
        this.loading = true
        const { code, msg, data } = await shareService.addOne(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData.unshift(this.setTableData(data))
          this.dialogVisible = false
          helper.success()
        } else helper.error(msg)
      },
      async doUpdateOne () {
        this.loading = true
        const { code, msg, data } = await shareService.updateOne(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData[this.updateIndex] = doCopyObj(this.tableData[this.updateIndex], this.setTableData(data))
          this.dialogVisible = false
          helper.success()
        } else helper.error(msg)
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/pages/myBlogManager/index.less";
</style>
