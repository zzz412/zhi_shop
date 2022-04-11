import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 初始化CSS
import 'normalize.css'
// 重置CSS
import './styles/reset.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
