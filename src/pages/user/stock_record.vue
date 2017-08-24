<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='股权认购明细' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <yd-grids-group :rows="2" class='m-t-md stock-info'>
      <yd-grids-item>
        <span slot='icon' class="stock-num">{{total_account}}</span>
        <span slot="text" class="stock-tips">总认购金额(¥)</span>
      </yd-grids-item>
      <yd-grids-item>
        <span slot='icon' class="stock-num">{{total_scale}}%</span>
        <span slot="text" class="stock-tips">总占股比例</span>
      </yd-grids-item>
    </yd-grids-group>

    <v-loading v-if='isLoading'></v-loading>
    <v-nodata v-if='!isLoading&&!dataList.length'></v-nodata>


    <yd-infinitescroll :on-infinite="load" ref="infiniteScroll">

      <ul class="records-list" slot='list'>
        <li class="records-list__item" v-for='(item, index) in dataList' :key='index'>
          <div class="records-list__span--6">认购金额：¥ {{item.account}}</div>
          <div class="records-list__span--6">占股比例： {{item.sharescale}}%</div>

          <div class="records-list__span--6">购买方式：{{item.is_mobile == 0 ? 'PC端' : '移动端'}}</div>
          <div class="records-list__span--6">购买时间：
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
  name: 'stockRecordPage',
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
      totalPage: 0,
      total_account: 0,
      total_scale: 0
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
          type: "stock_list",
          user_id: this.user_id,
          token: this.token,
          p: this.ipage
        }
      }).then(response => {
        if (response.data.total_account) {
          this.total_account = response.data.total_account;
        }
        if (response.data.total_scale) {
          this.total_scale = response.data.total_scale;
        }

        let data = response.data.data;
        this.totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.dataList.push(data.list[i])
        }

        this.isLoading = false;

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
</style>