<template>
	<v-page :isShow = 'isShow' title='添加信用卡' @pageClose='handleClose'>
		<div slot='main'>	
			<yd-cell-group>
	      <yd-cell-item>
	        <yd-input
	          slot="right"
	          ref='bankNum'
	          v-model='bankNum'
	          required
	          :showSuccessIcon="false"
	          :showErrorIcon="false"
	          regex="bankcard"
	          placeholder="请输入信用卡号"></yd-input>
	      </yd-cell-item>
	      <yd-cell-item>
	        <yd-input
	          slot="right"
	          ref='bankName'
	          v-model='bankName'
	          required
	          readonly
	          :showSuccessIcon="false"
	          :showErrorIcon="false"
	          @click.native.stop='bCheck = true'
	          placeholder="请选择银行名称"></yd-input>
	      </yd-cell-item>
	   	</yd-cell-group>
			<div class="btn-wrap">
				<yd-button size="large" type="danger" @click.native='submit'>确认添加</yd-button>
			</div>

	  </div>

   	<div slot='other'>
	    <popup-check :bShow='bCheck' @handleChoose='handleChoose' @handleCancel='handleCancel'>
	    	<yd-cell-group>
	        <yd-cell-item type="radio" v-for='(item, index) in bankList' :key='index'>
	          <span slot="left">{{item.name}}</span>
	          <input slot="right" type="radio" :value="item.name + '|' + item.value" v-model="picked"/>
	        </yd-cell-item>
	    	</yd-cell-group>
	    </popup-check>

   	</div>
	</v-page>
</template>

<script>
import qs from 'qs'
import {setStore, getStore} from '@/utils/assist.js'
import vPage from '@/components/pages'
import popupCheck from '@/components/popupCheck'

export default {
	name: 'addBank',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	components: {
		vPage,
		popupCheck
	},
	data() {
		return {
			bankNum: '',
			bankName: '',
			bankId: '',

			user_id: '',
			token: '',

			picked: '',
			bCheck: false,
			bankList: []
		}
	},
	methods: {
		getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
    },
		handleClose() {
			this.$emit('bankClose', false)
		},
		getBankName() {
			this.$http.get(`${this.HOST}/api.php?action=usercenter`, {
				params: {
          type: "bankname_list",
          user_id: this.user_id,
          token: this.token
        }
			}).then(response => {
				this.bankList = response.data.data;
			});
		},
		handleCancel() {
			this.bCheck = false;
		},
		handleChoose() {
			this.bCheck = false;
			this.bankName = this.picked.split('|')[0];
			this.bankId = this.picked.split('|')[1]
		},

    valid() {
    	let	
    		$bankNum = this.$refs.bankNum;

    	if(!$bankNum.valid) {
				this.$dialog.notify({
          mes: `银行卡号码${$bankNum.errorMsg}`,
          timeout: 1500
        });
        return false;
			}

			if(!this.bankName) {
				this.$dialog.notify({
          mes: `银行卡名称不能为空`,
          timeout: 1500
        });
        return false;
			}

			return true;
    },
    submit() {
    	if(!this.valid()) return false;

    	this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
				type: "bank_new",
				user_id: this.user_id,
				token: this.token,
				account: this.bankNum,
				bank: this.bankId,
				types: "1"
    	})).then(response => {
        let data = response.data;

        if(data.code == 200) {
        	this.$dialog.toast({
	          mes: `信用卡添加成功`,
	          timeout: 1500,
	          icon: 'success'
	        });
        	this.successFn();
        } else {
        	this.$dialog.toast({
            mes: data.data,
            timeout: 1500
          });
        }

      })
    },
    successFn() {
    	let bankNum = this.bankNum.split('');
    	for (let i = 7; i < 10; i++) {
    		bankNum[i] = '*'
    	};

    	let list = {
    		bank_name: this.bankName,
    		bank: this.bankId,
    		type: '1',
    		account: bankNum.join(''),
    		defaults: '0'
    	}

    	this.$emit('handleSuccess', list);
    }
	},
	created() {
		this.getBasicInfo();
		this.getBankName();
	}
}

</script>

<style scoped>
.btn-wrap {
	margin: 0 auto;
	width: 90%;
}
</style>