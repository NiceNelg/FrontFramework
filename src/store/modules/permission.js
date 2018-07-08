import { updatePermissionsOperation } from '@/api/permission';
import { routerMap } from '@/router';

/**
 * 递归抽离模块权限，建立当前用户适合的权限映射表
 */
function extractionUserPermission(modulesMap, permissionList) {
  modulesMap.forEach((value,index,modulesMap) => {
    if( value.children && value.children.length > 0 ) {
      extractionUserPermission(value.children, permissionList)
    }
    //当此模块拥有操作时，代表有对应路由，通过路由表获取对应路径加到操作中
    if( value.opt && value.opt.length ) {
      const opts = value.opt.concat();
      routerMap.forEach((routerItem,routerIndex,routerMap) => {
        if( routerItem.meta && routerItem.meta.authority && routerItem.meta.authority.modules == value.modules ) {
          opts.forEach((optItem,optIndex,opts) => {
            if( optItem.operate == routerItem.meta.authority.opt ) {
              opts[optIndex]['path'] = routerItem.path;
            }
          });
        }
      });
      permissionList[value.modules] = {
        modules: value.modules,
        title: value.title,
        show: value.show,
        opt:opts
      };
    }
  });
}

const permission = {
  state: {
    permissionsList: {},
    modulesList: []
  },
  mutations: {
    SET_PERMISSIONSLIST(state, permissionsList) {
      state.permissionsList = permissionsList;
    },
    SET_MODULESLIST(state, modulesList) {
      state.modulesList = modulesList;
    }
  },
  actions: {
    //更新用户权限
    UpdatePermissionsOperation({ commit }, postData) {
      return new Promise((resolve, reject) => {
        updatePermissionsOperation(postData.sid, postData.userKey).then(response => {
          if (!response.data && !response.data.state) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data.data;
          const permissionList = {};
          //抽离模块权限
          extractionUserPermission(data, permissionList);
          commit('SET_PERMISSIONSLIST', permissionList);
          commit('SET_MODULESLIST', data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default permission
