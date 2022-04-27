// permission 验证用户是否登录
import router from '@/router'

// 路由前置守卫
// A - B
// to   进入的路由对象
// from 离开的路由对象
// next 控制跳转
router.beforeEach((to, from, next) => {
  // token  ->  后端返回【登录后】给前端的用户凭证 【用于给后端判断当前是哪个用户】
  // 前端在获取token后  后续请求需要将token携带【headers】传给后端
  next()
})
