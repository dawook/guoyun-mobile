<template>
	<div class="content">
		<div class="content-item">
			<p class="profit"><span>{{item.repay_apr}}</span><sub>%</sub></p>
			<p class="tips" v-text='profit'></p>
		</div>
		<div class="content-item">
			<p class="time"><span class="num" v-text='item.period'></span>个月 | <span class="status">可加入</span></p>
			<p class="tips">{{tips}} {{item.price}} 元</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'pctOne',
	props: {
		item: {
			type: [Array, Object]
		},
		profit: {
			type: String,
			default: "年化收益"
		},
		tips: {
			type: String,
			default: '注册班费'
		}
	}
}
</script>

<style scoped>
	.content {
		display: flex;
		width: 100%;

	}
	.content-item {
		position: relative;
		padding-bottom: 18px;
		display: inline-block;
		flex: 1;
		justify-content: space-between;
		align-items: stretch;
	}
	.profit {
		font-size: .5rem;
		color: #f3111a;
		font-family: "dywer";
	}
	.time {
		padding-top: .15rem;
		font-size: .28rem;
		color: #666;
	}
	.time .num {
		font-family: "dywer";
		font-size: .35rem;
	}
	.tips {
		position: absolute;
		bottom: 0;
		color: #999;
		font-size: .225rem;
	}
	.status {
		color: #f3111a;
	}
</style>