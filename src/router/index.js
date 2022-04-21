import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由表
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // 滚动行为： 设置页面滚动条位置
  // behavior: 'smooth' 设置滚动动画
  scrollBehavior: (to, from, savedPosition) => {
    // 如果是回退行为 则不回到顶部
    if (savedPosition) return savedPosition
    return { x: 0, y: 0, behavior: 'smooth' }
  }
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
