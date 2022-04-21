import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入mockJS 开启mock服务器
import '@/mock'

import TypeNav from '@/components/TypeNav'
import Slide from '@/components/Slide'

// 初始化CSS
import 'normalize.css'
// 重置CSS
import './styles/reset.scss'

Vue.config.productionTip = false

// 全局注册导航分类组件
Vue.component('TypeNav', TypeNav)
Vue.component('Slide', Slide)

// 全局注册事件处理中心
Vue.prototype.$bus = new Vue()

// // 设置全局路由守卫
// router.beforeEach((to, from, next) => {
//   // 设置页面滚动条置顶
//   window.scrollTo({ top: 0 })
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
