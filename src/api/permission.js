import request from '@/utils/request'
import { getSid, getUserKey } from '../utils/auth'

export function updatePermissionsOperation() {
  const data = {
    sid: getSid(),
    userKey: getUserKey()
  }
  return request({
    url: 'permission.json',
    method: 'get',
    data
  })
}

