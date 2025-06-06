/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading 提示
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止点击
    loadingType: 'spinner', // 加载图标的样式
    duration: 0// 展示时长(ms)，值为 0 时，toast 不会消失
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 提示错误信息
    Toast(res.message)
    // 返回一个失败的Promise
    return Promise.reject(res.message)
  } else {
    // 返回成功的数据
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出request
export default request
