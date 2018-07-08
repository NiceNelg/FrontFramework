import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'login.json',
    method: 'get',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getPermissionsOperation(sid, userkey) {
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

