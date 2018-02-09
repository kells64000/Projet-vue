import Vue from 'vue'
import Router from 'vue-router'
import Ticket from '@/components/Ticket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ticketing',
      component: Ticket
    }
  ]
})
