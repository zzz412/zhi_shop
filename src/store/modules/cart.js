import { reqGetCart, reqAddCart, reqCartChecked, reqDeleteCart } from '@/api'

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
    },
    // 添加到购物车
    async addCartList ({ commit }, { skuId, skuNum }) {
      await reqAddCart(skuId, skuNum)
    },
    // 修改购物车状态
    async changeCartChecked ({ commit }, { skuId, checked }) {
      await reqCartChecked(skuId, checked)
    },
    // 删除购物车商品
    async deleteCart ({ commit }, skuId) {
      await reqDeleteCart(skuId)
    },
    // 修改购物车所有状态
    changeAllChecked ({ dispatch, state }, checked) {
      // 定义数组用于 保存 请求结果
      const promise_arr = []
      // 循环购物车 对每个商品进行修改
      state.cartList.forEach(cart => {
        // 判断商品状态与要修改的状态是否一致
        if (cart.isChecked === checked) return
        // 调用多次 修改购物车状态 action
        promise_arr.push(dispatch('changeCartChecked', { skuId: cart.skuId, checked }))
      })
      // 将请求后的 promise对象返回
      return Promise.all(promise_arr)
    },
    // 删除选中商品
    deleteChecked ({ state, dispatch }) {
      const promise_arr = []
      // 1. 循环购物车
      state.cartList.forEach(cart => {
        // 2. 判断该商品是否选中
        if (cart.isChecked === 1) {
          // 3. 调用删除 action
          promise_arr.push(dispatch('deleteCart', cart.skuId))
        }
      })
      return Promise.all(promise_arr)
    }
  },
  getters: {
  }
}
