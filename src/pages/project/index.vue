<template>
  <div class="m-home m-home--fixed">
    <yd-navbar :title='title' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    
    
    <yd-infinitescroll :on-infinite="load" ref="infiniteScroll">
      <v-loading slot="list" v-if='isLoad'></v-loading>
      <v-list :datas="listData" slot="list" v-if='!isLoad'></v-list>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

      <!-- 加载中提示 -->
      <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>

  </div>
</template>

<script>
import vList from '@/components/projectList'
import vLoading from '@/components/loading'

export default {
  name: 'projectPage',
  components: {
    vList,
    vLoading
  },
  data() {
    return {
      isLoad: true,
      type: '',
      ipage: 1,
      title: '',
      totalPage: 0,
      listData: []
    }
  },
  methods: {
    load() {
      this.$http.get(`${this.HOST}/api.php?action=invest`, {
        params: {
          type: this.type,
          p: this.ipage
        }
      }).then(response => {
        let data = response.data.data;
        this.totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.listData.push(data.list[i])
        }

        this.isLoad = false;

        if (this.ipage >= this.totalPage) {
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
    let mapType = {
      "house": {
        id: 1,
        title: '不良资产'
      },
      "ppp": {
        id: 2,
        title: '政府PPP项目'
      },
      "film": {
        id: 3,
        title: '影视文化'
      },
      "pvp": {
        id: 4,
        title: '光伏惠民'
      },
    };

    let key = this.$route.params.type;


    this.type = mapType[key].id;
    this.title = mapType[key].title;

  },

  mounted() {
    this.load();
  }
}
</script>
