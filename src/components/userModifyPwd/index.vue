<template>
	<yd-popup v-model="bModifyPwd" position="center" width="90%">
    <div class="main">
    	<p class="title">修改{{type}}密码</p>
    	<yd-cell-group>
        <yd-cell-item>
          <yd-input
          	ref="oldPwd"
          	slot="right"
          	required
          	v-model='oldPwd'
          	regex="\d{6,16}"
          	placeholder="请输入原始密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <yd-input
          	ref="newPwd"
          	slot="right"
          	v-model='newPwd'
          	required
          	regex="\d{6,16}"
          	placeholder="请输入身份证号码"></yd-input>
        </yd-cell-item>
    	</yd-cell-group>

			<div class="btn-wrap">
				<yd-button type="danger" @click.native='submit'>马上修改</yd-button>
    		<yd-button type="hollow" @click.native='handleClose'>放弃认证</yd-button>
			</div>
    	
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
			default: '登录'
		} 
	},
	data() {
		return {
			oldPwd: '',
			newPwd: ''
		}
	},
	methods: {
		valid() {
			let
				$username = this.$refs.username,
				$idCard = this.$refs.idCard;

			if(!$username.valid) {
				this.$dialog.notify({
          mes: `真实姓名必须为2-4位中文`,
          timeout: 3000
        });
        return false;
			}

			if(!$idCard.valid) {
				this.$dialog.notify({
          mes: `身份证格式错误`,
          timeout: 3000
        });
        return false;
			}

			return true;
		},
		submit() {
			if(!this.valid()) return false;

			let
				_user_id = getStore("_user_id"),
				_token = getStore("_user_token");

			console.log(`${_user_id}:${_token}`)
			
			this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
    		type: "realname",
				user_id: _user_id,
				token: _token,
				realname: this.username,
				card_id: this.idNum
    	})).then(response => {
        let data = response.data;

        if(data.code == 200) {
        	setStore("_user_real_name", this.username);
        	this.$dialog.toast({
            mes: '实名认证成功',
            timeout: 1500
          });
        	this.handleClose();
        } else {
        	this.$dialog.toast({
            mes: data.data,
            timeout: 1500
          });
        }

      })
		},
		clear() {
			this.username = '';
			this.idNum = '';
		},
		handleClose() {
			this.clear();
			this.$emit("realNameClose", false);
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
		font-size: .25rem;
		text-align: center;
		margin-bottom: .25rem;
	}
	.btn-wrap {
		text-align: right;
	}
</style>