import { reqGetCart } from '@/api'

// 购物车模块
export default {
  namespaced: true,
  state: {
    cartList: [] // 购物车列表
  },
  mutations: {
    SET_CART_LIST (state, list) {
      state.cartList = list
    }
  },
  actions: {
    // 获取购物车列表
    async getCartList ({ commit }) {
      const res = await reqGetCart()
      commit('SET_CART_LIST', (res.length && res[0].cartInfoList) || [])
    }
  },
  getters: {
  }
}
