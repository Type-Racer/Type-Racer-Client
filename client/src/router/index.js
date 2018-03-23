import Vue from 'vue'
import Router from 'vue-router'
import InputName from '@/components/InputName'
import Login from '@/components/Login'
import Soal from '@/components/Soal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: InputName
    },
    {
      path: '/room',
      component: Login
    },
    {
      path: '/start/:id',
      component: Soal
    }
  ]
})
