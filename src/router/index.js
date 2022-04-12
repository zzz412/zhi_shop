import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入布局组件
import Layout from '@/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    // 路由重定向到主页
    redirect: '/home',
    children: [
      // 主页
      { path: '/home', component: () => import('@/views/home') },
      // 搜索页
      { path: '/search', component: () => import('@/views/search') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
