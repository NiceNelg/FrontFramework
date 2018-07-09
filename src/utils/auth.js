import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const SidKey = 'Admin-Sid'
const UserKey = 'Admin-UserKey'
const LangKey = 'Admin-LangKey'

// token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// sid
export function getSid() {
  return Cookies.get(SidKey)
}

export function setSid(sid) {
  return Cookies.set(SidKey, sid)
}

export function removeSid() {
  return Cookies.remove(SidKey)
}

// userkey
export function getUserKey() {
  return Cookies.get(UserKey)
}

export function setUserKey(userkey) {
  return Cookies.set(UserKey, userkey)
}

export function removeUserKey() {
  return Cookies.remove(UserKey)
}

// lang
export function getLangKey() {
  return Cookies.get(LangKey)
}

export function setLangKey(langkey) {
  return Cookies.set(LangKey, langkey)
}

export function removeLangKey() {
  return Cookies.remove(LangKey)
}
