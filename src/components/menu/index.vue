<template>
	<div :class='menuCls'>
		<router-link
			v-for='(item, index) in menuList'
			:key='index'
			:to='item.path'
			:class='menuItemCls'>
			<i :class='["icon-"+item.icon, "menu__icon"]'></i>
			<span :class='menuTipsCls' v-text='item.name'></span>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'vMenu',
		props: {
			menuList: {
				type: Array,
				default() {
					return [
						{
							name: '房产',
							path: '/house',
							icon: 'project-house'
						},
						{
							name: 'PPP',
							path: '/ppp',
							icon: 'fields'
						},
						{
							name: '商学院',
							path: '/bs',
							icon: 'project-school'
						},
						{
							name: '股权',
							path: '/stock',
							icon: 'project-stock-right'
						},
						{
							name: '影视文化',
							path: '/film',
							icon: 'project-film'
						}
					];
				}
			}
		},
		computed: {
			menuCls() {
				return `menu`
			},
			menuItemCls() {
				return `menu__item`
			},
			menuTipsCls() {
				return `menu__tips`
			}
		}
	}
</script>