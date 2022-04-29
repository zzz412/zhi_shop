// 用户模块
import { reqLogin, reqUserInfo, reqLogout, reqCode, reqRegister } from '@/api'
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
    },
    // 用户退出登录
    async logout ({ commit }) {
      // 1. 发起请求退出登录
      await reqLogout()
      // 2. 清理本地状态
      commit('RESET_STATE')
    },
    // 获取注册验证码
    async getCode ({ commit }, phone) {
      const res = await reqCode(phone)
      console.log(res)
    },
    // 注册用户
    async register ({ commit }, data) {
      await reqRegister(data)
    }
  },
  getters: {}
}
