<template>
	<yd-popup v-model="isShow" position="right" width="100%">
		<yd-navbar title='项目资料' class='navbar'>
      <yd-navbar-back-icon @click.native='handleClose' slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="container">
			<div class="house__container"  v-if='list.type == 1'>
				<ul class="app-ul">
					<li>所在区域：<span class="app-text-gary">{{list.assets_city }}</span></li>
					<li>产权面积：<span class="app-text-main">{{list.assets_area }}㎡</span></li>
					<li>产权类型：<span class="app-text-gary">{{list.assets_type }}</span></li>
					<li>购置金额：<span class="app-text-main">{{list.account_wan }}万</span></li>
					<li>购入方式：<span class="app-text-gary">{{list.assets_mode }}</span></li>
					<li>房屋现状：<span class="app-text-gary">{{list.assets_situation }}</span></li>
					<li>预售估价：<span class="app-text-main">约{{list.assets_money }}万</span></li>
					<li>共有情况：<span class="app-text-gary">{{list.assets_gyqk }}</span></li>
				</ul>
				
				<div class="house__info">
					<p class="title">资产详情：</p>
					<div class="house__info-main" v-html='list.borrow_contents'></div>
					<p class="title">资产调查：</p>
					<div class="house__info-main" v-html='list.borrow_nengli'></div>
					<p class="title">预处置方案：</p>
					<div class="house__info-main" v-html='list.borrow_chu_case'></div>
				</div>
				<p class="title">项目展示：</p>
				<yd-lightbox class='m-t-md'>
        	<yd-lightbox-img
        		class='house__img'
        		v-for="(item, index) in list.investpic"
        		:src="item.fileurl"
        		:key='index'></yd-lightbox-img>
    		</yd-lightbox>
			</div>

			<div class="assets__container" v-if='list.type == 2'>
				<img  v-for="(item, index) in list.investpic" :key='index' :src="item.pic">
			</div>
			
			<div
    		class="film__container"
    		v-if='list.type == 3'
    		v-html='list.borrow_contents'></div>

    	<div
    		class="assets__container"
    		v-if='list.type == 4'
    		v-html='list.borrow_contents'></div>
    	
    	</div>
    </div>
    
  </yd-popup>
</template>

<script>
export default {
	name: 'assets',
	props: {
		list: {
			type: [Object, Array]
		},
		isShow: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		handleClose() {
			this.$emit('popupClose', false)
		}
	}
}
</script>

<style scoped>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.container {
		margin-top: 1rem;
	}
	.house__container {
		margin: 0 auto;
		width: 95%;
	}
	
	.app-ul {
		width: 100%;
		overflow: hidden;
		color: #666;
	}
	.app-ul li {
		float: left;
		width: 50%;
		height: 30px;
		line-height: 30px;
	}

	.house__info {
		margin-top: 15px;
	}
	.title {
		font-size: 18px;
		color: #3599D5;
	}
	.house__info-main {
		line-height: 26px;
		color: #666;
	}
	.house__img {
		display: block;
		width: 45%;
		float: left;
		border: 1px solid #ccc;
		margin-bottom: 20px;
		margin-left: 10px;
	}
</style>