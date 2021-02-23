import Vue from 'vue'
import VueRouter from 'vue-router'

//利用懒加载引入创建映射关系
const Home = () => import('../views/Home/Home')
const Category = () => import('../views/Category/Category')
const Shopcart = () => import('../views/Shopcart/Shopcart')
const Profile = () => import('../views/Profile/Profile')


// 安装插件
Vue.use(VueRouter)

// 抽离路由对象
// 配置对应的映射关系
const routes = [
  {
    path: '',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Category',
    component: Category
  },
  {
    path: '/Shopcart',
    component: Shopcart
  },
  {
    path: '/Profile',
    component: Profile
  },
]

// 创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router