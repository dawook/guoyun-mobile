<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='我的客服' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
      <span
        slot='right'
        class="app-text-success"
        v-if='!kefu_name'
        @click.stop='handleChooseKF'>完成</span>
    </yd-navbar>
    <v-loading v-if='isLoading'></v-loading>

    <template v-if='!kefu_name'>
      <yd-cell-group class='m-t-md' v-if='!isLoading'>
        <yd-cell-item
          type="radio"
          v-for='(item, index) in lists'
          :key='index'
          @click.native='chooseKFName = item.adminname'>
          <div slot='icon' class="img-wrap">
            <img class="img" :src="host + item.avatar" :alt="item.adminname">
          </div>

          <span slot="left">{{item.adminname}}</span>
          <input slot="right" type="radio" :value="item.user_id" v-model="picked"/>
        </yd-cell-item>
      </yd-cell-group>
    </template>

    <template v-if='!isLoading&&kefu_name'>
      <div class="cs-wrap">
        <div class="avatar">
          <img :src="host + myKF.avatar" :alt="myKF.adminname">
        </div>
        <div class="btn-wrap">
          <yd-button
            size="large"
            type="danger"
            @click.native='chat'>
            咨询我的专属客服 - {{myKF.adminname}}
          </yd-button>
        </div>
      </div>
    </template>


  </div>
</template>

<script>
import qs from 'qs'
import {getStore} from '@/utils/assist.js'
import vLoading from '@/components/loading'

export default {
  name: 'customerServerPage',
  components: {
    vLoading
  },
  watch: {
    lists: 'setMyKF'
  },
  data() {
    return {
      isLoading: true,
      lists: [],
      myKF: {},
      picked: '',
      user_id: '',
      token: '',
      kefu_name: '',
      host: '',
      chooseKFName: ''
    }
  },
  methods: {
    getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
      this.kefu_name = getStore("_user_kefuid");

    },
    load() {
      this.$http.get(`${this.HOST}/api.php?action=kefu`, {
        params: {
          user_id: this.user_id,
          token: this.token,
          kefu_name: this.kefu_name
        }
      }).then(response => {
        let e = response.data;
        console.log(e)
        this.lists = e.data;
        this.isLoading = false;
      });
    },
    setMyKF() {
      if (!this.kefu_name) return false;

      for (let val of this.lists) {
        if(val.mykefu_status == 1) {
          this.myKF = val;
          console.log(this.myKF)
          break;
        }
      }
    },
    handleChooseKF() {
      this.$dialog.confirm({
        title: '国运产权',
        mes: `是否选择【${this.chooseKFName}】为您的专属客服？`,
        opts: () => {
          this.submit();
        }
      });

    },
    submit() {
      this.$http.post(`${this.HOST}/api.php?action=usercenter`, qs.stringify({
        type: "mykefu",
        user_id: this.user_id,
        token: this.token,
        kefu_id: this.picked
      })).then(response => {
        let e = response.data;
        this.$dialog.toast({
          mes: e.data,
          timeout: 1500
        });

      })
    },
    chat() {
      window.open(`http://wpa.qq.com/msgrd?v=3&uin=${this.myKF.qq}&site=qq&menu=yes`)
    }
  },
  created() {
    this.host = this.HOST;
    this.getBasicInfo();
    this.load();
  }
}
</script>

<style scoped>
  .img-wrap {
    width: .8rem;
    overflow: hidden;
    margin-right: .125rem;
    text-align: center;
  }
  .img {
    display: inline-block;
    max-width: 100%;
    height: .8rem;
    border-radius: 50%;
  }
  .avatar {
    margin: 1rem auto 0;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 100px;
  }
  .avatar img {
    max-width: 100%;
  }
  .btn-wrap {
    margin: .2rem auto;
    width: 260px;
  }
</style>