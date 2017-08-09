<template>
	<div class="m-home">
		<div class="header">
	    <user-navbar @changeSet='isShowSet = true'></user-navbar>
			<user-avatar
				:imgSrc='avatarImg'
				:userName='userName'
				:level='level'></user-avatar>
		</div>

		<user-account></user-account>

    <yd-cell-group v-for='(item, index) in cellList' :key='index' class='user-cell' v-if='!isShowGrids'>
    	<yd-cell-item arrow v-for='(cell, i) in item' :key='i' type="link" :href="cell.link">
    		<i :class='["dy-icon-" + cell.icon, "list-" + cell.cls]' slot="icon"></i>
        <span slot="left" class="user-nav-item">{{cell.title}}</span>
      </yd-cell-item>
    </yd-cell-group>

		<yd-grids-group :rows="4" v-for='(item, index) in cellList' :key='index' v-if='isShowGrids'>
        <yd-grids-item v-for='(cell, i) in item' :key='i' @click.native='link = cell.link'>
          <i :class='["dy-icon-" + cell.icon, "list-" + cell.cls]' slot="icon"></i>
          <span slot="text">{{cell.title}}</span>
        </yd-grids-item>
    </yd-grids-group>

    <v-footer></v-footer>

		<user-setting :isShow='isShowSet' @settingClose='isShowSet = false'></user-setting>

	</div>
</template>

<script>
import userNavbar from '@/components/userNavbar'
import userAvatar from '@/components/userAvatar'
import userAccount from '@/components/userAccount'
import vFooter from '@/components/footer'

import userSetting from './setting.vue'

import {setStore, getStore} from '@/utils/assist.js'

export default {
	name: 'user',
	components: {
		userNavbar,
		userAvatar,
		userAccount,
		userSetting,
		vFooter
	},
	data() {
		return {
			isShowGrids: false,
			isShowSet: false,
			link: '',
			avatarImg: require('@/assets/images/head.jpg'),
			userName: '',
			level: '',
			cellList: [
				[
					{
						"icon": 'recharge',
						"title": '我要提现',
						"link": '/user/cash',
						"cls": 'cash'
					},
					{
						"icon": 'shield',
						"title": '购买管理',
						"link": '/user/purchase',
						"cls": 'purchase'
					},
					{
						"icon": 'school',
						"title": '国运商学院',
						"link": '/user/school',
						"cls": 'school'
					},
					{
						"icon": 'pie-chart',
						"title": '资金记录',
						"link": '/user/fund_record',
						"cls": 'fund-record'
					}
				],
				[
					{
						"icon": 'bank-card',
						"title": '银行卡管理',
						"link": '/user/bank',
						"cls": 'bank'
					},
					{
						"icon": 'stats-bars',
						"title": '股权认购明细',
						"link": '/user/stock_record',
						"cls": 'stock-record'
					},
					{
						"icon": 'record-detailed',
						"title": '提现明细',
						"link": '/user/cash_record',
						"cls": 'cash-record'
					},
					{
						"icon": 'recharge-circle',
						"title": '充值明细',
						"link": '/user/recharge_record',
						"cls": 'recharge-record'
					}
				],
				[
					{
						"icon": 'promotion-record',
						"title": '推广记录',
						"link": '/user/market_record',
						"cls": 'market-record'
					},
					{
						"icon": 'stats-dots',
						"title": '资金统计',
						"link": '/user/found_record',
						"cls": 'found-record'
					},
					{
						"icon": 'integral',
						"title": '我的积分',
						"link": '/user/integral',
						"cls": 'integral'
					},
					{
						"icon": 'chat',
						"title": '专属客服',
						"link": '/user/customer_server',
						"cls": 'customer-server'
					}
				]
			]
		}
	},
	watch: {
		link: 'handleLinkChange'
	},
	methods: {
		getUser() {
			this.userName = getStore("_user_name");
			let _user_school = getStore("_user_school");
			this.level = _user_school === 'null' ? false : _user_school.charAt(_user_school.length - 1);
		},
		handleShowType() {
			this.isShowGrids = +getStore("_user_is_show_grids");
		},
		handleLinkChange() {
			this.$router.push({path: this.link});
		}
	},
	mounted() {
		this.getUser();
		this.handleShowType();
	}
}
</script>

<style scoped>
	.header {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		overflow: hidden;
    min-height: 3.1rem;
    color: #fff;
    background: #ed424b url(../../assets/images/center-header-bg.0.1.jpg) no-repeat center;
    background-size: cover;
	}

	.user-nav-item {
		font-size: .25rem;
		color: #666;
	}

	.list-cash {color: #FD565D;}
	.list-purchase {color: #ff7b34;}
	.list-school {color: #9B8CF3;}
	.list-fund-record {color: #48C9B3;}

	.list-bank {color: #F1853A;}
	.list-stock-record {color: #7ECF94;}
	.list-cash-record {color: #EE664C;}
	.list-recharge-record {color: #E5C600;}

	.list-market-record {color: #7ECF94;}
	.list-found-record {color: #F1853A;}
	.list-integral {color: #7ECF94;}
	.list-customer-server {color: #01A9F0;}

</style>