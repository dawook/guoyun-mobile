<template>
	<yd-layout>
    <yd-navbar slot="navbar" :title="title">
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
     </yd-navbar>

    <div class="main">
    	<div class="top">
				<h2 class="title" v-text='name'></h2>
				<p class="num">编号：2015001254</p>
				
				<div class="left-money">
					<yd-countup
	          endnum="120000"
	          duration="3"
	          decimals="2"
	          separator=","
	          prefix="¥"
	          suffix="元"
	          class="countDown"
	    		></yd-countup>
	    		<p class="tips">
	    			可购金额
	    		</p>

	    		<v-progress :suffx='60'></v-progress>
				</div>
				
				
				<div class="info__wrap">
					<yd-flexbox>
	          <yd-flexbox-item class='scale-1px right'>
	          	500万元
	          	<p class="tips">项目总额</p>
	          </yd-flexbox-item>
	          <yd-flexbox-item class='scale-1px right'>
	          	35%
	          	<p class="tips">年化收益</p>
	          </yd-flexbox-item>
	          <yd-flexbox-item>
	          	6个月
	          	<p class="tips">投资期限</p>
	          </yd-flexbox-item>
	        </yd-flexbox>
	        
				</div>
    	</div>

			<yd-cell-group>
        <yd-cell-item>
          <span class="info-tips" slot="left">发售时间</span>
          <span class="info-tips" slot="right">2015-12-05 12:30</span>
        </yd-cell-item>
        <yd-cell-item>
          <span class="info-tips" slot="left">最高可购金额</span>
          <span class="info-tips" slot="right">100000元</span>
        </yd-cell-item>    
      </yd-cell-group>
      <yd-cell-group>
        <yd-cell-item arrow>
          <span class="info-tips" slot="left">资产详情</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span class="info-tips" slot="left">购买人数</span>
          <span class="info-tips" slot='right'>320人</span>
        </yd-cell-item>    
      </yd-cell-group>

    </div>

       

  </yd-layout>
</template>

<script>
import vProgress from '@/components/progress'
export default {
	name: 'detail',
	components: {
		vProgress
	},
	data() {
		return {
			title: '项目详情',
			name: '国运电影-WD-GYBS-004(一期)(试运营)',
			progress: 0.65,
			suffx: 60,
		}
	}
}
</script>

<style scoped>

	.top {
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

</style>