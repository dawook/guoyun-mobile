<template>
	<div class="m-home">
    <yd-navbar title='用户登录'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

		<div class="logo">
			<img :src="logoUrl">
		</div>
		
		<div class="form__wrap">
			<yd-cell-group>
        <yd-cell-item>
          <span slot="left" class="form__tips"><i class="dy-icon-user"></i></span>
          <yd-input
          	ref='username'
          	slot="right"
          	v-model="username"
						min='2'
          	max="20"
          	required
          	placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left" class="form__tips"><i class="dy-icon-password"></i></span>
          <yd-input 
          	ref='password'
          	slot="right"
          	type="password"
          	v-model="password"
          	min='6'
          	max='20'
          	required
          	:showRequiredIcon='false'
          	placeholder="请输入密码"></yd-input>
        </yd-cell-item>
    	</yd-cell-group>
    	<yd-button size="large" type="danger" @click.native='submit'>立即登录</yd-button>

    	<div class="or-line scale-1px top">
    		<span class="content">OR</span>
    	</div>
			
			<yd-flexbox class='login__tips'>
        <yd-flexbox-item>忘记密码？<span>找回密码</span></yd-flexbox-item>
        <yd-flexbox-item class='login__tips--right'>还没账号？<span @click='handleToRegister'>立即注册</span></yd-flexbox-item>
      </yd-flexbox>

		</div>
		

  </div>
</template>

<script>
import qs from 'qs'
import {setStore} from '@/utils/assist.js'

export default {
	name: 'loginPage',
	data() {
		return {
			logoUrl: require('@/assets/images/ICON.png'),
			username: '',
			password: ''
		}
	},
	methods: {
		valid() {
			let $username = this.$refs.username;
			let $password = this.$refs.password;

			if(!$username.valid) {
				this.$dialog.notify({
          mes: `用户名${$username.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

			if(!$password.valid) {
				this.$dialog.notify({
          mes: `密码${$password.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

			return true;
		},
		setSession(e) {
			this.$dialog.toast({
        mes: '登录成功',
        timeout: 1500
      });

			setStore('_user_id', e.user_id + "");
			setStore('_user_name', e.data.username + "");
			setStore('_user_token', e.data.token + "");
			setStore('_user_phone', e.data.phone + "");
			setStore('_user_kefuid', e.data.kefu_name + "");
			setStore('_user_school', e.data.school_nid + "");
			setStore('_user_real_name', e.data.realname + "");

			this.username = '';
			this.password = '';
		},
		submit() {
			if(!this.valid()) return false;

			console.log(`${this.username}:${this.password}`)

			this.$http.post(`${this.HOST}/api.php?action=login`, qs.stringify({
    		keywords: this.username,
				password: this.password
    	})).then(response => {
        let data = response.data;
        console.log(data)

        if(data.code == 200) {
        	this.setSession(data);
        	this.$router.back();
        } else {
        	this.$dialog.toast({
            mes: data.data,
            timeout: 1500
          });
        }

      })
		},

		handleToRegister() {
			this.$router.push({path: 'register'});
		}
	}
}
</script>

<style scoped>
	
	.logo {
		margin: 1rem auto 0;
		width: 1.2rem;
		height: 1.2rem;
		overflow: hidden;
		border-radius: 5px;
	}
	.logo img {
		width: 100%;
	}
	.form__wrap {
		margin: .5rem auto;
		width: 90%;
	}
	.form__tips {
		color: #999;
		font-size: .45rem;
		padding-right: 5px;
	}

	.or-line {
		position: relative;
		margin-top: .45rem;
	}
	.or-line .content {
		padding: 0 .1rem;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 10;
		transform: translate(-50%, -50%);

		background-color: #f6f7f9;
		font-size: .125rem;
		color: #999;
		border-radius: 50%;
	}

	.login__tips {
		margin-top: .75rem;
		font-size: .2rem;
		color: #999;
	}
	.login__tips--right {
		text-align: right;
	}
	.login__tips span {
		color: #ef4f4f;
	}
	
	
</style>