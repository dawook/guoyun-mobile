<template>
	<div class="crad">
		<solt></solt>
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
		padding: .25rem 0;
		width: 92%;
		background-color: #fff;
		overflow: hidden;
	}
</style>