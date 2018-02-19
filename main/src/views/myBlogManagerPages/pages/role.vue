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
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain round icon="el-icon-edit" @click="bindUpdate(scope.$index, scope.row)" :disabled="scope.row.id === 1 ? true : false"></el-button>
            <el-button type="warning" size="small" plain round icon="fa fa-superpowers" @click="bindUpdateScope(scope.$index, scope.row)" :disabled="scope.row.id === 1 ? true : false"></el-button>
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
      <el-dialog :visible="dialogVisible" title="填写角色信息" width="30%" @close="bindDialogClose(true)">
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

    <!--权限-->
    <section class="item-dialog">
      <el-dialog :visible="dialogScopeVisible" title="权限" wdith="30%" @close="bindDialogClose(false)">
        <el-tag v-if="scopeRow.roleName">{{ scopeRow.roleName }}</el-tag>
        <el-tree
          :data="sysModules"
          default-expand-all
          :props="defaultProps"
          show-checkbox
          node-key="id"
          :check-strictly="true"
          :default-checked-keys="defaultKeys"
          ref="tree" />
        <div class="item-dialog-submit">
          <el-button type="primary" @click="bindSubmitScope" :loading="loading">提交</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
  import { sysRoleService } from '../../../utils/service'
  import { showConfirm, clearObj, doCopyObj, formatSysModule } from '../../../utils/public'
  import enums from '../../../utils/enums'
  import helper from '../../../utils/helper'

  export default {
    computed: {
      sysModules () { return formatSysModule(JSON.parse(sessionStorage.getItem('sysModules'))) }
    },
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
        dialogScopeVisible: false,
        dialogScopeFirst: true,
        scopeRow: {},
        submitType: true,
        updateIndex: 0,
        ruleForm: {
          roleName: null,
        },
        rules: {
          roleName: [{ required: true, message: '请输入角色名称' }],
        },
        loading: false,
        defaultProps: {
          label: 'moduleName',
          children: 'modules'
        },
        defaultKeys: []
      }
    },
    mounted () {
      this.onReady()
    },
    methods: {
      onReady () {
        this.doGetData()
      },
      handleCurrentChange (pageNum) {
        this.page.pageNum = pageNum
        this.doGetData(this.page)
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
      bindUpdateScope (index, row) {
        this.scopeRow = row
        this.updateIndex = index
        this.dialogScopeVisible = true
        if (this.dialogScopeFirst) {
          this.dialogScopeFirst = false
          this.defaultKeys = row.authorityList ? row.authorityList.split(',') : []
        } else row.authorityList ? this.$refs.tree.setCheckedKeys(row.authorityList.split(',')) : this.$refs.tree.setCheckedKeys([])
      },
      bindDelete (index, row) {
        showConfirm({
          cb: () => {
            sysRoleService.deleteOne(row.id).then(({ code, msg }) => {
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
          if (valid) this.submitType ? this.doAddOne() : this.doUpdateByRoleName()
        })
      },
      bindSubmitScope () {
        this.doUpdateByAuthorityList()
      },
      bindDialogClose (boolean) {
        if (boolean) {
          this.$refs.ruleForm.resetFields()
          clearObj(this.ruleForm, undefined)
          this.ruleForm.visible = true
          this.dialogVisible = false
        } else {
          this.$refs.tree.setCheckedKeys([])
          this.dialogScopeVisible = false
        }
      },
      async doAddOne () {
        this.loading = true
        const { code, msg, data } = await sysRoleService.addOne(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData.unshift(data)
          this.dialogVisible = false
          helper.success()
        } else helper.error(msg)
      },
      async doUpdateByRoleName () {
        this.loading = true
        const { code, msg, data } = await sysRoleService.updateByRoleName(this.ruleForm)
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData[this.updateIndex] = doCopyObj(this.tableData[this.updateIndex], data)
          this.dialogVisible = false
          helper.success()
        } else helper.error(msg)
      },
      async doUpdateByAuthorityList () {
        this.loading = true
        const { code, msg, data } = await sysRoleService.updateByAuthorityList({ id: this.scopeRow.id, authorityList: this.$refs.tree.getCheckedKeys().join(',') })
        this.loading = false
        if (code === enums.SUCCESS_CODE) {
          this.tableData[this.updateIndex] = doCopyObj(this.tableData[this.updateIndex], data)
          this.dialogScopeVisible = false
          helper.success()
        } else helper.error(msg)
      }
    }
  }
</script>

<style>
  @import "../../../assets/css/pages/myBlogManager/index.less";
</style>
