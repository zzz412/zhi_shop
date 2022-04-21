// 路由表配置
// 导入布局组件
import Layout from '@/layout'

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
      { path: '/search/:keyword?', component: () => import('@/views/search'), name: 'search' },
      // 商品详情页  【通过设置props:true 将路由参数解析到组件中的props对象中】
      { path: '/detail/:skuId', component: () => import('@/views/detail'), name: 'detail', props: true }
    ]
  }
]

export default routes
