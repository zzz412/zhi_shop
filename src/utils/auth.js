import { v4 } from 'uuid'

// 获取userTempId
export const getV4 = () => {
  // 1. 从本地存储中获取
  let userTempId = localStorage.getItem('ZHI_USERTEMPID')
  // 2. 判断userTempId是否存在
  if (!userTempId) {
    userTempId = v4()
    localStorage.setItem('ZHI_USERTEMPID', userTempId)
  }
  return userTempId
}
