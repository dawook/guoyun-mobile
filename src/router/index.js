import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: resolve => require(['@/pages/home'], resolve)
	}, {
		path: '/project/:type',
		name: 'project',
		component: resolve => require(['@/pages/project'], resolve)
	}, {
		path: '/school',
		name: 'school',
		component: resolve => require(['@/pages/project/school.vue'], resolve)
	}, {
		path: '/news',
		name: 'news',
		component: resolve => require(['@/pages/news'], resolve)
	}]
})