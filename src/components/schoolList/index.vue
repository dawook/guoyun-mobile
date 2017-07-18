<template>
	<div class="project">
		<div class="project__title">
			<i :class="iconCls" v-if='icon'></i>
			<span v-text='title'></span>
			<span class="tips" v-text='subTitle' v-if='subTitle'></span>
		</div>
		<ul class="project__list scale-1px top">
			<li class="project__list-item scale-1px bottom" 
				v-for='(item, index) in datas'
				:key='index'>
				<router-link :to="'/detail/school/' + item.school_nid">
					<p class="project-name">{{item.title || item.name}}</p>
					<list-content :item='item'></list-content>
				</router-link>
			</li>
		</ul>
		<router-link :to='link' class='project-more scale-1px top' v-if='link'>
			查看更多
		</router-link>
	</div>
</template>

<script>
import listContent from './content.vue'

export default {
	name: 'schoolList',
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
	}
}
</script>

<style scoped>
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


	.project__list {
		width: 100%;
	}
	.project__list-item {
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
		/*margin-left: .7rem;
		width: calc(100% - .7rem);*/
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