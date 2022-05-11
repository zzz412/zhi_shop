// 所有请求接口的集合
import request from '@/utils/request'

// 获取我的订单列表
export const reqMyOrder = (page, limit) => request({ url: `/api/order/auth/${page}/${limit}`, method: 'get' })

// 获取我的地址列表
export const reqAddressList = () => request({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单详情
export const reqOrder = () => request({ url: '/api/order/auth/trade', method: 'get' })

// 新增地址
export const addAddress = data => request({ url: '/api/user/userAddress/auth/save', method: 'post', data })

// 修改地址
export const updateAddress = data => request({ url: '/api/user/userAddress/auth/update', method: 'post', data })

// 删除地址
export const removeAddress = id => request({ url: '/api/user/userAddress/auth/delete/' + id, method: 'get' })

// 获取地区
export const reqRegion = () => request({ url: '/api/user/userAddress/auth/findBaseRegion', method: 'get' })

// 获取省份
export const reqProvince = id => request({ url: '/api/user/userAddress/auth/findBaseProvinceByRegionId/' + id, method: 'get' })
