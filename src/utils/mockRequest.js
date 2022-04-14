// 封装mock请求库
import Axios from 'axios'

// 通过create创建axios实例
const request = Axios.create({
  // 配置公共请求地址
  baseURL: '/mock',
  // 请求超时时间
  timeout: 5000
})

// 导入创建的axios实例
export default ({ method, url, data }) => {
  return request({
    method,
    url,
    // 如果方法为get则使用 params传值 否则使用data传值
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
