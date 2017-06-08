<template>
	<ul :class='wrapCls'>
		<v-touch
			v-if='isLoad'
			tag="li"
			:class='itemCls'
			v-for='(item, index) in datas'
			:key='index'
			v-on:tap='open(item.id)'>

			<p :class='titleCls' v-text='item.title'></p>

			<div :class='detailCls'>
				<div :class='detailItemCls'>
					<span class='profit' v-text='item.profit'></span>
					<p class='tips'>预估年化(%)</p>
				</div>
				<div :class='detailItemCls'>
					<p class='info'>
						<template v-if='item.period < 13'>
							<span v-text='item.period'></span>个月
						</template>
						<template v-else>
							<span v-text='item.period'></span>天
						</template>
						| 
						<span :class='["status", "status--" + item.status]'>
							{{statusTxt[item.status]}}
						</span>
					</p>
					<p class='tips'>项目金额{{item.money}}万元</p>
				</div>
			</div>

		</v-touch>
		<v-touch 
			v-else
			tag='li'
			:class='failCls'
			v-on:tap='reload'>
			<i class="icon-refresh"></i>
			<p>加载失败，轻触重新加载...</p>
		</v-touch>
	</ul>
</template>

<script>
import {encrypt} from '@/utils/assist.js'
export default {
	name: 'vProjectList',
	props: {
		datas: {
			type: Array
		},
		isLoad: {
			type: Boolean
		}
	},
	data() {
		return {
			statusTxt: ['待发售','可加入','收益中','已结算'],
			pid: null
		}
	},
	
	computed: {
		wrapCls() {
			return `project-list`
		},
		itemCls() {
			return [`project-list__item`,`b-t-1px`]
		},
		titleCls() {
			return `project-list__title`
		},
		detailCls() {
			return `project-list__detail`
		},
		detailItemCls() {
			return `project-list__detail-item`
		},
		failCls() {
			return `project-list__fail`
		}
	},
	methods: {
		open(id) {
			this.$router.push({
				path: encrypt('detail'),
				query: {
					[encrypt('pid')]: encrypt(id)
				}
			});
		},

		reload() {
			this.$emit('reload');
		}
	}
}
</script>