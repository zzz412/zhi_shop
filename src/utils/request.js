// 封装请求库
import Axios from 'axios'
import store from '@/store'
import router from '@/router'

import { getV4 } from '@/utils/auth'

// 通过create创建axios实例
const request = Axios.create({
  // 配置公共请求地址
  // baseURL: 'http://39.98.123.211',
  // baseURL: 'http://sph-h5.atguigu.cn/',
  baseURL: 'http://gmall-h5-api.atguigu.cn',
  // 请求超时时间
  timeout: 5000
})

// 定义请求拦截器
request.interceptors.request.use(config => {
  // 给每个请求携带 userTempId  通过uuid的v4加密 生成ID
  config.headers.userTempId = getV4()
  // 给每个请求携带 token
  if (store.getters.token) {
    config.headers.token = store.getters.token
  }
  return config
})

// 定义响应拦截器
request.interceptors.response.use(
  // 响应成功
  async res => {
    // 取出响应结果
    const data = res.data
    // 判断响应码
    if (data.code !== 200 && data.code !== 205) {
      alert(data.message || '响应错误')
      // 判断错误原因【未登录】
      if (data.code === 208) {
        // 清除token
        await store.dispatch('user/logout')
        // 跳转登录
        router.push('/login?redirect=' + router.currentRoute.path)
      }
      return Promise.reject(new Error(data.message))
    }
    return data.data || data
  },
  // 响应失败
  err => new Promise(new Error(err))
)

// 导入创建的axios实例
export default ({ method, url, data }) => {
  return request({
    method,
    url,
    // 如果方法为get则使用 params传值 否则使用data传值
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
