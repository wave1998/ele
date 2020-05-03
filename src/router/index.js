import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from './admin'
import shop from './shop'
import goods from './goods'

Vue.use(VueRouter)

const routes = [
    ...admin,
    ...shop,
    ...goods,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
