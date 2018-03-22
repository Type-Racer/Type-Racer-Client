import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Soal from '@/components/Soal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/start/:id',
      component: Soal
    }
  ]
})
