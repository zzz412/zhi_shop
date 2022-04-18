import { getSearchGoods } from '@/api'

export default {
  namespaced: true,
  state: {
    searchInfo: {} // 搜索结果
  },
  mutations: {
    // 修改搜索结果
    SET_SEARCH_INFO (state, search) {
      state.searchInfo = search
    }
  },
  actions: {
    // 获取搜索结果
    async getSearchInfo ({ commit }, query) {
      const res = await getSearchGoods(query)
      // 提交到mutations中
      commit('SET_SEARCH_INFO', res)
      // attrsList【属性列表】: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      // goodsList【商品列表】: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      // pageNo【当前页码】: 1
      // pageSize【每页条数】: 10
      // total【总条数】: 240
      // totalPages【总页数】: 24
      // trademarkList【品牌列表】: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    }
  },
  getters: {
    // 商品列表
    goodsList: state => state.searchInfo.goodsList,
    // 品牌列表
    trademarkList: state => state.searchInfo.trademarkList,
    // 属性列表
    attrsList: state => state.searchInfo.attrsList
  }
}
