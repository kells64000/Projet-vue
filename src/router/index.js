import Vue from 'vue'
import Router from 'vue-router'
import Ticket from '@/components/Ticket'

Vue.use(Router)
Vue.filter('searchBy', function (objects, key) {
  return objects.map(function (object) {
    return object[key]
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ticketing',
      component: Ticket
    }
  ]
})
