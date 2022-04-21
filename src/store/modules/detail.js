import { getGoodsDetail } from '@/api'

export default {
  namespaced: true,
  state: {
    // 商品详情信息
    goodsInfo: {}
  },
  mutations: {
    SET_GOODS_INFO (state, payload) {
      state.goodsInfo = payload
    }
  },
  actions: {
    async getGoodsInfo ({ commit }, skuId) {
      const data = await getGoodsDetail(skuId)
      console.log(data)
      commit('SET_GOODS_INFO', data)
    }
  }
}
