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

    </div>

    <div class="bar-bottom scale-1px top">
    	<yd-flexbox>
        <div class="item scale-1px right">
        	<i class="dy-icon-chat"></i>
        	<p class="serverC">客服</p>
        </div>
        <div class="item scale-1px right">
        	<yd-icon name="star-outline" size='.35rem'></yd-icon>
        	<p>收藏</p>
        </div>
        <div class="item ">
        	<yd-icon name="share1" size='.35rem'></yd-icon>
        	<p>分享</p>
        </div>
        <yd-flexbox-item>
        	<div class="btnBuy">立即购买</div>
        </yd-flexbox-item>
      </yd-flexbox>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import vProgress from '@/components/progress'
import {setStore} from '@/utils/assist.js'
export default {
	name: 'detail',
	components: {
		vProgress
	},
	data() {
		return {
			id: 0,
			data: {},
			endnum: 0,
			title: '项目详情',
			suffx: 0,
			repayType: '到期还本付息'
		}
	},
	watch: {
		id: 'loadDetail',
		data: function () {
			this.getLeft();
			this.getRepayType()
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
	.bar-bottom div {
		height: 100%;
	}
	.bar-bottom div.item {
		padding-top: .2rem;
		width: 1.2rem;
	}
	.bar-bottom div.item i {
		font-size: .35rem;
		color: #666;
	}
	.serverC {
		padding-top: 2px;
	}
	.bar-bottom div.item p {
		font-size: .25rem;
		color: #999;
	}
	.btnBuy {
		width: 100%;
		height: 100%;
		line-height: 1rem;
		font-size: .35rem;
		color: #fff;
		background-color: #f3111a;
	}

</style>