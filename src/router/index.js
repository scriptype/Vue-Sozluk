import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/routes'
import User from '@/pages/User/routes'

Vue.use(Router)

export default new Router({
  routes: [
    Home,
    User
  ]
})
