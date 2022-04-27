// 操作本地用户token

// 存
export const SET_TOKEN = (token) => {
  localStorage.setItem('ZHI_USER_TOKEN', token)
}

// 取
export const GET_TOKEN = () => {
  return localStorage.getItem('ZHI_USER_TOKEN')
}

// 删
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('ZHI_USER_TOKEN')
}
