<template>
  <yd-flexbox class='app-text-center nav-box'>
    <yd-flexbox-item>
      <div class="navbar__item">
        <span v-text='total'></span>
        <p class="tips">账户总额(￥)</p>
      </div>
    </yd-flexbox-item>
    <yd-flexbox-item>
      <div class="navbar__item">
        <span v-text='balance'></span>
        <p class="tips">可用余额(￥)</p>
      </div>
    </yd-flexbox-item>
    <yd-flexbox-item>
      <div class="navbar__item">
        <span v-text='netMoney'></span>
        <p class="tips">净赚收益(￥)</p>
      </div>
    </yd-flexbox-item>
    <div class="sp scale-1px left">
      <div class="navbar__item" @click.stop='linkTo'>
        <i class="arrow dy-icon-arrow-right"></i>
        <i class="dy-icon-purse icon app-text-main"></i>
        <p class="text-main">去充值</p>
      </div>
    </div>
  </yd-flexbox>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'

export default {
  name: 'userAccount',
  data() {
    return {
      total: '0.00',
      balance: '0.00',
      netMoney: '0.00'
    }
  },
  methods: {
    getMoney() {
      let 
        user_id = getStore("_user_id"),
        token = getStore("_user_token");

      this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
        type: "gettotal",
        user_id: user_id,
        token: token
      })).then(response => {
        let 
          e = response.data,
          data = e.data;
        if(e.code == 200) {
          this.total = data.total;
          this.balance = data.balance;
          this.netMoney = data.repay_account_interest;
        } else {
          this.$dialog.toast({
            mes: e.data,
            timeout: 1500
          });
          this.$router.replace({path: 'login'});
        }

      })
    },
    linkTo() {
      this.$router.push({path: '/user/recharge'})
    }
  },
  created() {
    this.getMoney();
  }
}
</script>

<style scoped>
  .nav-box {
    margin-bottom: .35rem;
    background-color: #fff;
  }
  .navbar__item {
    position: relative;
    padding: .25rem 0;
    background-color: #fff;
    overflow: hidden;
  }
  .arrow {
    position: absolute;
    top: 50%;
    left: -8px;
    color: #eee;
    margin-top: -8px;
    background-color: #fff;
    font-size: 22px;
  }
  .arrow:after {
    position: absolute;
    top: 7px;
    left: 8px;
    content: "";
    z-index: 10;
    width: 1px;
    height: 6px;
    background-color: #fff;
  }
  .tips {
    margin-top: .1rem;
    font-size: .225rem;
    color: #999;
  }
  .text-main {
    font-size: .225rem;
    color: #ef4f4f;
  }
  .sp {
    width: 80px;
  }
  .icon {
    font-size: .4rem;
  }
</style>