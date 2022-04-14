// 所有请求接口的集合
import request from '@/utils/request'
import mockRequest from '@/utils/mockRequest'

// 获取 分类导航
export const getCategoryList = () => {
  // 因为request请求的结果为promise  直接return promise可供调用者使用
  return request({
    method: 'get',
    url: '/api/product/getBaseCategoryList'
  })
}

// 获取 首页轮播图
export const getBanner = (data) => {
  return mockRequest({ method: 'get', url: '/banner', data })
}
