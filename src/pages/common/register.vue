<template>
	<div class="m-home">
    <yd-navbar title='用户注册'>
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
          	required
          	v-model="username"
						regex="mobile"
          	placeholder="请输入您的手机号码"></yd-input>
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
        <yd-cell-item>
          <span slot="left" class="form__tips"><i class="dy-icon-password_confirm"></i></span>
          <yd-input 
          	ref='confirm_password'
          	slot="right"
          	type="password"
          	v-model="confirm_password"
          	min='6'
          	max='20'
          	required
          	:showRequiredIcon='false'
          	placeholder="请在此输入密码"></yd-input>
        </yd-cell-item>
				<yd-cell-item>
            <span slot="left" class="form__tips"><i class="dy-icon-verify-code"></i></span>
            <input type="text" slot="right" v-model='code' placeholder="请输入手机验证码">

            <!-- ↓↓关键代码是这里↓↓ -->
            <yd-sendcode slot="right" 
              v-model="isVerifyCode"
              initStr="获取验证码"
               runStr="{%s}s后重新获取"
              @click.native="getVerifyCode" 
              type="warning"
            ></yd-sendcode>
            <!-- ↑↑关键代码是这里↑↑ -->

        </yd-cell-item>
    	</yd-cell-group>
			
			<yd-checkbox 
				v-model="isAgree"
				color="#ef4f4f"
				size='14'>
				<span class="agree-tips">我已阅读并同意</span>
			</yd-checkbox><router-link to='protocol' class='text-danger' style='font-size: .2rem'>《服务协议》</router-link>
    	<yd-button size="large" type="danger" @click.native='submit'>立即注册</yd-button>

    	<div class="or-line scale-1px top">
    		<span class="content">OR</span>
    	</div>
			
			<yd-flexbox class='login__tips'>
        <yd-flexbox-item class='login__tips--right'>已有账号？<span @click='handleToLogin'>立即登录</span></yd-flexbox-item>
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
			isAgree: true,
			username: '',
			password: '',
			confirm_password: '',
			isVerifyCode: false,
			code: '',
			smsId: ''
		}
	},
	methods: {
		validPhone() {
			let $username = this.$refs.username;
			if(!$username.valid) {
				this.$dialog.notify({
          mes: `手机号${$username.errorMsg}`,
          timeout: 3000
        });
        return false;
			}
			return true;
		},
		valid() {
			let $password = this.$refs.password;

			if(!$password.valid) {
				this.$dialog.notify({
          mes: `密码${$password.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

			return true;
		},
		
		submit() {
			if(!this.valid()) return false;


			this.$http.post(`${this.HOST}/api.php?action=reg`, qs.stringify({
				phone: this.username,
				password: this.password,
				passwords: this.confirm_password,
				invite_username: '',
				code: this.code,
				sms_id: this.smsId
    	})).then(response => {
        let data = response.data;
        console.log(data)
        if(data.code == 200) {
        	this.$router.back();
        } else {
        	this.$dialog.toast({
            mes: data.data,
            timeout: 1500
          });
        }

      })
		},

		getVerifyCode() {
			if(!this.validPhone()) return false;


      this.$http.get(`${this.HOST}/api.php?action=sms`, {
        params: {
          phone_code: this.username
        }
      }).then(response => {
      	let data = response.data;
      	console.log(data);

      	if (data.code == 200) {
      		this.isVerifyCode = true;
      		this.smsId = data.sms_id;
      		this.$dialog.toast({
            mes: '已发送,请注意查收',
            icon: 'success',
            timeout: 1500
          });
      	} else {
      		this.$dialog.toast({
            mes: data.data,
            timeout: 1500
          });
      	}

      })

		},

		handleToLogin() {
			this.$router.replace({path: 'login'});
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
	.agree-tips {
		font-size: .2rem;
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