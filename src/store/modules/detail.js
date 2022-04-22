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
  },
  getters: {
    // { 一级, 二级, 三级 }
    // 导航面包屑 -> [一级分类名, 二级分类名, 三级分类名]
    cateNav: state => {
      const { category1Name, category2Name, category3Name } = state.goodsInfo.categoryView || {}
      return [category1Name, category2Name, category3Name]
    },
    // 商品信息
    skuInfo: state => state.goodsInfo.skuInfo || {},
    // 商品规格列表
    spuList: state => state.goodsInfo.spuSaleAttrList || []
  }
}
