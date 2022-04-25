import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home, search, detail, cart
  }
})
