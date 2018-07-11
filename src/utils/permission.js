import store from '@/store';
import i18n from '@/lang';

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(modules, opt) {
  const permissionsList = store.getters && store.getters.permissionsList

  if( !permissionsList[modules] || !permissionsList[modules].opt || permissionsList[modules].opt.length <= 0 ) {
    return false;
  }
  const hasPermission = permissionsList[modules].opt.filter(optItem => {
    if( optItem.operate == opt ) {
      return optItem;
    }
  });

  if (hasPermission.length <= 0) {
    return false;
  }
  return true;
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