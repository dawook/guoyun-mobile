<template>
	<yd-popup v-model="isShow" position="right" width="100%" class='popup--gray'>
		<yd-navbar :title='title' class='navbar'>
      <yd-navbar-back-icon @click.native='handleClose' slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="container"><slot name="main"></slot></div>
		<div class="other"><slot name="other"></slot></div>
  </yd-popup>
</template>

<script>
export default {
	name: 'vPage',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		}
	},
	methods: {
		handleClose() {
			this.$emit('pageClose', false)
		}
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
		margin-top: 1.15rem;
	}
</style>