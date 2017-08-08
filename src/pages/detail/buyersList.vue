<template>
	<yd-popup v-model="isShow" position="right" width="100%">
		<yd-navbar title='购买人数' class='navbar'>
      <yd-navbar-back-icon @click.native='handleClose' slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="container">
      <yd-infinitescroll :on-infinite="loadBuyers" ref="infiniteScroll">
        <table class="table" slot='list' border="0" cellspacing="0" cellpadding="0">
        	<thead>
        		<tr>
        			<th>时间</th>
        			<th>用户</th>
        			<th>投资金额(元)</th>
        		</tr>
        	</thead>
        	<tbody>
        		<tr v-for="(item, index) in aList">
        			<td>{{item.time_data}}</td>
        			<td>{{item.phone}}</td>
        			<td>{{item.school_price ? item.school_price : item.account_format}}</td>
        		</tr>
        	</tbody>
        </table>

        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip" class='dont-tips'>到底了，别扯了</span>

        <!-- 加载中提示 -->
        <img slot="loadingTip" class="loading" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
      </yd-infinitescroll>
    </div>
    
  </yd-popup>
</template>

<script>
export default {
	name: 'buyersList',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		nid: {
			type: [String, Number]
		}
	},
	data() {
		return {
			isLoad: false,
			aList: [],
			totalPage: 0,
			ipage: 1
		}
	},
	methods: {
		handleClose() {
			this.$emit('buyerClose', false)
		},

		loadBuyers() {
			this.$http.get(`${this.HOST}/api.php?action=getrecords`, {
        params: {
          id: this.nid,
          p: this.ipage
        }
      }).then(response => {
        let data = response.data.data;

        this.totalPage = data.total_page;

        for (let i = 0, iL = data.list.length; i < iL; i++) {
          this.aList.push(data.list[i])
        }

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
		this.loadBuyers();
	}
}
</script>

<style scoped>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.container {
		margin-top: 1rem;
	}

	.table {
		margin: 0 auto;
		width: 100%;
		text-align: center;
	}
	.table th {
		height: 36px;
		line-height: 36px;
		border-bottom: 2px solid #ccc;
	}
	table td {
		height: 40px;
		line-height: 40px;
	}
	.table tbody tr:nth-child(odd) td {
		background-color: #f1f1f1;
	}

</style>