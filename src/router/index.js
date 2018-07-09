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
  path: '/admin',
  component: Layout,
  redirect: '/admin/index',
  meta: {
    authority: {
      modules: 'admin',
      opt: 'index'
    }
  },
  children: [{ 
    path: 'index', 
    component: () => import('@/views/example/create'),
    meta: {
      authority: {
        modules: 'admin',
        opt: 'index'
      }
    }
  },
  { 
    path: 'edit/:id(\\d+)', 
    component: () => import('@/views/example/edit'),
    meta: {
      authority: {
        modules: 'admin',
        opt: 'edit'
      }
    }
  }]
}, {
  path: '/log',
  component: Layout,
  redirect: '/log/index',
  meta: {
    authority: {
      modules: 'log',
      opt: 'index'
    }
  },
  children: [{ 
    path: 'index', 
    component: () => import('@/views/log/list'),
    meta: {
      authority: {
        modules: 'log',
        opt: 'index'
      }
    }
  },
  { 
    path: 'edit/:id(\\d+)', 
    component: () => import('@/views/example/edit'),
    meta: {
      authority: {
        modules: 'log',
        opt: 'edit'
      }
    }
  }]
}, {
  path: '/module',
  component: Layout,
  redirect: '/module/index',
  meta: {
    authority: {
      modules: 'module',
      opt: 'index'
    }
  },
  children: [{ 
    path: 'index', 
    component: () => import('@/views/log/list'),
    meta: {
      authority: {
        modules: 'module',
        opt: 'index'
      }
    }
  },
  { 
    path: 'edit/:id(\\d+)', 
    component: () => import('@/views/example/edit'),
    meta: {
      authority: {
        modules: 'module',
        opt: 'edit'
      }
    }
  }]
}, {
  path: '/operate',
  component: Layout,
  redirect: '/operate/index',
  meta: {
    authority: {
      modules: 'operate',
      opt: 'index'
    }
  },
  children: [{ 
    path: 'index', 
    component: () => import('@/views/log/list'),
    meta: {
      authority: {
        modules: 'operate',
        opt: 'index'
      }
    }
  },
  { 
    path: 'edit/:id(\\d+)', 
    component: () => import('@/views/example/edit'),
    meta: {
      authority: {
        modules: 'operate',
        opt: 'edit'
      }
    }
  }]
}, {
  path: '/dictionary',
  component: Layout,
  redirect: '/dictionary/index',
  meta: {
    authority: {
      modules: 'dictionary',
      opt: 'index'
    }
  },
  children: [{ 
    path: 'index', 
    component: () => import('@/views/log/list'),
    meta: {
      authority: {
        modules: 'dictionary',
        opt: 'index'
      }
    }
  },
  { 
    path: 'edit/:id(\\d+)', 
    component: () => import('@/views/example/edit'),
    meta: {
      authority: {
        modules: 'dictionary',
        opt: 'edit'
      }
    }
  }]
}];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
