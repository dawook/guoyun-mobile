<template>
	<div class="m-home m-home--fixed">
    <yd-navbar title='重置交易密码' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>
		
		<v-card :mt='.35' class='card'>
			<yd-cell-group>
				<yd-cell-item>
            <input
              type="text"
              slot="right"
              v-model='code'
              placeholder="请输入手机验证码">

            <yd-sendcode slot="right" 
              v-model="isVerifyCode"
              initStr="获取验证码"
               runStr="{%s}s后重新获取"
              @click.native="getVerifyCode" 
              type="warning"
            ></yd-sendcode>

        </yd-cell-item>
        <yd-cell-item>
          <yd-input 
          	ref='newPwd'
          	slot="right"
          	type="password"
          	v-model="newPwd"
          	min='6'
          	max='16'
          	required
          	:showRequiredIcon='false'
          	placeholder="请输入6-16位密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <yd-input 
          	ref='confirmPwd'
          	slot="right"
          	type="password"
          	v-model="confirmPwd"
          	min='6'
          	max='16'
          	required
          	:showRequiredIcon='false'
          	placeholder="请确认支付密码"></yd-input>
        </yd-cell-item>
    	</yd-cell-group>
			
			<div class="footer">
				<p class="tips">请确认<span class="app-text-main">{{phoneNum}}</span>可正常接受短信</p>

				<yd-button size="large" type="danger" class='btnSubmit' @click.native='submit'>确认充值</yd-button>
			</div>
			

		</v-card>
  </div>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'
import vCard from '@/components/card'

export default {
	name: 'resetPaypwd',
	components: {
		vCard
	},
	data() {
		return {
			code: '',
			isVerifyCode: false,
			newPwd: '',
			confirmPwd: '',
			user_id: '',
			user_token: '',
			phoneNum: '',
			sms_id: ''
		}
	},
	methods: {
		getBasicInfo() {
			this.user_token = getStore("_user_token");
			this.user_id = getStore("_user_id");
			this.phoneNum = getStore("_user_phone");

			if (!this.phoneNum) {
				this.$router.replace({path: '/login'});
			}
		},
		valid() {
			if (!this.code) {
				this.$dialog.notify({
          mes: `验证码不能为空`,
          timeout: 3000
        });
        return false;
			}

			let	$newPwd = this.$refs.newPwd;

			if(!$newPwd.valid) {
				this.$dialog.notify({
          mes: `密码${$newPwd.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

			if(this.newPwd !== this.confirmPwd) {
				this.$dialog.notify({
          mes: `两次密码不一致`,
          timeout: 3000
        });
        return false;
			}

			return true;
		},
		submit() {
			if(!this.valid()) return false;

			this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
				type: "resetpaypassword",
				user_id: this.user_id,
				phone: this.phoneNum,
				newpassword: this.newPwd,
				code: this.code,
				sms_id: this.sms_id,
				token: this.user_token
    	})).then(response => {
        let data = response.data;

        if(data.code == 200) {
        	this.$dialog.notify({
	          mes: `支付密码重置成功`,
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

      this.$http.get(`${this.HOST}/api.php?action=usercenter`, {
        params: {
        	type: 'getsmscode',
          phone_code: this.phoneNum,
					user_id: this.user_id,
					token: this.user_token
        }
      }).then(response => {
      	let data = response.data;

      	if (data.code == 200) {
      		this.isVerifyCode = true;
      		this.sms_id = data.sms_id;

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
	},
	created() {
		this.getBasicInfo();
	}
}
</script>

<style scoped>
	.card {
		box-shadow: 1px 1px 3px #ccc;
	}
	.footer {
		margin: 0 auto .3rem;
		width: 92%;
	}
	.tips {
		font-size: .2rem;
		color: #999;
	}
	.btnSubmit {
		margin-top: .25rem;
	}
</style>