<template>
	<div class="m-home m-home--fixed">
    <yd-navbar title='资金统计中心' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

		<ul class="fund-list">
			<li class="fund-list__item" v-for='(item, index) in lists' :key='index'>
				{{item.name}}:
				<span class="money">¥{{item.num}}</span>
			</li>
		</ul>

  </div>
</template>

<script>
import {getStore} from '@/utils/assist.js'

export default {
	name: 'fundStatistics',
	data() {
		return {
			user_id: '',
			token: '',
			lists: [{
				name: '处置中金额',
				num: ''
			},
			{
				name: '结算本金',
				num: ''
			},
			{
				name: '结算收益',
				num: ''
			},
			{
				name: '奖励收益',
				num: ''
			},
			{
				name: '当前预计收益',
				num: ''
			},
			{
				name: '净赚收益',
				num: ''
			},
			{
				name: '成功充值',
				num: ''
			},
			{
				name: '累计投资',
				num: ''
			},
			{
				name: '成功提现',
				num: ''
			}]
		}
	},
	methods: {
		getBasicInfo() {
			this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
		},
		handleInit() {
			this.$http.get(`${this.HOST}/api.php?action=usercenter`, {
        params: {
          type: "account_total",
					user_id: this.user_id,
					token: this.token
        }
      }).then(response => {
      	console.log(response.data);
      	let
      		e = response.data.data,
      		account = e.account;

      	this.lists[0].num = e.interest.account_total;
      	this.lists[1].num = account.repay_account_capital;
      	this.lists[2].num = account.repay_account_interest;
      	this.lists[3].num = account.award_account_total;
      	this.lists[4].num = e.interest.interest;
      	this.lists[5].num = parseFloat(account.repay_account_interest) + parseFloat(account.award_account_total);
      	this.lists[6].num = account.recharge_account_total;
      	this.lists[7].num = account.tender_account_total;
      	this.lists[8].num = account.cash_account_total;
			});
		}
	},
	created() {
		this.getBasicInfo();
		this.handleInit();
	}
}
</script>

<style scoped>
	.fund-list {
		margin-top: .25rem;
		width: 100%;
		color: #666;
		font-size: .26rem;
	}
	.fund-list__item {
		box-sizing: border-box;
		position: relative;
		padding: 0 .25rem;
		margin-bottom: .25rem;
		width: 100%;
		height: .75rem;
		line-height: .75rem;
		background-color: #fff;
	}
	.fund-list__item:after {
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		bottom: 0;
		width: 3px;
	}
	.fund-list__item:nth-child(1)::after {background-color: #fab57d;}
	.fund-list__item:nth-child(2)::after {background-color: #5ab1ef;}
	.fund-list__item:nth-child(3)::after {background-color: #93d4d0;}
	.fund-list__item:nth-child(4)::after {background-color: #b8a2d9;}
	.fund-list__item:nth-child(5)::after {background-color: #ee7179;}
	.fund-list__item:nth-child(6)::after {background-color: #9B8CF3;}
	.fund-list__item:nth-child(7)::after {background-color: #7ECF94;}
	.fund-list__item:nth-child(8)::after {background-color: #E5C600;}
	.fund-list__item:nth-child(9)::after {background-color: #01A9F0;}

	.money {
		float: right;
		color: #363636;
	}
</style>