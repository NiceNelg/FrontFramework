import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面公用header、面包屑组件
import Layout from '@/views/layout/Layout'

// 路由
export const routerMap = [{
  path: '/login',
  component: () => import('@/views/login/index')
}, {
  path: '/authredirect',
  component: () => import('@/views/login/authredirect')
}, {
  path: '/404',
  component: () => import('@/views/errorPage/404')
}, {
  path: '/401',
  component: () => import('@/views/errorPage/401')
}, {
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  }]
}, {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'charts'
}, {
  path: '/admin/index',
  component: Layout,
  meta: {
    authority: {
      modules: 'admin',
      opt: 'index'
    }
  }
}, {
  path: '/log/index',
  component: Layout,
  meta: {
    authority: {
      modules: 'log',
      opt: 'index'
    }
  }
}, {
  path: '/module/index',
  component: Layout,
  meta: {
    authority: {
      modules: 'module',
      opt: 'index'
    }
  }
}, {
  path: '/operate/index',
  component: Layout,
  meta: {
    authority: {
      modules: 'operate',
      opt: 'index'
    }
  }
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
