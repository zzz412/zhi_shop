// 模拟数据主入口
import Mock from 'mockjs'
// 导入模拟数据
import banner from './banner.json'

// 请求首页轮播图
Mock.mock('/mock/banner', {
  code: 200,
  message: '成功',
  ok: true,
  data: banner
})
