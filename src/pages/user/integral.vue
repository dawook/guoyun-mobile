<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='我的积分' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <yd-grids-group :rows="3" class='m-t-md stock-info'>
      <yd-grids-item>
        <span slot='icon' class="stock-num">{{bbsScore}}</span>
        <span slot="text" class="stock-tips">论坛积分</span>
      </yd-grids-item>
      <yd-grids-item>
        <span slot='icon' class="stock-num">{{rewardScore}}</span>
        <span slot="text" class="stock-tips">奖励积分</span>
      </yd-grids-item>
      <yd-grids-item>
        <span slot='icon' class="stock-num">{{totalScore}}</span>
        <span slot="text" class="stock-tips">总积分</span>
      </yd-grids-item>
    </yd-grids-group>

    <yd-cell-group class='m-t-md'>
      <yd-cell-item>
        <yd-input slot="right" required v-model="score" placeholder="请填写兑换积分"></yd-input>
      </yd-cell-item>
    </yd-cell-group>

    <p class="money-show">实际金额：<span class="app-text-main">¥ {{score / 100}}</span></p>

    <yd-button-group>
      <yd-button
        size="large"
        :type="btnType"
        v-text='btnTxt'
        @click.native='submit'></yd-button>
    </yd-button-group>

    <p class="tips">详细规则：100积分=1元;满10000积分方可进行兑换!</p>

  </div>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'

export default {
  name: 'integralPage',
  data() {
    return {
      user_id: '',
      token: '',
      bbsScore: 0,
      rewardScore: 0,
      totalScore: 0,
      score: "",
      btnTxt: '确认兑换',
      btnType: 'danger'
    }
  },
  watch: {
    totalScore: 'setBtn'
  },
  methods: {
    getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
    },
    load() {
      this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
        type: "getcreditinfo",
        user_id: this.user_id,
        token: this.token,
      })).then(response => {
        let e = response.data.data;

        this.bbsScore = e.bbscredit;
        this.rewardScore = e.credit;
        this.totalScore = e.total;
      })
    },
    setBtn() {
      if (this.totalScore < 10000) {
        this.btnTxt = '总积分少于10000，不予兑换';
        this.btnType = 'disabled';
      } else {
        this.btnTxt = '确认兑换';
        this.btnType = 'danger';
      }
    },
    submit() {
      if (this.totalScore < 10000) return false;

      var reg = /^[1-9]\d{4,9}/;
      if(!reg.test(this.score)) {
        this.$dialog.notify({
          mes: `兑换积分不能少于10000`,
          timeout: 3000
        });
        return false;
      }

      this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
        type: "exchangecredit",
        credit1: this.score,
        user_id: this.user_id,
        token: this.token
      })).then(response => {
        let data = response.data;

        this.$dialog.toast({
          mes: data.data,
          timeout: 1500
        });

        if (data.code == 200) {
          this.load();
        }
      })

    }
  },
  created() {
    this.getBasicInfo();
    this.load();
  }
}
</script>

<style scoped>
  .stock-info {
    color: #ef4f4f;
  }
  .stock-num {
    font-size: .35rem;
  }
  .stock-tips {
    color: #999;
    font-size: .2rem;
  }
  .tips {
    margin-top: .75rem;
    font-size: .225rem;
    color: #999;
    text-align: center;
  }
  .money-show {
    padding: 0 .25rem;
    text-align: right;
  }
</style>