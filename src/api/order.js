// 所有请求接口的集合
import request from '@/utils/request'

// 获取我的订单列表
export const reqMyOrder = (page, limit) => request({ url: `/api/order/auth/${page}/${limit}`, method: 'get' })
