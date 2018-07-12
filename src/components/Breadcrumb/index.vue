<template>
  <el-breadcrumb 
    class="app-breadcrumb" 
    separator=">"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item 
        v-for="(item)  in levelList" 
        v-if='item.title'
        :key="item.title" 
      >
        <span 
          v-if='!item.path' 
          class="no-redirect"
        >
          {{item.title}}
        </span>
        <router-link 
          v-else 
          :to="item.path"
        >
          {{item.title}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
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
      const levelList = [];
      if( this.$route.meta.authority.modules == 'home' ) {
        levelList.push({
          title: this.$t('modules.home'),
          path: '/'
        });
        this.levelList = levelList;
        return ;
      }
      levelList.push({
        title: this.$t('modules.home'),
        path: '/'
      });
      levelList.push({
        title: this.$t('modules.' + this.$route.meta.authority.modules),
        path: '/' + this.$route.meta.authority.modules
      });
      levelList.push({
        title: this.$t('opt.' + this.$route.meta.authority.opt),
        path: '/' + this.$route.meta.authority.modules + '/' + this.$route.meta.authority.opt
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
