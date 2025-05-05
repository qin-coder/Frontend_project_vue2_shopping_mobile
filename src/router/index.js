import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'

import Category from '@/views/layout/category'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import Cart from '@/views/layout/cart'
import store from '@/store'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const Pay = () => import('@/views/pay')
const ProDetail = () => import('@/views/prodetail')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/user', component: User },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: ProDetail }
  ]
})
// 路由守卫
// to:到哪去，from：从哪来
// 定义一个数组，专门存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看to.path是否在authUrls里出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 判断是否有token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
