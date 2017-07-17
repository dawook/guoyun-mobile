<template>
	<ul class="nav">
		<li class="nav__item" 
			v-for='(item, index) in nav'
			:key='index'>
			<router-link :to='item.link'>
				<i :class="[
					'nav__icon',
					'nav__icon--' + item.icon,
					'dy-icon-project-' + item.icon
				]"></i>
				<p class="nav__tips" v-text='item.title'></p>
			</router-link>
		</li>
		
	</ul>
</template>

<script>
export default {
	name: 'homeNav',
	data() {
		return {
			nav: [
				{
					icon: 'film',
					link: '/film',
					title: "影视文化"
				},
				{
					icon: 'pvp',
					link: '/pvp',
					title: "光伏惠民"
				},
				{
					icon: 'ppp',
					link: '/ppp',
					title: "耕地补充"
				},
				{
					icon: 'school',
					link: '/school',
					title: "商学院"
				},
				{
					icon: 'house',
					link: '/house',
					title: "房产"
				}
			]
		}
	}
}
</script>

<style scoped>
	.nav {
		padding: .26rem .25rem;
		display: flex;
		width: 100%;
		background-color: #fff;
	}
	.nav__item {
		display: inline-block;
		flex: 1;
		justify-content: space-between;
		text-align: center;
		align-items: stretch;
	}
	.nav__item a {
		display: block;
		width: 100%;
	}
	.nav__icon {
		font-size: .6rem;
	}
	.nav__tips {
		padding-top: 5px;
		/*font-weight: bold;*/
		color: #666;
	}
</style>