import Vue from 'vue'
import Router from 'vue-router'
import Companies from './views/Companies.vue'
import SpecificCompany from './views/SpecificCompany.vue'
import NewCompany from './views/NewCompany.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'companies',
      component: Companies
    },
    {
      path: '/company/:id',
      name: 'SpecificCompany',
      component: SpecificCompany
  },
  {
    path:'/newCompany',
    name:'NewCompany',
    component:NewCompany
  }
  ]
})
