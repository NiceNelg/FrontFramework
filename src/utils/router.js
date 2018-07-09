export function getRouterByModulesKey(modulesKey, permissionsList) {
  if (permissionsList.hasOwnProperty(modulesKey) && permissionsList[modulesKey].opt && permissionsList[modulesKey].opt.length > 0 && permissionsList[modulesKey].opt[0].operate == 'index') {
    return permissionsList[modulesKey].opt[0].path ? permissionsList[modulesKey].opt[0].path : '';
  }
  return '';
}

export function getRouterByModulesAndOpt(modulesKey, optKey, permissionsList) {
  if (permissionsList.hasOwnProperty(modulesKey) && permissionsList[modulesKey].opt ) {
    permissionsList[modulesKey].opt.forEach((optItem) => {
      if( optItem.operate == optKey ) {
        return optItem.path ? optItem.path : '';
      }
    });
  }
  return '';
}
