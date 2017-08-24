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
  </div>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'
import userBankCard from '@/components/userBankCard'
import vLoading from '@/components/loading'
import vNodata from '@/components/noData'

export default {
	name: 'bankPage',
	components: {
		userBankCard,
		vLoading,
		vNodata
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
            this.$dialog.toast({mes: '咔擦，此人太帅！'});
          }
        },
        {
          label: '添加待还信用卡',
          method: () => {
            this.$dialog.toast({mes: '看到了不该看到的东西！'});
          }
        }
			],
			user_id: '',
			token: '',
			bankList: []
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
        }
      })
		},
		handleChooseDefault(id) {
			alert(id)
		},
		handleDeleteBank(id) {
			alert(id)
		},
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