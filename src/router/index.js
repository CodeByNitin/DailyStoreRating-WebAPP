import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import StateList from '@/components/StateList'
import StoreList from '@/components/StoreList'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/state',
      name: 'StateList',
      component: StateList
    },
    {
      path: '/store',
      name: 'StoreList',
      component: StoreList
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.getItem('Token')) {
    return next('/state')
  }
  if ((to.name !== 'Login' && from.name !== 'Login') && !localStorage.getItem('Token')) {
    return next('/')
  }
  next()
})
export default router
