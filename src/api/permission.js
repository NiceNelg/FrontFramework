import request from '@/utils/request'

export function updatePermissionsOperation(sid, userkey) {
  const data = {
    sid,
    userkey
  }
  return request({
    url: 'permission.json',
    method: 'get',
    data
  })
}

