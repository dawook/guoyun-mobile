import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: resolve => require(['@/pages/home'], resolve),
		mate: {
			keepAlive: true
		}
	}, {
		path: '/login',
		name: 'login',
		component: resolve => require(['@/pages/common/login.vue'], resolve)
	}, {
		path: '/register',
		name: 'register',
		component: resolve => require(['@/pages/common/register.vue'], resolve)
	}, {
		path: '/project/:type',
		name: 'project',
		component: resolve => require(['@/pages/project'], resolve),
		mate: {
			keepAlive: true
		}
	}, {
		path: '/school',
		name: 'school',
		component: resolve => require(['@/pages/project/school.vue'], resolve),
		mate: {
			keepAlive: true
		}
	}, {
		path: '/detail/invest/:id',
		name: 'detail',
		component: resolve => require(['@/pages/detail/'], resolve)
	}, {
		path: '/news',
		name: 'news',
		component: resolve => require(['@/pages/news'], resolve),
		mate: {
			keepAlive: true
		}
	}, {
		path: '/notice/:id',
		name: 'notice',
		component: resolve => require(['@/pages/news/notice.vue'], resolve)
	}, {
		path: '/aboutus',
		name: 'aboutus',
		component: resolve => require(['@/pages/common/about_us.vue'], resolve)
	}, {
		path: '/protocol',
		name: 'protocol',
		component: resolve => require(['@/pages/common/protocol.vue'], resolve)
	}, {
		path: '/help',
		name: 'help',
		component: resolve => require(['@/pages/common/help.vue'], resolve)
	}]
})