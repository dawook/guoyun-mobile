<template>
	<yd-popup v-model="bModifyPwd" position="center" width="90%">
    <div class="main">
    	<p class="title">修改{{tips[type]}}密码</p>
    	<yd-cell-group>
        <yd-cell-item>
          <yd-input
          	ref="oldPwd"
          	slot="right"
          	v-model='oldPwd'
            type="password"
            required
          	regex="\d{6,16}"
          	placeholder="请输入原始密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <yd-input
          	ref="newPwd"
          	slot="right"
          	v-model='newPwd'
            type="password"
          	required
          	regex="\d{6,16}"
          	placeholder="请输入6-16位新密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <yd-input
            ref="confirmPwd"
            slot="right"
            v-model='confirmPwd'
            type="password"
            required
            regex="\d{6,16}"
            placeholder="请再次输入新密码"></yd-input>
        </yd-cell-item>
    	</yd-cell-group>

      <p class="tips" v-if='type === "pay"'>提示：初始支付密码与登录密码一致。</p>

			<div class="btn-wrap">
				<yd-button type="danger" @click.native='submit'>马上修改</yd-button>
    		<yd-button type="hollow" @click.native='handleClose'>放弃修改</yd-button>
			</div>
      <p class="resetPaypwd" v-if='type === "pay"'>忘记支付密码？<router-link to='/user/reset_paypwd'>重置交易密码</router-link></p>

    </div>
  </yd-popup>
</template>

<script>
import qs from 'qs'
import {setStore, getStore} from '@/utils/assist.js'

export default {
	name: 'modifyPwd',
	props: {
		bModifyPwd: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'login'
		}
	},
	data() {
		return {
			oldPwd: '',
			newPwd: '',
      confirmPwd: '',
      tips: {
        "login": "登陆",
        "pay": "支付"
      },
      postData: {}
		}
	},
	methods: {
		valid() {
			let
        $oldPwd = this.$refs.oldPwd,
				$confirmPwd = this.$refs.confirmPwd,
				$newPwd = this.$refs.newPwd;

			if(!$oldPwd.valid) {
				this.$dialog.notify({
          mes: `原始密码${$oldPwd.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

			if(!$newPwd.valid) {
				this.$dialog.notify({
          mes: `新密码${$newPwd.errorMsg}`,
          timeout: 3000
        });
        return false;
			}

      // 验证两次输入密码是否一致
      if(this.newPwd !== this.confirmPwd) {
        this.$dialog.notify({
          mes: `两次输入密码必须一致`,
          timeout: 3000
        });
        return false;
      }

      if(this.newPwd == this.oldPwd) {
        this.$dialog.notify({
          mes: `新密码不能和原始密码一致`,
          timeout: 3000
        });
        return false;
      }

			return true;
		},
    setPostData() {
      let
        _user_id = getStore("_user_id"),
        _token = getStore("_user_token");

      this.postData = {};

      if (this.type === 'login') {
        let _user_name = getStore("_user_name");
        this.postData = {
          type: "mimaupdate",
          oldpassword:  this.oldPwd,
          newpassword: this.newPwd,
          user_id: _user_id,
          token: _token,
          username: _user_name
        }
      } else if (this.type === 'pay') {
        this.postData = {
          type: "jypassword",
          oldpassword:  this.oldPwd,
          newpassword: this.newPwd,
          user_id: _user_id,
          token: _token
        }
      }
    },
		submit() {
			if(!this.valid()) return false;

      this.setPostData();

      if (this.type === 'login') {
        this.modifyLoginPwd();
      } else if (this.type === 'pay') {
        this.modifyPayPwd();
      }
			
		},
    modifyLoginPwd() {
      this.$http.post(`${this.HOST}/api.php?action=usercenter`,
        qs.stringify(this.postData)).then(response => {

        let data = response.data;
        this.handleSuccess(data)
      })
    },
    modifyPayPwd() {
      this.$http.get(`${this.HOST}/api.php?action=usercenter`, {
        params: this.postData
      }).then(response => {
        let data = response.data;
        this.handleSuccess(data)
      })
    },
    handleSuccess(e) {
      if(e.code == 200) {
          this.$dialog.toast({
            mes: `${this.tips[this.type]}密码修改成功`,
            timeout: 1500
          });
          this.handleClose();
          if (this.type == 'login') {
            this.$router.replace({path: 'login'});
          }
        } else {
          this.$dialog.toast({
            mes: e.data,
            timeout: 1500
          });
        }
    },
		clear() {
			this.oldPwd = '';
      this.newPwd = '';
			this.confirmPwd = '';
		},
		handleClose() {
			this.clear();
			this.$emit("modifyPwdClose", false);
		}
	}
}
</script>

<style scoped>
	.main {
		margin: 0 auto;
		padding: .25rem 0;
		width: 90%;
	}
	.title {
		font-size: .35rem;
		text-align: center;
		margin-bottom: .25rem;
	}
  .tips {
    color: #ef4f4f;
    font-size: 12px;
    margin-bottom: .25rem;
  }
	.btn-wrap {
		text-align: right;
	}
  .resetPaypwd {
    margin-top: .25rem;
    color: #666;
    text-align: right;
    font-size: .22rem;
  }
  .resetPaypwd a {
    color: #ef4f4f;
  }
</style>