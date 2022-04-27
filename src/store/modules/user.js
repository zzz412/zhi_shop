// 用户模块
import { reqLogin, reqUserInfo } from '@/api'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/userToken'

export default {
  namespaced: true,
  state: {
    token: GET_TOKEN() || '',
    userInfo: {}
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
    },
    SET_USERINFO (state, info) {
      state.userInfo = info
    },
    RESET_STATE (state) {
      state.token = ''
      state.userInfo = {}
      REMOVE_TOKEN()
    }
  },
  actions: {
    // 用户登录
    async login ({ commit, dispatch }, data) {
      // 1. 发起请求进行登录
      const res = await reqLogin(data)
      // 2. 保存token到state中
      commit('SET_TOKEN', res.token)
      // 3. 保存token到本地（持久化）
      SET_TOKEN(res.token)
      // 4. 派发action 获取用户信息
      dispatch('getUserInfo')
    },
    // 获取用户信息
    async getUserInfo ({ commit }) {
      // 1. 发请求获取用户信息
      const res = await reqUserInfo()
      // 2. 将用户信息保存
      commit('SET_USERINFO', res)
    }
  },
  getters: {}
}
