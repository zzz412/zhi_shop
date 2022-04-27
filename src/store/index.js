import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import cart from './modules/cart'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home, search, detail, cart, user
  },
  getters: {
    token: state => state.user.token,
    loginName: state => state.user.userInfo.loginName
  }
})
