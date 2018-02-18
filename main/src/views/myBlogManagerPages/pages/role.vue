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
            <el-tooltip class="font-over" effect="dark" :content="scope.row[item.name]" placement="top-start">
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
        <el-pagination layout="prev, pager, next" :total="page.total"></el-pagination>
      </div>
    </div>
    <!--新增-->
    <section class="item-dialog">
      <el-dialog :visible="dialogVisible" title="填写角色信息" width="30%" @close="bindDialogClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="60px" label-position="right">
          <el-form-item label="角色" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
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
  import { sysRoleService } from '../../../utils/service'
  import { showConfirm, clearObj, doCopyObj } from '../../../utils/public'
  import enums from '../../../utils/enums'
  import helper from '../../../utils/helper'

  export default {
    data () {
      return {
        table: [
          {name: 'roleName', label: '角色名称'},
          {name: 'createTime', label: '创建时间', sortable: true},
          {name: 'updateTime', label: '更新时间', sortable: true}
        ],
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        sysRoles: [],
        dialogVisible: false,
        submitType: true,
        updateIndex: 0,
        ruleForm: {
          roleName: null,
        },
        rules: {
          roleName: [{ required: true, message: '请输入角色名称' }],
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
      doGetData (searchData) {
        sysRoleService.list({searchData,
          cb: ({ page, list }) => {
            this.page = page
            this.tableData = list
          }
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
      },
      async doUpdateOne () {
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/pages/myBlogManager/index.less";
</style>
