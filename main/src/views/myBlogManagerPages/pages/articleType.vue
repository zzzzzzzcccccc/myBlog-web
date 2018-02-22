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
              <span class="cell-inner" v-if="item.name === 'labelColor'" style="display: inline-block;width: 100%;height: 23px;" :style="{ backgroundColor: `${scope.row[item.name]}` }"></span>
              <span class="cell-inner" v-else-if="item.name === 'href'">
                <a :href="scope.row[item.name]" target="_blank"><el-button size="mini">点击查看</el-button></a>
              </span>
              <span class="cell-inner" v-else>{{ scope.row[item.name] }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain round icon="el-icon-edit" @click="bindUpdate(scope.$index, scope.row)"></el-button>
            <el-button type="danger" size="small" plain round icon="el-icon-delete" @click="bindDelete(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="item-body-page" v-if="false">
        <el-pagination layout="prev, pager, next, total" :total="page.total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--新增-->
    <section class="item-dialog">
      <el-dialog :visible="dialogVisible" title="填写文章类型信息" width="30%" @close="bindDialogClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="60px" label-position="right">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="href">
            <el-input v-model="ruleForm.href"></el-input>
          </el-form-item>
          <el-form-item label="颜色" prop="labelColor">
            <el-color-picker v-model="ruleForm.labelColor"></el-color-picker>
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
  import { articleTypeService } from '../../../utils/service'
  import { clearObj, doCopyObj, showConfirm } from '../../../utils/public'
  import enums from '../../../utils/enums'
  import helper from '../../../utils/helper'

  export default {
    data () {
      return {
        table: [
          {name: 'name', label: '名称'},
          {name: 'href', label: '链接'},
          {name: 'labelColor', label: '颜色'},
          {name: 'articleCount', label: '文章总数', sortable: true},
          {name: 'createTime', label: '创建时间', sortable: true},
          {name: 'updateTime', label: '更新时间', sortable: true}
        ],
        tableData: [],
        dialogVisible: false,
        submitType: true,
        updateIndex: 0,
        ruleForm: {
          name: null,
          href: null,
          labelColor: null
        },
        rules: {
          name: [{ required: true, message: '请输入名称' }],
          href: [{ required: true, message: '请输入链接' }],
          labelColor: [{ required: true, message: '请选择颜色' }]
        },
        loading: false
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.doGetData()
      },
      doGetData () {
        articleTypeService.allList({
          cb: data => this.tableData = data
        })
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
            articleTypeService.deleteOne(row.id).then(({ code, msg }) => {
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
        this.dialogVisible = false
      },
      async doAddOne () {
        this.loading = true
        const { code, msg, data } = await articleTypeService.addOne(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData.unshift(data)
          this.dialogVisible = false
          helper.success()
        } else helper.error(msg)
      },
      async doUpdateOne () {
        this.loading = true
        const { code, msg, data } = await articleTypeService.updateOne(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData[this.updateIndex] = doCopyObj(this.tableData[this.updateIndex], data)
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
