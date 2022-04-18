// 导入API接口函数
import { getCategoryList } from '@/api'

// 主页模块
export default {
  // 设置命名空间
  namespaced: true,
  state: {
    navList: [] // 导航分类
  },
  mutations: {
    // 修改导航分类
    SET_NAV_LIST (state, payload) {
      state.navList = payload
    }
  },
  actions: {
    // 获取导航分类
    async getNavList ({ commit }) {
      const res = await getCategoryList()
      commit('SET_NAV_LIST', res)
    }
  }
}
