// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './ydui/flexible.js';

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import './directive/index.js'

import './ydui'
import '@/assets/styles/base.scss'
Vue.prototype.HOST = '/api'
Vue.prototype.$http = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})