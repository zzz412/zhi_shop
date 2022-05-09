import Vue from 'vue'

// 导入组件 并注册组件
import TypeNav from './TypeNav'
import Slide from './Slide'
import Pagination from './Pagination'

// 全局注册导航分类组件
Vue.component('TypeNav', TypeNav)
Vue.component('Slide', Slide)
Vue.component('Pagination', Pagination)

// 全局注册事件处理中心
Vue.prototype.$bus = new Vue()
