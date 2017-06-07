<template>
	<v-card>
		<div :class='headCls' slot='header'>
			{{title}}
			<router-link to='/' :class='moreCls' v-if='path.length > 0'>
				<span>更多</span>
				<i class="icon-arrow-right"></i>
			</router-link>
		</div>

		<v-project-list slot='main'></v-project-list>
	</v-card>
</template>

<script>
import vCard from './card.vue'
import vProjectList from '@/components/project-list/'

export default {
	name: 'vProjectCard',
	props: {
		title: {
			type: String
		},
		path: {
			type: String,
			default: ''
		}
	},
	computed: {
		wrapCls() {
			return 'card'
		},
		headCls() {
			return 'card__header'
		},
		moreCls() {
			return `card__more`
		}
	},
	components: {
		vCard,
		vProjectList
	}
}
</script>