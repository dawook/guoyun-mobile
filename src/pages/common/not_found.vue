<template>
	<div class="not-found">
		<img class='bgImg' :src="bgUrl">
		<div class="main scale-1px top">
			<yd-button type="danger" @click.native='goHome'>
				<yd-icon name="home-outline" size='.28rem'></yd-icon>
				返回首页
			</yd-button>
			<yd-button type="hollow" @click.native='refresh'>
				<yd-icon name="refresh" size='.28rem'></yd-icon>
				刷新一下
			</yd-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'notFoundPage',
	data() {
		return {
			bgUrl: require('@/assets/images/not-found.svg')
		}
	},
	methods: {
		goHome() {
			this.$router.replace({path: '/'});
		},
		refresh() {
			this.$router.back();
		}
	}
}
</script>

<style scoped>
	.not-found {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 100;
		background-color: #f8f8f8;
	}
	.tips {
		position: relative;
		top: .8.5rem;
		font-size: .35rem;
		text-align: center;
		color: #333;
	}
	.bgImg {
		margin: .8rem auto 0;
	}
	.main {
		position: relative;
		top: -.5rem;
		padding-top: .25rem;
		margin: 0 auto;
		width: 80%;
		text-align: center;
	}
</style>