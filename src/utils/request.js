// 封装请求库
import Axios from 'axios'

// 通过create创建axios实例
const request = Axios.create({
  // 配置公共请求地址
  baseURL: 'http://39.98.123.211',
  // 请求超时时间
  timeout: 5000
})

// 定义响应拦截器
request.interceptors.response.use(
  // 响应成功
  res => {
    // 取出响应结果
    const data = res.data
    // 判断响应码
    if (data.code !== 200) {
      alert(data.message || '响应错误')
      return Promise.reject(new Error(data.message))
    }
    return data.data
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
