<template>
  <div class="menu-wrapper">
    <template 
      v-for="item in modulesList" 
    >

      <router-link 
        v-if="getRouterByModulesKey(item.modules, permissionList)"
        :to="getRouterByModulesKey(item.modules, permissionList)"
        :key="item.modules"
      >
        <el-menu-item 
          :index="item.modules" 
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <svg-icon 
            v-if="item.icon" 
            :icon-class="item.icon"
          >
          </svg-icon>
          <span 
            v-if="item.title" 
            slot="title"
          >
            {{generateTitle(item.modules)}}
          </span>
        </el-menu-item>
      </router-link>

      <el-submenu 
        v-else
        :key="item.modules"
        :index="item.modules" 
      >
        <template 
          slot="title"
        >
          <svg-icon
            :icon-class="item.icon"
          >
          </svg-icon>
          <span 
            v-if="item.title" 
            slot="title"
          >
            {{generateTitle(item.modules)}}
          </span>
        </template>

        <template 
          v-for="child in item.children" 
          v-if="child.show"
        >

          <router-link 
            :to="getRouterByModulesKey(child.modules, permissionList)" 
            :key="child.modules"
          >
            <el-menu-item 
              :index="child.modules"
            >
              <svg-icon 
                v-if="child.icon" 
                :icon-class="child.icon"
              >
              </svg-icon>
              <span 
                v-if="child.title"
                slot="title"
              >
                {{generateTitle(child.modules)}}
              </span>
            </el-menu-item>
          </router-link>
          
          <sidebar-item 
            v-if="child.children && child.children.length>0" 
            class="nest-menu" 
            :key="child.modules + 'children'"
          >
          </sidebar-item>

        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import { getRouterByModulesKey } from '@/utils/router'

export default {
  name: 'SidebarItem',
  props: {
    modulesList: {
      type: Array
    }
  },
  data() {
    return {
      permissionList: this.$store.state.permission.permissionsList
    }
  },
  created() {
    console.log(this.permissionList)
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return item.show
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle,
    getRouterByModulesKey
  }
}
</script>

