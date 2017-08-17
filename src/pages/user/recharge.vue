<template>
	<div class="m-home m-home--fixed">
    <yd-navbar title='充值中心' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>
		
		<yd-tab class='tab-theme--1'>
      <yd-tab-panel label="支付宝">
        <v-card :borderRadius='.1'>
          <div class="main">
            <div class="types">
              <i class="dy-icon-alipay"></i>
              <span>支付宝</span>
            </div>

            <p class="tips">账号：<span class="app-text-main">zhouxun@aq108.net</span></p>
            <p class="tips">姓名：周迅</p>
            <div class="from scale-1px top">
              <input class="input" type="text" v-model="alipayMoney" placeholder="请输入金额">
              <input class="button" type="button" value="提交" @click.stop='sType = "alipay"'>
            </div>
            
            <p class="scale-1px top mesg m-t-md">支付宝转账成功后联系专属客服提供转账信息</p>
          </div>
        </v-card>
      </yd-tab-panel>

      <yd-tab-panel label="在线充值">
        <v-card :borderRadius='.1'>
          <div class="main">
            <div class="types">
              <i class="dy-icon-online"></i>
              <span>在线充值</span>
            </div>

            <p class="tips">充值渠道：<span class="app-text-main">汇潮支付</span></p>
            <div class="from">
              <input class="input" type="text" v-model="onlineMoney" placeholder="请输入充值金额">
              <input class="button" type="button" value="提交" @click.stop='sType = "online"'>
            </div>
          </div>
        </v-card>
      </yd-tab-panel>

      <yd-tab-panel label="线下充值">
        <v-card :borderRadius='.1'>
          <div class="main">
            <div class="types">
              <i class="dy-icon-bank_gd"></i>
              <span>线下充值</span>
            </div>

            <p class="bank-name">中国光大银行 (合肥长江西路支行)</p>
            <p class="tips">卡号：<span class="app-text-main">6214 9230 0285 4703</span></p>
            <p class="tips">姓名：周迅</p>
            <div class="from scale-1px top">
              <input class="input" type="text" v-model="lineMoney" placeholder="请输入金额">
              <input class="input" type="text" v-model="lineRemark" placeholder="备注">
              <input class="button" type="button" value="提交" @click.stop='sType = "line"'>
            </div>
            
            <p class="scale-1px top mesg m-t-md">线下转账成功后联系专属客服提供转账信息</p>
          </div>
        </v-card>
      </yd-tab-panel>
    </yd-tab>

  </div>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'
import vCard from '@/components/card'

export default {
	name: 'userRecharge',
  components: {
    vCard
  },
  data() {
    return {
      alipayMoney: '',
      onlineMoney: '',
      lineMoney: '',
      lineRemark: '',


      user_id: '',
      token: '',
      sType: '',
      sMoney: '',
      postData: {}
    }
  },
  watch: {
    sType: 'submit'
  },
  methods: {
    getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
    },
    clearAll() {
      this.alipayMoney = "";
      this.onlineMoney = "";
      this.lineMoney = "";
      this.lineRemark = "";
    },
    setData() {
      switch (this.sType) {
        case 'alipay': 
          this.postData = {
            type: "Recharge_new",
            types: "2",
            user_id: this.user_id,
            token: this.token,
            money: this.alipayMoney
          }
          this.sMoney = this.alipayMoney;
          break;
        case 'online': 
          this.postData = {
            type: "Recharge_new",
            types: "1",
            paynameecpss: "汇潮支付",
            paymentid: "28",
            user_id: this.user_id,
            token: this.token,
            money: this.onlineMoney,
            payment: "ecpss"
          }
          this.sMoney = this.onlineMoney;
          break;
        case 'line': 
          this.postData = {
            type: "Recharge_new",
            types: "3",
            payment2: "26",
            user_id: this.user_id,
            token: this.token,
            money: this.lineMoney,
            remark: this.lineRemark
          }
          this.sMoney = this.lineMoney;
          break;
        default: 
          {
            this.postData = {};
            this.sMoney = '';
          }
      }
    },
    valid() {
      this.setData();

      if (!this.sMoney.length) {
        this.$dialog.notify({
          mes: `金额不能为空`,
          timeout: 3000
        });
        return false;
      }

      var
        reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(this.sMoney)) {
        this.$dialog.notify({
          mes: `请输入正确的金额，例如：10000, 10000.25`,
          timeout: 3000
        });
        return false;
      }

      return true;
    },
    submit() {
      if (!this.valid()) return false;

      this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify(this.postData)).then(response => {
        let e = response.data;
        if (e.code == 200) {
          this.clearAll();
          this.$dialog.notify({
            mes: response.data.data,
            timeout: 3000
          });
        } else if (e.code == 201) {
          let 
            url = `${this.HOST}/api.php?action=usercenter&type=epay&user_id=${this.user_id}&token=${this.token}&url_black=` + encodeURIComponent(e.data);
          window.open(url)
        }
        
        
      })

    }
  },
  created() {
    this.getBasicInfo();
  }
}
</script>

<style scoped>
  .input {
    margin-top: .25rem;
    box-sizing: border-box;
    padding-left: .25rem;
    width: 100%;
    height: .76rem;
    border: 1px solid #eee;
    outline: none;
    border-radius: 3px;
    color: #ef4f4f;
  }
  .button {
    margin-top: .25rem;
    display: block;
    width: 100%;
    height: .76rem;
    line-height: .76rem;
    text-align: center;
    border: none;
    outline: none;
    background-color: #ef4f4f;
    color: #fff;
    border-radius: 3px;
  }
	.main {
    padding: .35rem;
    width: 100%;
  }
  .types {
    padding-bottom: .125rem;
    font-size: .4rem;
    color: #ef4f4f;
  }
  .types span {
    position: relative;
    top: -.05rem;
    font-size: .25rem;
    color: #999;
  }

  .bank-name {
    font-size: .28rem;
    color: #878787;
    padding-bottom: .125rem;
  }
  .tips {
    line-height: .5rem;
    font-size: .26rem;
    color: #878787;
  }
  .mesg {
    padding-top: .15rem;
    text-align: center;
    font-size: .2rem;
    color: #999;
  }

</style>