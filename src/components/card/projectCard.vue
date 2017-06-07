<template>
	<div :class='wrapCls'>
		<div :class='headCls'>
			{{title}}
			<router-link to='/' :class='moreCls'>
				<span>更多</span> <i class="icon-arrow-right"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vProjectCard',
		props: {
			title: {
				type: String
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
		}
	}
</script>