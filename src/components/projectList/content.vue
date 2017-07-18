<template>
	<div class="content">
		<div class="content-item">
			<p class="profit"><span>{{item.borrow_apr}}</span><sub>%</sub></p>
			<p class="tips" v-text='profit'></p>
		</div>
		<div class="content-item">
			<template v-if='getStatus'>
				<p class="end">投资已完成</p>
			</template>
			<template v-else>
				<p class="top-tips">{{item.borrow_account_wait}}元可投</p>
				<v-progress :suffx='item.borrow_account_scale'></v-progress>
			</template>
			
			<p class="tips">{{tips}} {{item.account_wan}} 万元</p>
		</div>
	</div>
</template>

<script>
import vProgress from '@/components/progress'
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
			default: '项目总额'
		}
	},
	components: {
		vProgress
	},
	computed: {
		getStatus() {
			if (this.item.type == 2) {
				return (this.item.borrow_status_nid == "repay" || (this.item.scale >= 100 && this.item.number == 1)) || this.item.borrow_status_nid == "repay_yes";
			} else {
				return this.item.borrow_status_nid == "repay" || this.item.borrow_status_nid == "repay_yes";
			}
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
	.content-item:last-child {
		padding-right: .25rem;
		flex: 2;
	}
	.content-item:last-child .tips {
		text-align: right;
	}

	.profit {
		font-size: .6rem;
		color: #f3111a;
		font-family: "dywer";
	}
	.top-tips {
		margin-top: .25rem;
		font-size: .225rem;
		color: #3399d5;
		text-align: center;
	}
	.tips {
		position: absolute;
		bottom: 0;
		left: 0;
		right: .25rem;
		color: #999;
		font-size: .225rem;
	}
	
	.status {
		color: #f3111a;
	}
	.end {
		margin-top: .2rem;
		width: 100%;
		text-align: right;
		font-size: .4rem;
		color: #ccc;
		font-weight: normal;
	}
</style>