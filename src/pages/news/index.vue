<template>
	<div class="m-home">
    <yd-navbar title='国运速报' >
      <yd-navbar-back-icon v-back slot="left"></yd-navbar-back-icon>
    </yd-navbar>
		
		<yd-tab class="tab">
      <yd-tab-panel label="全部">土地是以它的肥沃和收获</yd-tab-panel>
      <yd-tab-panel label="平台公告">我需要三件东西：爱情友谊和图书。然而这三者之间何其相</yd-tab-panel>
      <yd-tab-panel label="处置公告">真理惟一可靠的标准就是永远自相符合。</yd-tab-panel>
      <yd-tab-panel label="发售公告">真理惟一可靠的标准就是永远自相符合。</yd-tab-panel>
    </yd-tab>

    <yd-infinitescroll :on-infinite="load" ref="infiniteScroll">
      

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

      <!-- 加载中提示 -->
      <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>

  </div>
</template>

<script>
export default {
	name: 'newsPage',
	methods: {
		load() {}
	}
}
</script>

<style>
	.tab-nav-item, .tab-nav-item.tab-active, .tab-nav-item.tab-active:active {
		background-color: transparent !important;
	}
	.tab-nav-item.tab-active:before {
		display: none;
	}
	.tab-nav:after {
		display: none;
	}
	.tab-nav-item {
		line-height: 1rem;
	}
</style>