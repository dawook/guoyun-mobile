<template>
	<ul class="nav">
		<li class="nav__item"
			v-for='(item, index) in nav'
			:key='index'>
			<router-link :to="{name: item.path, params: {type: item.type}}">
				<i :class="[
					'nav__icon',
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
					path: 'project',
					type: 'film',
					title: "影视文化"
				},
				{
					icon: 'pvp',
					path: 'project',
					type: 'pvp',
					title: "光伏惠民"
				},
				{
					icon: 'ppp',
					path: 'project',
					type: 'ppp',
					title: "耕地补充"
				},
				{
					icon: 'school',
					path: 'school',
					type: 'school',
					title: "商学院"
				},
				{
					icon: 'house',
					path: 'project',
					type: 'house',
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
	.nav__item:nth-child(1) .nav__icon {
		color: #9c8ef4;
	}
	.nav__item:nth-child(2) .nav__icon {
		color: #4ccbb5;
	}
	.nav__item:nth-child(3) .nav__icon {
		color: #FECC65;
	}
	.nav__item:nth-child(4) .nav__icon {
		color: #fd7d36;
	}
	.nav__item:nth-child(5) .nav__icon {
		color: #7ECF94;
	}
	.nav__icon {
		font-size: .6rem;
	}
	.nav__tips {
		padding-top: 5px;
		font-size: .2rem;
		color: #666;
	}
</style>