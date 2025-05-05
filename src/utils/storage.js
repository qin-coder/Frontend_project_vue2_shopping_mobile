// 导出本地存储的相关操作函数 利用本地存储 进行vuex持久化处理
// 1. 存储数据
const INFO_KEY = 'hm-shopping-info' // 本地存储中的数据
const HISTORY_KEY = 'hm-shopping-history'
// 2. 获取个人信息
export const getInfo = () => {
  const defaultObj = { // 默认值     // 本地存储中的数据
    token: '',
    userId: {}
  }
  const result = localStorage.getItem(INFO_KEY) // 获取本地存储中
  return result ? JSON.parse(result) : defaultObj // 如果本地存储中有数据，返回解析后的数据，否则返回默认值
}
// 3. 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 4. 删除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 5. 存储搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : [] // 获取本地存储中
}
// 6.设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
