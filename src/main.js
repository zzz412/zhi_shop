import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入mockJS 开启mock服务器
import '@/mock'

// 导入全局组件
import '@/components'

// 导入validate验证规则
import '@/utils/validation'

// 初始化CSS
import 'normalize.css'

// 重置CSS
import './styles/reset.scss'

// 路由验证JS
import './permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
