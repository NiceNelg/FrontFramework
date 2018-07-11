import request from '@/utils/request'

/**
 * 获取模块树形列表
 */
export function getModuleTree() {
  return request({
    url: '/module.json',
    method: 'get'
  });
}

/**
 * 移动模块
 */
export function moveModule(id, type) {
  const data = {
    id: id,
    type: type
  };
  return request({
    url: '/module.json',
    method: 'get',
    data
  });
}

/**
 * 删除模块
 */
export function deleteModule(id) {
  return request({
    url: '/module.json',
    method: 'get'
  });
}