import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home/'
import {
  notFound
} from '@/views/common/'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '*',
    component: notFound
  }]
})