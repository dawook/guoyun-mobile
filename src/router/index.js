import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: resolve => require(['@/pages/home'], resolve)
	}, {
		path: '/pvp',
		name: 'pvp',
		component: resolve => require(['@/pages/project/pvp.vue'], resolve)
	}, {
		path: '/ppp',
		name: 'ppp',
		component: resolve => require(['@/pages/project/ppp.vue'], resolve)
	}, {
		path: '/school',
		name: 'school',
		component: resolve => require(['@/pages/project/school.vue'], resolve)
	}, {
		path: '/film',
		name: 'film',
		component: resolve => require(['@/pages/project/film.vue'], resolve)
	}, {
		path: '/house',
		name: 'house',
		component: resolve => require(['@/pages/project/house.vue'], resolve)
	}]
})