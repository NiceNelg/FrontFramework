import store from '@/store';
import i18n from '@/lang';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

/**
 * 
 * @param {String} modules 
 * @param {String} opt 
 */
export function getViewNameByModulesAndOpt(modules, opt) {
  const permissionsList = store.getters.permissionsList;
  if( !permissionsList.hasOwnProperty(modules) || !permissionsList[modules].opt ) {
    return 'no-name';
  }
  if(!i18n.messages[i18n.locale].modules.hasOwnProperty(modules) || !i18n.messages[i18n.locale].opt.hasOwnProperty(opt)) {
    return 'no-name';
  }
  const modulesName = i18n.messages[i18n.locale].modules[modules];
  const optName = i18n.messages[i18n.locale].opt[opt];
  return modulesName + ' ' + optName;
}