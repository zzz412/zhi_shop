import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TypeNav from '@/components/TypeNav'

// 初始化CSS
import 'normalize.css'
// 重置CSS
import './styles/reset.scss'
// 导入axios
import Axios from 'axios'

Vue.config.productionTip = false

// 全局注册导航分类组件
Vue.component('TypeNav', TypeNav)
// 将Axios添加到vue实例中
Vue.prototype.$http = Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
