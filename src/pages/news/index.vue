<template>
	<div class="m-home">
    <yd-navbar title='国运速报' >
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>

    <yd-tab class='tab-without-background' :change="change">
        <yd-tab-panel label="全部">
          <yd-infinitescroll :on-infinite="loadAll" ref="infiniteScrollAll">

            <yd-list theme="4" class="without-img" slot='list'>
              <yd-list-item
                v-for="(item, index) in all_newsData"
                :key="index"
                type="link"
                :href='"/notice/" + item.id'>
                <span slot="title" class="news__title">{{item.name}}</span>
                <yd-list-other slot="other">
                  <div>
                    <yd-badge type="hollow">{{item.type_name}}</yd-badge>
                  </div>
                  <div v-text='item.apptime'></div>
                </yd-list-other>
              </yd-list-item>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

            <!-- 加载中提示 -->
            <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
          </yd-infinitescroll>
        </yd-tab-panel>
        <yd-tab-panel label="平台公告">
          <yd-infinitescroll :on-infinite="loadPlatform" ref="infiniteScrollPlatform">

            <yd-list theme="4" class="without-img" slot='list'>
              <yd-list-item
                v-for="(item, index) in platform_newsData"
                :key="index"
                type="link"
                :href='"/notice/" + item.id'>
                <span slot="title" class="news__title">{{item.name}}</span>
                <yd-list-other slot="other">
                  <div>
                    <yd-badge type="hollow">{{item.type_name}}</yd-badge>
                  </div>
                  <div v-text='item.apptime'></div>
                </yd-list-other>
              </yd-list-item>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

            <!-- 加载中提示 -->
            <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
          </yd-infinitescroll>
        </yd-tab-panel>
        </yd-tab-panel>
        <yd-tab-panel label="处置公告">
          <yd-infinitescroll :on-infinite="loadDisposal" ref="infiniteScrollDisposal">

            <yd-list theme="4" class="without-img" slot='list'>
              <yd-list-item
                v-for="(item, index) in disposal_newsData"
                :key="index"
                type="link"
                :href='"/notice/" + item.id'>
                <span slot="title" class="news__title">{{item.name}}</span>
                <yd-list-other slot="other">
                  <div>
                    <yd-badge type="hollow">{{item.type_name}}</yd-badge>
                  </div>
                  <div v-text='item.apptime'></div>
                </yd-list-other>
              </yd-list-item>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

            <!-- 加载中提示 -->
            <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
          </yd-infinitescroll>
        </yd-tab-panel>
        </yd-tab-panel>
        <yd-tab-panel label="发售公告">
          <yd-infinitescroll :on-infinite="loadSale" ref="infiniteScrollSale">
            <yd-list theme="4" class="without-img" slot='list'>
              <yd-list-item
                v-for="(item, index) in sale_newsData"
                :key="index"
                type="link"
                :href='"/notice/" + item.id'>
                <span slot="title" class="news__title">{{item.name}}</span>
                <yd-list-other slot="other">
                  <div>
                    <yd-badge type="hollow">{{item.type_name}}</yd-badge>
                  </div>
                  <div v-text='item.apptime'></div>
                </yd-list-other>
              </yd-list-item>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

            <!-- 加载中提示 -->
            <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
          </yd-infinitescroll>
        </yd-tab-panel>
        </yd-tab-panel>
    </yd-tab>
  </div>
</template>

<script>
export default {
	name: 'newsPage',
  data() {
    return {
      isLoadAll: false,
      isLoadPlatform: false,
      isLoadSale: false,
      isLoadDisposal: false,

      all_newsData: [],
      all_ipage: 1,
      all_totalPage: 0,
      all_type: 1,

      platform_newsData: [],
      platform_ipage: 1,
      platform_totalPage: 0,
      platform_type: 49,

      disposal_newsData: [],
      disposal_ipage: 1,
      disposal_totalPage: 0,
      disposal_type: 51,

      sale_newsData: [],
      sale_ipage: 1,
      sale_totalPage: 0,
      sale_type: 50
    }
  },
  watch: {
    isLoadAll: 'loadAll',
    isLoadPlatform() {
      if (this.isLoadPlatform) {
        this.loadPlatform();
      }
    },
    isLoadDisposal() {
      if (this.isLoadDisposal) {
        this.loadDisposal();
      }
    },
    isLoadSale() {
      if (this.isLoadSale) {
        this.loadSale();
      }
    }
  },
  methods: {
    change(label) {
      switch (label) {
        case '平台公告' : this.isLoadPlatform = true; break;
        case '处置公告' : this.isLoadDisposal = true; break;
        case '发售公告' : this.isLoadSale = true; break;
      }
    },
    loadAll() {
      this.$http.get(`${this.HOST}/api.php?action=activity`, {
        params: {
          types: this.all_type,
          p: this.all_ipage
        }
      }).then(response => {
        let data = response.data.data;

        this.all_totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.all_newsData.push(data.list[i])
        }

        if (this.all_ipage >= this.all_totalPage) {
          /* 所有数据加载完毕 */
          this.$refs.infiniteScrollAll.$emit('ydui.infinitescroll.loadedDone');
          return;
        }

        /* 单次请求数据完毕 */
        this.$refs.infiniteScrollAll.$emit('ydui.infinitescroll.finishLoad');

        this.all_ipage++;

      })
    },
    loadPlatform() {
      this.$http.get(`${this.HOST}/api.php?action=activity`, {
        params: {
          types: this.platform_type,
          p: this.platform_ipage
        }
      }).then(response => {
        let data = response.data.data;

        this.platform_totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.platform_newsData.push(data.list[i])
        }

        if (this.platform_ipage >= this.platform_totalPage) {
          /* 所有数据加载完毕 */
          this.$refs.infiniteScrollPlatform.$emit('ydui.infinitescroll.loadedDone');
          return;
        }

        /* 单次请求数据完毕 */
        this.$refs.infiniteScrollPlatform.$emit('ydui.infinitescroll.finishLoad');

        this.platform_ipage++;

      })
    },
    loadDisposal() {
      this.$http.get(`${this.HOST}/api.php?action=activity`, {
        params: {
          types: this.disposal_type,
          p: this.disposal_ipage
        }
      }).then(response => {
        let data = response.data.data;

        this.disposal_totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.disposal_newsData.push(data.list[i])
        }

        if (this.disposal_ipage >= this.disposal_totalPage) {
          /* 所有数据加载完毕 */
          this.$refs.infiniteScrollDisposal.$emit('ydui.infinitescroll.loadedDone');
          return;
        }

        /* 单次请求数据完毕 */
        this.$refs.infiniteScrollDisposal.$emit('ydui.infinitescroll.finishLoad');

        this.disposal_ipage++;

      })
    },
    loadSale() {
      this.$http.get(`${this.HOST}/api.php?action=activity`, {
        params: {
          types: this.sale_type,
          p: this.sale_ipage
        }
      }).then(response => {
        let data = response.data.data;

        this.sale_totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.sale_newsData.push(data.list[i])
        }

        if (this.sale_ipage >= this.sale_totalPage) {
          /* 所有数据加载完毕 */
          this.$refs.infiniteScrollSale.$emit('ydui.infinitescroll.loadedDone');
          return;
        }

        /* 单次请求数据完毕 */
        this.$refs.infiniteScrollSale.$emit('ydui.infinitescroll.finishLoad');

        this.sale_ipage++;

      })
    }
  },
  mounted() {
    this.isLoadAll = true;
  }
}
</script>

<style scoped>
  .news__title {
    display: inline-block;
    padding: .125rem 0 .2rem;
  }
</style>