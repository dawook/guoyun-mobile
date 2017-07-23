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
		path: '/news',
		name: 'news',
		component: resolve => require(['@/pages/news'], resolve)
	}, {
		path: '/notice/:id',
		name: 'notice',
		component: resolve => require(['@/pages/news/notice.vue'], resolve)
	}]
})