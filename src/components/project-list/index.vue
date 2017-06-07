<template>
	<ul :class='wrapCls'>
		<v-touch tag="li" :class='itemCls'>
			<p :class='titleCls'>
				<span :class='badgeCls'>150天</span>
				国运产权-GY-001
				<i class='icon-fire'></i>
			</p>

			<div :class='detailCls'>
				
			</div>
			
		</v-touch>
	</ul>
</template>

<script>
export default {
	name: 'vProjectList',
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
		badgeCls() {
			return `project-list__badge`
		},
		detailCls() {
			return `project-list__detai;`
		}
	}
}
</script>