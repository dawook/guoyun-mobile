<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='我的客服' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
      <span slot='right' class="app-text-success">完成</span>
    </yd-navbar>
    <v-loading v-if='isLoading'></v-loading>

    <yd-cell-group class='m-t-md' v-if='!isLoading'>
      <yd-cell-item type="radio" v-for='(item, index) in lists' :key='index'>
        <div slot='icon' class="img-wrap">
          <img class="img" :src="host + item.avatar" :alt="item.adminname">
        </div>

        <span slot="left">{{item.adminname}}</span>
        <input slot="right" type="radio" :value="item.user_id" v-model="picked"/>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
import {getStore} from '@/utils/assist.js'
import vLoading from '@/components/loading'

export default {
  name: 'customerServerPage',
  components: {
    vLoading
  },
  data() {
    return {
      isLoading: true,
      lists: [],
      picked: '',
      user_id: '',
      token: '',
      kefu_name: '',
      host: ''
    }
  },
  methods: {
    getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
      this.kefu_name = getStore("_user_kefuid");

      console.log(this.kefu_name)
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
        this.lists = e.data;
        this.isLoading = false;
      });
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
</style>