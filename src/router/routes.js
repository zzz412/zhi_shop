// 路由表配置
// 导入布局组件
import Layout from '@/layout'
import LoginLayout from '@/layout/LoginLayout'

const routes = [
  // 布局1
  {
    path: '/',
    component: Layout,
    // 路由重定向到主页
    redirect: '/home',
    children: [
      // 主页
      { path: '/home', component: () => import('@/views/home') },
      // 搜索页  /search/:kw? 【? 0 -> 1个】
      { path: '/search/:keyword?', component: () => import('@/views/search'), name: 'search' },
      // 商品详情页  【通过设置props:true 将路由参数解析到组件中的props对象中】
      { path: '/detail/:skuId', component: () => import('@/views/detail'), name: 'detail', props: true },
      // 购物车页
      { path: '/cart', component: () => import('@/views/cart') },
      // 添加购物车成功页
      { path: '/addCart', component: () => import('@/views/cart/add-cart-ok') },
      // 订单确认页  meta额外信息
      { path: '/trade', component: () => import('@/views/trade'), meta: { isRole: true } },
      // 订单支付页
      { path: '/pay', component: () => import('@/views/pay'), meta: { isRole: true } },
      // 订单支付成功页
      { path: '/payok', component: () => import('@/views/pay/pay-ok'), meta: { isRole: true } },
      // 我的订单
      { path: '/myOrder', component: () => import('@/views/order'), meta: { isRole: true } }
    ]
  },
  // 布局2
  {
    path: '/login',
    component: LoginLayout,
    children: [
      // 登录页
      { path: '', component: () => import('@/views/login') },
      // 注册页
      { path: '/register', component: () => import('@/views/register') }
    ]
  }
]

export default routes
