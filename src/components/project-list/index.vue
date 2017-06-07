<template>
	<ul :class='wrapCls'>
		<v-touch tag="li" :class='itemCls'>
			<p :class='titleCls'>
				国运产权-GY-001
			</p>

			<div :class='detailCls'>
				<div :class='detailItemCls'>
					<span class='profit'>35.0</span>
					<p class='tips'>预估年化(%)</p>
				</div>
				<div :class='detailItemCls'>
					1个月|可加入
					<p class='tips'>项目金额520万元</p>
				</div>
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
		detailCls() {
			return `project-list__detail`
		},
		detailItemCls() {
			return `project-list__detail-item`
		}
	}
}
</script>