import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateUser from './components/users/CreateUser.vue'
import ListUsers from './components/users/ListUsers.vue'
import EditUser from './components/users/EditUser.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'CreateUser',
      component: CreateUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/list-users',
      name: 'ListUsers',
      component: ListUsers,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id/edit',
      name: 'EditUser',
      component: EditUser,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = window.localStorage.getItem('token')
  console.log(currentUser)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (currentUser) {
      next()
    } else {
      router.push('/')
    }
  } else {
    next()
  }
})

export default router
