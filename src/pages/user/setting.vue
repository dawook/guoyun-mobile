<template>
	<yd-popup v-model="isShow" position="right" width="100%" class='popup--gray'>
		<yd-navbar title='设置' class='navbar'>
      <yd-navbar-back-icon @click.native='handleClose' slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="container">

      <yd-cell-group>
        <yd-cell-item :arrow='!realName' @click.native='setRealname'>
          <span slot="left">实名认证</span>
          <span slot='right' v-if='!realName' class="app-text-main">未认证</span>
          <span slot='right' v-else v-text='realName'></span>
        </yd-cell-item>
        <yd-cell-item>
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
				<yd-button size="large" type="danger" @click.native='exit'>退出登录</yd-button>
			</div>

    </div>

		<user-real-name :bPopupRealname='bPopupRealname' @realNameClose='realNameClose'></user-real-name>  
		<user-modify-pwd bModifyPwd></user-modify-pwd>
    
  </yd-popup>
</template>

<script>
import {setStore, getStore, clearStore} from '@/utils/assist.js'
import userRealName from '@/components/userRealName'
import userModifyPwd from '@/components/userModifyPwd'

export default {
	name: 'settingPage',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	components: {
		userRealName,
		userModifyPwd
	},
	data() {
		return {
			realName: '',
			bPopupRealname: false
		}
	},
	methods: {
		handleClose() {
			this.$emit('settingClose', false)
		},
		getRealname() {
			this.realName = getStore("_user_real_name");
		},
		setRealname() {
			if(!this.realName) {
				this.bPopupRealname = true;
			}
		},
		realNameClose(val) {
			this.getRealname();
			this.bPopupRealname = !!val;
		},

		exit() {
			this.$dialog.notify({
        mes: `您已退出当前账号`,
        timeout: 1500
      });
			clearStore();
			this.$router.replace({path: '/'});
		}
	},
	created() {
		this.getRealname();
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