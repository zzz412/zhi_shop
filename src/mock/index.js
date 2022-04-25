// 模拟数据主入口
import Mock from 'mockjs'
// 导入模拟数据
import banner from './banner.json'
import floor from './floor.json'
import cart from './cart.json'

// 请求首页轮播图
Mock.mock('/mock/banner', {
  code: 200,
  message: '成功',
  ok: true,
  data: banner
})

// 请求楼层数据
Mock.mock('/mock/floor', {
  code: 200,
  message: '成功',
  ok: true,
  data: floor
})

// 获取购物车数据
Mock.mock('/mock/api/cart/cartList', {
  code: 200,
  message: '成功',
  ok: true,
  data: cart
})
