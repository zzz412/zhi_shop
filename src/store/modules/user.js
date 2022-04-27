// 用户模块
import { reqLogin } from '@/api'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 用户登录
    async login ({ commit }, data) {
      // 1. 发起请求进行登录
      const res = await reqLogin(data)
      // 2. 保存token到本地
      // 3. 保存token到state中
      console.log(res)
    }
  },
  getters: {}
}
