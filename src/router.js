import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
// import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
const Welcome = () =>
  import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')

const Users = () =>
  import(/* webpackChunkName: "Users_Rights_Roles" */ './components/user/Users.vue')

const Rights = () =>
  import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Rights.vue')
const Roles = () =>
  import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Roles.vue')

const Cate = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Params.vue')
const GoodsList = () =>
  import(/* webpackChunkName: "GoodsList_Add" */ './components/goods/List.vue')
const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ './components/goods/Add.vue')

const Order = () => import(/* webpackChunkName: "Order_Report" */ './components/order/Order.vue')

const Report = () => import(/* webpackChunkName: "Order_Report" */ './components/report/Report.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
