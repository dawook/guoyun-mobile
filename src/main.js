// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 针对不同屏幕对html文字大小处理
// 兼容rem
import './ydui/flexible.js';

// 移动端点击事件300ms延迟
if ('addEventListener' in document) {
	const FastClick = require('fastclick');
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

// 引入主要文件
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