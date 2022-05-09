// 所有请求接口的集合
import request from '@/utils/request'

// 获取我的订单列表
export const reqMyOrder = (page, limit) => request({ url: `/api/order/auth/${page}/${limit}`, method: 'get' })

// 获取我的地址列表
export const reqAddressList = () => request({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取订单详情
export const reqOrder = () => request({ url: '/api/order/auth/trade', method: 'get' })
