export function getRouterByModulesKey(modulesKey, permissionsList) {
  console.log(modulesKey)
  for (const key in permissionsList) {
    if (permissionsList.hasOwnProperty(key) && key == modulesKey && permissionsList[key].opt && permissionsList[key].opt.length > 0 && permissionsList[key].opt[0].operate == 'index') {
      console.log(permissionsList[key].opt[0].path)
      return permissionsList[key].opt[0].path ? permissionsList[key].opt[0].path : ''
    }
  }
  return ''
}
