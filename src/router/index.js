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
      // 搜索页  /search/:kw? 【? 0 -> 1个】
      { path: '/search/:kw?', component: () => import('@/views/search'), name: 'search' }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 自己编写跳转路由方法
// 保存VueRouter的push方法
const vPush = VueRouter.prototype.push

// 重写vue路由push方法 将push方法默认携带函数
VueRouter.prototype.push = function (location, cb1, cb2) {
  if (cb1 || cb2) return vPush.call(this, location, cb1, cb2)
  return vPush.call(this, location, () => {})
}

export default router
