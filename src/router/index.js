import Vue from 'vue'
import Router from 'vue-router'

//const Home = resolve=> require(['@/components/Home'],resolve)
// const Register = resolve=> require(['@/components/admin/register'],resolve)
// const Login = resolve=> require(['@/components/admin/login'],resolve)
// const ContentItem = resolve=> require(['@/components/home/ContentItem'],resolve)
const Home = () => import('@/components/Home')
const Register = () => import('@/components/admin/register')
const Login = () => import('@/components/admin/login')
const ContentItem = () => import('@/components/home/ContentItem')
const homeHeader = () => import('@/components/home/header')
Vue.component('homeHeader',homeHeader)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/article',
      name:'contentItem',
      component:ContentItem
    }
  ]
})
