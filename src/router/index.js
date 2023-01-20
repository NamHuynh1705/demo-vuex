import Vue from 'vue'
import VueRouter from 'vue-router'
import TableList from '../views/TableList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TableList',
    component: TableList
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
