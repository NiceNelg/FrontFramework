<template>
  <el-breadcrumb 
    class="app-breadcrumb" 
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item 
        v-for="(item)  in levelList" 
        v-if='item.modules'
        :key="item.modules" 
      >
        <span 
          v-if='!item.path' 
          class="no-redirect"
        >
          {{generateTitle(item.modules)}}
        </span>
        <router-link 
          v-else 
          :to="item.path"
        >
          {{generateTitle(item.title)}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import { getRouterByModulesAndOpt,getRouterByModulesKey } from '@/utils/router'

export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null,
      permissionsList: this.$store.state.permission.permissionsList
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      const router = this.$route.path.split('/');
      const path = getRouterByModulesKey(router[0], this.permissionsList);
      const levelList = [];
      levelList.push({
        modules: 'log',
        path: '/log/index',
        title: '日志'
      });
      this.levelList = levelList;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
