<template>
  <div class="m-home">
    <yd-navbar :title='title'>
      <router-link to="/" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-infinitescroll :on-infinite="loadList" ref="infiniteScroll">

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">到底了，别扯了</span>

      <!-- 加载中提示 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>

  </div>
</template>

<script>
export default {
  name: 'projectPage',
  data() {
    return {
      type: '',
      ipage: 1,
      title: ''
    }
  },
  methods: {
    loadList() {

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

  }
}
</script>