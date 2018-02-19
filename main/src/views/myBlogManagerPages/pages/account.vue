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
            <el-tooltip class="font-over" effect="dark" :content="item.name === 'visible' ? (scope.row[item.name] ? '可用' : '禁用') : scope.row[item.name]" placement="top-start">
              <span class="cell-inner" v-if="item.name === 'visible'">{{ scope.row[item.name] ? '可用' : '禁用' }}</span>
              <span class="cell-inner" v-else>{{ scope.row[item.name] }}</span>
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
    <!--新增-->
    <section class="item-dialog">
      <el-dialog :visible="dialogVisible" title="填写账号信息" width="30%" @close="bindDialogClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="60px" label-position="right">
          <el-form-item label="账号" prop="username" v-if="submitType">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="ruleForm.roleId" filterable placeholder="请选择" class="w100">
              <el-option v-for="(item, index) in sysRoles" :key="index" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="visible">
            <el-radio v-model="ruleForm.visible" :label="false">禁用</el-radio>
            <el-radio v-model="ruleForm.visible" :label="true">可用</el-radio>
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
  import { sysUserService } from '../../../utils/service'
  import { showConfirm, clearObj, doCopyObj } from '../../../utils/public'
  import enums from '../../../utils/enums'
  import helper from '../../../utils/helper'

  export default {
    data () {
      return {
        table: [
          {name: 'username', label: '账号'},
          {name: 'password', label: '密码'},
          {name: 'roleName', label: '角色名称'},
          {name: 'visible', label: '状态'},
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
          username: null,
          password: null,
          roleId: null,
          visible: true
        },
        rules: {
          username: [{ required: true, message: '请输入账号' }],
          password: [{ required: true, message: '请输入密码' }],
          roleId: [{ required: true, message: '请选择角色' }],
          visible: [{ required: true, message: '请选择状态' }]
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
        this.doGetData()
      },
      doGetData (searchData) {
        sysUserService.list({searchData,
          cb: ({ sysRoles, sysUsers, page }) => {
            this.page = page
            this.sysRoles = sysRoles
            this.tableData = sysUsers.length === 0 ? [] : this.setTableData(sysUsers)
          }
        })
      },
      setTableData (sysUsers) {
        if (Array.isArray(sysUsers)) {
          sysUsers.map((item) => {
            const filterOjb = this.sysRoles.filter(cItem => item.roleId === cItem.id)[0]
            item.roleName = filterOjb.roleName
          })
        } else {
          const filterOjb = this.sysRoles.filter(item => sysUsers.roleId === item.id)[0]
          sysUsers.roleName = filterOjb.roleName
        }

        return sysUsers
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
            sysUserService.deleteOne(row.id).then(({ code, msg }) => {
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
        const { code, msg, data } = await sysUserService.addOne(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData.unshift(this.setTableData(data))
          this.dialogVisible = false
          helper.success()
        } else helper.error(msg)
      },
      async doUpdateOne () {
        this.loading = true
        const { code, msg, data } = await sysUserService.updateOne(this.ruleForm)
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
