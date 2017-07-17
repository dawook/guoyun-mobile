<template>
	<ul class="nav">
		<li class="nav__item">
			<router-link to='/'>
				<i class="nav__icon dy-icon-project-film"></i>
				<p class="nav__tips">影视文化</p>
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
					icon: 'film'
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
	.nav__icon {
		font-size: .6rem;
	}
	.nav__tips {
		padding-top: 5px;
		/*font-weight: bold;*/
		color: #666;
	}
</style>