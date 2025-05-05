import request from '@/utils/request'
// 获取首页数据
export const getHomeData = () => {
  // 获取首页数据
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
