<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='提现明细' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <v-loading v-if='isLoading'></v-loading>
    <v-nodata v-if='!dataList.length'></v-nodata>

    <yd-infinitescroll :on-infinite="load" ref="infiniteScroll">

      <ul class="records-list" slot='list'>
        <li class="records-list__item" v-for='(item, index) in dataList' :key='index'>
          <div class="records-list__span--12">提现账号：{{item.account}}</div>

          <div class="records-list__span--6">提现银行：{{item.bankinfo_name}}</div>
          <div class="records-list__span--6">提现总额：¥ {{item.total}}</div>

          <div class="records-list__span--6">手续费：¥ {{item.fee}}</div>
          <div class="records-list__span--6">到账金额：¥ {{item.credited}}</div>
          <div class="records-list__span--6">状态：
            <span class="app-text-wran" v-if='item.status == 0'>审核中</span>
            <span class="app-text-success" v-if='item.status == 1'>成功</span>
            <span class="app-text-main" v-if='item.status == 2'>失败</span>
          </div>
          <div class="records-list__span--6">提现时间：
            {{new Date(parseInt(item.addtime) * 1000).toLocaleString().substr(0,10)}}
          </div>
        </li>
      </ul>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

      <!-- 加载中提示 -->
      <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>

  </div>
</template>

<script>
import {getStore} from '@/utils/assist.js'
import vLoading from '@/components/loading'
import vNodata from '@/components/noData'

export default {
  name: 'cashRecordPage',
  components: {
    vLoading,
    vNodata
  },
  data() {
    return {
      isLoading: true,
      dataList: [],
      user_id: '',
      token: '',
      ipage: 1,
      totalPage: 0
    }
  },
  methods: {
    getBasicInfo() {
      this.user_id = getStore("_user_id");
      this.token = getStore("_user_token");
    },
    load() {
      this.$http.get(`${this.HOST}/api.php?action=usercenter`, {
        params: {
          type: "GetCashList",
          user_id: this.user_id,
          token: this.token,
          p: this.ipage
        }
      }).then(response => {
        let data = response.data.data;
        this.isLoading = false;
        this.totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.dataList.push(data.list[i])
        }


        if (this.ipage >= this.totalPage && this.dataList.length) {
          /* 所有数据加载完毕 */
          this.$refs.infiniteScroll.$emit('ydui.infinitescroll.loadedDone');
          return;
        }

        /* 单次请求数据完毕 */
        this.$refs.infiniteScroll.$emit('ydui.infinitescroll.finishLoad');

        this.ipage++;
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

</style>