<template>
  <aside>
    <el-menu class="wrapper-slider" :default-active="onRoutes" unique-opened router :collapse="isCollapse">
      <el-menu-item index="readme">
        <i class="el-icon-warning"></i><span>公告</span>
      </el-menu-item>
      <el-submenu v-for="(item, index) in sysModules" :key="index" :index="`parent${index}`">
        <template slot="title">
          <i :class="item.moduleIcon"></i><span>{{ item.moduleName }}</span>
        </template>
        <el-menu-item v-for="(cItem, cIndex) in item.modules" :key="cIndex" :index="cItem.modulePath">
          <i :class="cItem.moduleIcon"></i><span>{{ cItem.moduleName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script>
  import { formatSysModule } from '../../../utils/public'

  export default {
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      sysModules () { return formatSysModule(JSON.parse(sessionStorage.getItem('sysModules'))) },
      onRoutes () { return this.$route.path.replace('/', '') }
    }
  }
</script>

<style scoped>
  .wrapper-slider{
    border: 0;
  }
  .wrapper-slider:not(.el-menu--collapse){
    width: 200px;
    min-height: 400px;
  }
</style>
