<template>
  <div class="m-home m-home--fixed">
    <yd-navbar title='常见问题' class='fixed'>
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <yd-infinitescroll :on-infinite="load" ref="infiniteScroll">

      <!-- <v-list :datas="listData" slot="list"></v-list> -->
      <yd-accordion slot='list'>
        <yd-accordion-item
          v-for = '(item, index) in dataList'
          :key='index'
          :title="index + 1 + '.' +item.name">
          <div class="content" v-html='item.contents'></div>
        </yd-accordion-item>
      </yd-accordion>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

      <!-- 加载中提示 -->
      <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>

  </div>
</template>

<script>
export default {
  name: 'help',
  data() {
    return {
      dataList: [],
      ipage: 1,
      totalPage: 0
    }
  },
  methods: {
    load() {
      this.$http.get(`${this.HOST}/api.php?action=faq`, {
        params: {
          p: this.ipage
        }
      }).then(response => {
        let data = response.data.data;

        this.totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.dataList.push(data.list[i])
        }
        console.log(this.dataList)

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
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
.content {
  padding: .25rem;
}
</style>