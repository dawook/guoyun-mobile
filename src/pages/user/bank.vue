<template>
	<div class="m-home m-home--fixed m-home--fixed-bottom">
    <yd-navbar title='银行卡管理' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
      <template v-if='bankList.length>1'>
      	<span
	      	slot='right'
	      	class="app-text-main"
	      	v-if='!isEdit'
	      	@click.stop='isEdit = true'>编辑</span>
	      <span
	      	slot='right'
	      	class="app-text-main"
	      	v-if='isEdit'
	      	@click.stop='isEdit = false'>取消</span>
      </template>
      
    </yd-navbar>
		
		<v-loading v-if='isLoading'></v-loading>

		<div class="bank-list" v-if='bankList.length'>
			<user-bank-card
				v-for='(item, index) in bankList'
				:key='index'
				:isEdit='isEdit'
				:lists='item'
				@handleDefault='handleChooseDefault'
				@handleDelete='handleDeleteBank'></user-bank-card>
		</div>
		<v-nodata v-if='!bankList.length && !isLoading'></v-nodata>
		

		<div class="add-btn" @click.stop='isActionsheet = true'>
			<i class="dy-icon-cross"></i>  添加银行卡
		</div>
		<yd-actionsheet
			:items="actionsheetList"
			v-model="isActionsheet"
			cancel="取消">
		</yd-actionsheet>

		<add-bank
			:isShow='bBank'
			@bankClose='bBank = false'
			@handleSuccess='handleSuccess'></add-bank>
		<add-credit
			:isShow='bCredit'
			@bankClose='bCredit = false'
			@handleSuccess='handleSuccessCredit'></add-credit>
  </div>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'
import userBankCard from '@/components/userBankCard'
import vLoading from '@/components/loading'
import vNodata from '@/components/noData'
import addBank from './add_bank.vue'
import addCredit from './add_credit.vue'

export default {
	name: 'bankPage',
	components: {
		userBankCard,
		vLoading,
		vNodata,
		addBank,
		addCredit
	},
	data() {
		return {
			isLoading: true,
			isEdit: false,
			isActionsheet: false,
			actionsheetList: [
				{
          label: '添加银行卡',
          method: () => {
          	if (this.validBankNumber()) {
							this.addBank();
          	}
          }
        },
        {
          label: '添加待还信用卡',
          method: () => {
            if (this.validBankNumber(1)) {
							this.addCredit();
          	}
          }
        }
			],
			user_id: '',
			token: '',
			bankList: [],
			chooseDefaultId: '',
			chooseDeleteId: '',

			bBank: false,
			bCredit: false
		}
	},
	methods: {
		getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
    },
		chechRealName() {
			let _user_real_name = getStore('_user_real_name');
			if (!_user_real_name) {
				this.$dialog.alert({
					mes: '检测到您还未实名认证！',
					callback: () => {
            this.$router.back();
          }
				});
				return false;
			}
		},
		loadBank() {
			this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
        type: "bank_list",
        user_id: this.user_id,
        token: this.token,
      })).then(response => {
        let e = response.data;
        this.isLoading = false;
        if (e.code == 200) {
        	this.bankList = e.data;
        	console.log(e.data)
        }
      })
		},
		validBankNumber(itype = 0) {
			let
				iCC = 0,
				iBC = 0;

			if (this.bankList.length < 3) return true;

			if (this.bankList.length == 6) {
				this.$dialog.toast({
					mes: '仅支持添加银行卡和信用卡各三张!!!',
	        timeout: 1500
				});
				return false;
			}

			for (let item of this.bankList) {
				if(item.type == 1) {
					iCC ++;
				}else if (item.type == 0) {
					iBC++;
				}
			}

			if (iCC >= 3 && itype == 1) {
				this.$dialog.toast({
					mes: '仅支持添加信用卡三张!!!',
	        timeout: 1500
				});
				return false;
			}

			if (iBC >= 3 && itype == 0) {
				this.$dialog.toast({
					mes: '仅支持添加银行卡三张!!!',
	        timeout: 1500
				});
				return false;
			}

			return true;
		},

		handleChooseDefault(id) {
			this.chooseDefaultId = id;

			this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
				type: "bank_default",
				user_id: this.user_id,
        token: this.token,
				id: id
			})).then(response => {
				let e = response.data;
				if (e.code == 200) {
					this.$dialog.toast({
						mes: '修改成功!',
	          timeout: 1500,
	          icon: 'success'
					});
					this.successDefault();


				} else {
					this.$dialog.toast({
						mes: e.data,
	          timeout: 1500
					})
				}
			})
		},
		successDefault() {
			let list = this.bankList,
				sid = this.chooseDefaultId;
			for (let i = 0, iL = list.length; i < iL; i++) {
				if (list[i].id == sid) {
					list[i].defaults = '1';
				}else {
					list[i].defaults = '0';
				}
			}
			this.bankList = list;
			this.isEdit = false;
		},
		handleDeleteBank(id) {
			this.chooseDeleteId = id;

			this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
				type: "bank_del",
				user_id: this.user_id,
        token: this.token,
				id: id
			})).then(response => {
				let e = response.data;
				if (e.code == 200) {
					this.$dialog.toast({
						mes: '删除成功!',
	          timeout: 1500
					})
					this.successDelet();
				} else {
					this.$dialog.toast({
						mes: e.data,
	          timeout: 1500
					})
				}
			})
		},
		successDelet() {
			let
				list = this.bankList,
				temp = [],
				sid = this.chooseDeleteId;

			for (let i = 0, iL = list.length; i < iL; i++) {
				if (list[i].id != sid) {
					temp.push(list[i]);
				}
			}

			this.bankList = temp;
			this.isEdit = false;
		},
		addBank() {
			this.bBank = true;
		},
		addCredit() {
			this.bCredit = true;
		},
		handleSuccess(val) {
			this.bBank = false;
			this.bankList.unshift(val)
		},
		handleSuccessCredit(val) {
			this.bCredit = false;
			this.bankList.unshift(val)
		}
	},
	created() {
		this.chechRealName();
		this.getBasicInfo();
		this.loadBank()
	}
}
</script>

<style scoped>
	.bank-list {
		margin-top: .25rem;
	}
	.add-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: .85rem;
		line-height: .85rem;
		text-align: center;
		background-color: #fff;
		color: #ef4f4f;
		font-size: .28rem;
	}
</style>