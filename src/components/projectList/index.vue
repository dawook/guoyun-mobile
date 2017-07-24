<template>
	<div class="project">
		<div class="project__title" v-if='title'>
			<i :class="iconCls" v-if='icon'></i>
			<span v-text='title'></span>
			<span class="tips" v-text='subTitle' v-if='subTitle'></span>
		</div>
		<ul class="project__list line-1px--top">
			<li class="project__list-item line-1px"
				v-for='(item, index) in datas'
				:key='index'>
				<router-link :to="'/detail/invest/' + item.borrow_nid">
					<p class="project-name">
						<span class="badge">{{item.borrow_period > 12 ? item.borrow_period + "天" : item.borrow_period + "个月"}}</span>
						{{item.title || item.name}}
					</p>
					<list-content :item='item'></list-content>
				</router-link>
			</li>
		</ul>
		<router-link :to='link' class='project-more line-1px--top' v-if='link'>
			查看更多
		</router-link>
	</div>
</template>

<script>
import listContent from './content.vue'

export default {
	name: 'vList',
	props: {
		title: {
			type: String
		},
		icon: {
			type: String
		},
		subTitle: {
			type: String
		},
		datas: {
			type: Array
		},
		link: {
			type: String
		},
		isSchool: {
			type: Boolean,
			default: false
		}
	},
	components: {
		listContent
	},
	computed: {
		iconCls() {
			return `icon dy-icon-${this.icon}`;
		}
	},
	created() {

	}
}
</script>

<style scoped>
	.badge {
		padding: 1px 2px 0;
		margin-left: 1px;
		border: 1px solid #3399d5;
		color: #3399d5;
		background-color: transparent;
	}
	.project {
		margin: .2rem 0;
		width: 100%;
		overflow: hidden;
		background-color: #fff;
	}
	.project__title {
		padding: 0 .25rem;
		width: 100%;
		height: .85rem;
		line-height: .85rem;
		color: #454545;
		font-size: .35rem;
		font-weight: normal;
	}
	.project__title .icon {
		position: relative;
		top: 1px;
	}
	.project__title .tips {
		padding-left: 5px;
		font-size: 12px;
		color: #ccc;
	}

	.line-1px,
	.line-1px--top {
		position: relative;
	}
	.line-1px--top:after,
	.line-1px:after {
		position: absolute;
		content: "";
		right: 0;
		left: 0;
		height: 1px;
		background-color: #ccc;
		transform: scaleY(.5);
	}
	.line-1px:after {
		bottom: 0;
	}
	.line-1px--top:after {
		top: 0;
	}

	.project__list {
		position: relative;
		width: 100%;
	}

	.project__list-item {
		position: relative;
		margin-left: .7rem;
		padding-bottom: .25rem;
	}
	.project__list-item:last-child:after {
		display: none;
	}
	.project-name {
		padding: .25rem 0;
		font-size: .225rem;
		color: #454545;
	}
	.project-more {
		display: inline-block;
		width: 100%;
		padding: .25rem 0;
		text-align: center;
		color: #eee;
		font-size: .25rem;
		font-family: 'dywer';
	}
	.project-more:after {
		left: .7rem;
	}

</style>