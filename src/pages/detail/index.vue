<template>
	<div class="m-home m-home--fixed">
    <yd-navbar :title='title' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <div class="main">
    	<div class="top-card">
				<h2 class="title" v-text='data.name'></h2>
				<p class="num">编号：{{data.borrow_nid}}</p>
				
				<div class="left-money">
					<yd-countup
	          :endnum='endnum'
	          decimals="2"
	          useEasing
	          separator=","
	          prefix="¥"
	          suffix="元"
	          class="countDown"
	    		></yd-countup>
	    		<p class="tips">
	    			可购金额
	    		</p>

	    		<v-progress :suffx='suffx'></v-progress>
				</div>
				
				
				<div class="info__wrap">
					<yd-flexbox>
	          <yd-flexbox-item class='scale-1px right'>
	          	{{data.account_wan}}万元
	          	<p class="tips">项目总额</p>
	          </yd-flexbox-item>
	          <yd-flexbox-item class='scale-1px right'>
	          	{{data.borrow_apr}}%
	          	<p class="tips">{{data.type == 1 ? `预估年华` : `年化收益`}}</p>
	          </yd-flexbox-item>
	          <yd-flexbox-item>
	          	{{data.borrow_period > 12 ? `${data.borrow_period}天` : `${data.borrow_period}个月`}}
	          	<p class="tips">{{data.type == 1 ? `预处置期限` : `处置期限`}}</p>
	          </yd-flexbox-item>
	        </yd-flexbox>
	        
				</div>
    	</div>
			
			<div class="top-card">
				<yd-flexbox class='info-list'>
	        <yd-flexbox-item>
	        	<i class="dy-icon-capital"></i>
	        	<p>次日计息</p>
	        </yd-flexbox-item>
	        <yd-flexbox-item>
	        	<i class="dy-icon-time"></i>
	        	<p v-text='repayType'></p>
	        </yd-flexbox-item>
	        <yd-flexbox-item>
	        	<i class="dy-icon-buy_circle"></i>
	        	<p>{{data.tender_account_min}}元起购</p>
	        </yd-flexbox-item>
	      </yd-flexbox>
			</div>
			

			<yd-cell-group>
        <yd-cell-item>
          <span class="info-tips" slot="left">发售时间</span>
          <span class="info-tips" slot="right">{{data.borrow_starttime}}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span class="info-tips" slot="left">最高可购金额</span>
          <span class="info-tips" slot="right">{{data.tender_account_max > 0 ? `${data.tender_account_max}元` : '不限'}}</span>
        </yd-cell-item>    
      </yd-cell-group>
      <yd-cell-group>
        <yd-cell-item arrow>
          <span class="info-tips" slot="left">资产详情</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span class="info-tips" slot="left">购买人数</span>
          <span class="info-tips" slot='right'>{{data.num > 0 ? data.num : 0}}人</span>
        </yd-cell-item>    
      </yd-cell-group>

      <div class="schedule">
				<p class="title">项目进度</p>
				<yd-flexbox :class='["wrap", `status--${data.caseflownum}`]'>
			    <yd-flexbox-item
			    	class='item'
			    	v-for='(item, index) in list'
			    	:key = 'index'>
			    	<p class="tips" v-text='item'></p>
			    	<div class="line"></div>
			    </yd-flexbox-item>

			  </yd-flexbox>
			</div>

    </div>

    <div class="bar-bottom scale-1px top" v-if='bBtn'>
    	<div :class='["btnBuy", `btn-status--${iBtn}`]' @click='handleBuy'>{{btnTextList[iBtn]}}</div>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import {setStore} from '@/utils/assist.js'

import vProgress from '@/components/progress'
import schedule from './schedule.vue'

export default {
	name: 'detail',
	components: {
		vProgress,
		schedule
	},
	data() {
		return {
			id: 0,
			data: {},
			endnum: 0,
			title: '项目详情',
			suffx: 0,
			repayType: '到期还本付息',

			tipsList: [
				['资产锁定', '办理交接', '对外出售', '办理按揭', '项目结束'],
				['勘探测绘', '中标签约', '土地整理', '国土验收', '挂牌交易'],
				['前期筹备', '开机拍摄', '影片制作', '宣传推广', '放映营收'],
				['认筹', '给保证金', '农户贷款', '审核放款', '设备安装', '项目回款']
			],
			list: [],

			btnTextList: ['即将发售', '立即购买', '已完成', '已结算'],
			bBtn: false,
			iBtn: 0
		}
	},
	watch: {
		id: 'loadDetail',
		data: function () {
			this.getLeft();
			this.getRepayType();
			this.setSchedule();
			this.setBtnTxt();
		}
	},
	methods: {
		loadDetail() {
			this.$http.post(`${this.HOST}/api.php?action=investinfo`, qs.stringify({
    		id: this.id
    	})).then(response => {
        let data = response.data.data;
        this.data = data;
        
        setStore('detail', data);
      })
		},
		getLeft() {
			let data = this.data;
			this.endnum = data.borrow_account_wait
			this.suffx = data.borrow_account_scale

			if (data.type ==2) {
				if (data.borrow_status_nid == "repay" || (data.scale >= 100 && data.number == 1)) {
					this.endnum = 0;
					this.suffx = 100
				}
			}
		},
		getRepayType() {
			let data = this.data;
			if (data.type == 3) {
				this.repayType = '到期还本按季付息'
			} else if (data.type == 2) {
				if (data.borrow_style == "endmonth") {
					this.repayType = '到期还本按季付息'
				} else if (data.borrow_style == "yearmonth") {
					this.repayType = '到期还本半年付息'
				}
			}
		},
		setSchedule() {
			this.list = this.tipsList[this.data.type - 1]
		},

		setBtnTxt() {
			let obj = this.data;

			if (obj.type !=2 ) {
				if (obj.end_time > 0) {
					this.iBtn = 0;
				}else if (obj.borrow_status_nid == "loan") {
					this.iBtn = 1;
				}else if (obj.borrow_status_nid == "repay") {
					this.iBtn = 2;
				}else if (obj.borrow_status_nid == "repay_yes" ) {
					this.iBtn = 3;
				}
			} else {
				if (obj.end_time > 0) {
					this.iBtn = 0;
				}else if (obj.borrow_status_nid == "loan" && obj.scale < 100) {
					this.iBtn = 1;
				}else if (obj.borrow_status_nid == "repay" || (obj.scale >= 100 && obj.number == 1) ) {
					this.iBtn = 2;
				}else if (obj.borrow_status_nid == "repay_yes" ) {
					this.iBtn = 3;
				}
			}

			this.bBtn = true;
		},

		handleBuy() {
			if (this.iBtn !== 1) {
				this.$dialog.toast({
          mes: `项目${this.btnTextList[this.iBtn]} ~ ~`,
          timeout: 1500
        });
			} else {
				
			}
		}
	},
	created() {
		this.id = this.$route.params.id;
	}
}
</script>

<style scoped>
	.main {
		padding-bottom: .9rem;
	}
	.top-card {
		padding: .25rem;
		margin-bottom: .3rem;
		width: 100%;
		background-color: #fff;
	}
	.title {
		display: block;
		margin-bottom: .125rem;
		color: #3399d5;
		font-size: .3rem;
		font-weight: normal;
	}
	.num {
		color: #ccc;
		font-size: .215rem;
	}
	.left-money {
		margin-top: 30px;
		text-align: center;
	}
	.countDown {
		color: #3399d5;
		font-size: .5rem;
	}
	.left-money .tips {
		padding-top: 10px;
		padding-bottom: 15px;
	}
	.tips {
		color: #ccc;
	}

	.info-list {
		text-align: center;
		font-size: .25rem;
		color: #999;
	}
	.info-list i {
		font-size: .55rem;
		color: rgba(51,153,219,.65);
	}
	.info-list p {
		padding-top: 5px;
	}

	.info__wrap {
		margin: 20px auto;
		width: 95%;
		text-align: center;
		font-size: .35rem;
		color: #999;
	}
	.info__wrap .tips {
		padding-top: 5px;
		font-size: .25rem;
	}

	.info-tips {
		font-size: .26rem;
		color: #999;
		font-weight: normal;
	}

	.bar-bottom {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		height: 1rem;
		z-index: 10;
		overflow: hidden;
		text-align: center;
		background-color: #fff;
	}
	.btnBuy {
		width: 100%;
		height: 100%;
		line-height: 1rem;
		font-size: .35rem;
		color: #fff;
	}
	.btnBuy.btn-status--0 {
		background-color: #3399d5;
	}
	.btnBuy.btn-status--1 {
		background-color: #f3111a;
	}
	.btnBuy.btn-status--2 {
		background-color: #999;
	}
	.btnBuy.btn-status--3 {
		background-color: #ccc;
	}

	.schedule {
		padding: .25rem;
		width: 100%;
		background-color: #fff;
	}
	.title {
		padding-bottom: .25rem;
		color: #3399d5;
		font-size: .3rem;
	}
	.wrap {
		padding-bottom: .25rem;
		width: 100%;
		text-align: center;
	}
	.item {
		position: relative;
	}
	.tips {
		color: #999;
		font-size: .2rem;
	}
	.line {
		position: relative;
		margin-top: 15px;
		width: 100%;
		height: 1px;
		background-color: #ccc;
	}
	.line:before {
		position: absolute;
		content: "";
		top: -1px;
		right: 50%;
		bottom: -1px;
		left: 0;
		background-color: #3399d5;
		display: none;
	}
	.line:after {
		position: absolute;
		top: -2px;
		content: "";
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #fff;
		border: 1px solid #3399d5;
		display: none;
	}
	.status--0 .item:nth-child(1) .line:before,
	.status--0 .item:nth-child(1) .line:after,

	.status--1 .item:nth-child(1) .line:before,
	.status--1 .item:nth-child(2) .line:before,
	.status--1 .item:nth-child(2) .line:after,

	.status--2 .item:nth-child(1) .line:before,
	.status--2 .item:nth-child(2) .line:before,
	.status--2 .item:nth-child(3) .line:before,
	.status--2 .item:nth-child(3) .line:after,

	.status--3 .item:nth-child(1) .line:before,
	.status--3 .item:nth-child(2) .line:before,
	.status--3 .item:nth-child(3) .line:before,
	.status--3 .item:nth-child(4) .line:before,
	.status--3 .item:nth-child(4) .line:after,

	.status--4 .item:nth-child(1) .line:before,
	.status--4 .item:nth-child(2) .line:before,
	.status--4 .item:nth-child(3) .line:before,
	.status--4 .item:nth-child(4) .line:before,
	.status--4 .item:nth-child(5) .line:before,
	.status--4 .item:nth-child(5) .line:after,

	.status--5 .item:nth-child(1) .line:before,
	.status--5 .item:nth-child(2) .line:before,
	.status--5 .item:nth-child(3) .line:before,
	.status--5 .item:nth-child(4) .line:before,
	.status--5 .item:nth-child(5) .line:before,
	.status--5 .item:nth-child(6) .line:before,
	.status--5 .item:nth-child(6) .line:after {
		display: block;
	}

	.status--1 .item:nth-child(1) .line:before,

	.status--2 .item:nth-child(1) .line:before,
	.status--2 .item:nth-child(2) .line:before,

	.status--3 .item:nth-child(1) .line:before,
	.status--3 .item:nth-child(2) .line:before,
	.status--3 .item:nth-child(3) .line:before,

	.status--4 .item:nth-child(1) .line:before,
	.status--4 .item:nth-child(2) .line:before,
	.status--4 .item:nth-child(3) .line:before,
	.status--4 .item:nth-child(4) .line:before,

	.status--5 .item:nth-child(1) .line:before,
	.status--5 .item:nth-child(2) .line:before,
	.status--5 .item:nth-child(3) .line:before,
	.status--5 .item:nth-child(4) .line:before,
	.status--5 .item:nth-child(5) .line:before {
		right: 0;
	}

	.status--0 .item:nth-child(1) .line:after,
	.status--1 .item:nth-child(2) .line:after,
	.status--2 .item:nth-child(3) .line:after,
	.status--3 .item:nth-child(4) .line:after,
	.status--4 .item:nth-child(5) .line:after,
	.status--5 .item:nth-child(6) .line:after {
		left: 50%;
	}

	.status--4 .item:nth-child(5) .line:before,
	.status--5 .item:nth-child(6) .line:before {
		right: 0;
	}

</style>