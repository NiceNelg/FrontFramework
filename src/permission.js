import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, getSid, getUserKey } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(permissionList, to) {
  // 没有设置权限的路由都无需检验权限
  if (!to.meta || !to.meta.authority || !to.meta.authority.modules) {
    return true
  }
  // 没有此模块权限的路由直接拒绝
  if (!(to.meta.authority.modules in permissionList)) {
    return false
  }
  let result = false
  permissionList[to.meta.authority.modules].opt.forEach(pItem => {
    if (pItem.operate == to.authority.opt) {
      result = true
    }
  })
  return result
}

const whiteList = ['/']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // 判断是否有权限进入路由
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 页面被刷新，重新获取权限
      if (store.getters.modulesList.length <= 0) {
        store.dispatch('UpdatePermissionsOperation', { sid: getSid(), userKey: getUserKey() }).then(() => {
          // 在免权限认证白名单，直接进入
          if (whiteList.indexOf(to.path) !== -1) {
            next()
          } else if (hasPermission(store.getters.permissionList, to)) {
            next()
          } else {
            next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
        })
      } else {
        // 在免权限认证白名单，直接进入
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else if (hasPermission(store.getters.permissionList, to)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    /* has no token*/
    if (to.path !== '/login') {
      next('/login') // 全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
