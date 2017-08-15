<template>
	<div class="crad" :style='setStyle'>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'vCard',
	props: {
		borderRadius: {
			type: Number,
			default: 0
		},
		mt: {
			type: Number,
			default: 0
		},
		mb: {
			type: Number,
			default: 0
		},
		isRem: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		setStyle() {
			let
				aStyle = [],
				unit = this.isRem ? 'rem' : 'px',
				styleBR = {
					borderRadius: `${this.borderRadius}${unit}`
				},
				styleMT = {
					marginTop: `${this.mt}${unit}`
				},
				styleMB = {
					marginBottom: `${this.mb}${unit}`
				};
				if (this.borderRadius) aStyle.push(styleBR);
				if (this.mt) aStyle.push(styleMT);
				if (this.mb) aStyle.push(styleMB);

			return aStyle;
		}
	}
}
</script>

<style scoped>
	.crad {
		box-sizing: border-box;
		position: relative;
		margin-right: auto;
		margin-left: auto;
		padding: 0;
		width: 92%;
		background-color: #fff;
		overflow: hidden;
	}
</style>