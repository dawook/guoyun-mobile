<template>
	<div class="m-home">
    <yd-navbar title='找回密码'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

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
            <input
              type="text"
              slot="right"
              v-model='code'
              v-focus='isFocus'
              placeholder="请输入手机验证码">

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
			
    	<yd-button size="large" type="danger" @click.native='submit'>马上找回</yd-button>

		</div>
		

  </div>
</template>

<script>
import qs from 'qs'
import {setStore} from '@/utils/assist.js'

export default {
	name: 'findPwdPage',
	data() {
		return {
			username: '',
			password: '',
			confirm_password: '',
			isVerifyCode: false,
			code: '',
			smsId: '',
			user_id: '',
      isFocus: false
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
			let	$password = this.$refs.password;


			if(!this.validPhone()) return false;

			if(!$password.valid) {
				this.$dialog.notify({
          mes: `密码${$password.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

			// 验证两次输入密码是否一致
			if(this.password !== this.confirm_password) {
				this.$dialog.notify({
          mes: `两次输入密码必须一致`,
          timeout: 3000
        });
        return false;
			}

			// 验证手机验证
			if(!this.code) {
				this.$dialog.notify({
          mes: `手机验证码不能为空`,
          timeout: 3000
        });
        return false;
			}

			return true;
		},
		
		submit() {
			if(!this.valid()) return false;

			this.$http.post(`${this.HOST}/api.php?action=getpwdset`, qs.stringify({
				user_id: this.user_id,
				phone: this.username,
				password: this.password,
				password1: this.confirm_password,
				code: this.code,
				sms_id: this.smsId
    	})).then(response => {
        let data = response.data;

        if(data.code == 200) {
        	this.$dialog.notify({
	          mes: `密码找回成功，请重新登录`,
	          timeout: 3000
	        });
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

      this.isFocus = true;

      this.$http.get(`${this.HOST}/api.php?action=sms_getpwd`, {
        params: {
          phone: this.username
        }
      }).then(response => {
      	let data = response.data;

      	if (data.code == 200) {
      		this.isVerifyCode = true;
      		this.smsId = data.sms_id;
      		this.user_id = data.user_id;

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
	
	.form__wrap {
		margin: .5rem auto;
		width: 90%;
	}
	.form__tips {
		color: #999;
		font-size: .45rem;
		padding-right: 5px;
	}
	
</style>