<template>
	<yd-popup v-model="isShow" position="right" width="100%" class='popup--gray'>
		<yd-navbar title='设置' class='navbar'>
      <yd-navbar-back-icon @click.native='handleClose' slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="container">

      <yd-cell-group>
        <yd-cell-item :arrow='true'>
          <span slot="left">实名认证</span>
          <span slot='right'>姚**</span>
        </yd-cell-item>
        <yd-cell-item :arrow='false'>
          <span slot="left">绑定手机</span>
          <span slot='right'>152****6283</span>
        </yd-cell-item>
      </yd-cell-group>

      <yd-cell-group>
        <yd-cell-item arrow>
          <span slot="left">修改登录密码</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">修改支付密码</span>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">短信提醒</span>
        </yd-cell-item>
      </yd-cell-group>
			
			<div class="btn-wrap">
				<yd-button size="large" type="danger">退出登录</yd-button>
			</div>

    </div>

    
  </yd-popup>
</template>

<script>
export default {
	name: 'buyersList',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			avatarImg: require('@/assets/images/head.jpg')
		}
	},
	methods: {
		handleClose() {
			this.$emit('settingClose', false)
		},
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
	.btn-wrap {
		margin: 0 auto;
		width: 90%;
	}

	.user-img {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid #ccc;
	}

</style>