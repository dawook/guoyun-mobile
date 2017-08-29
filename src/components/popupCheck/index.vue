<template>
	<yd-popup v-model="bShow" position="bottom" height="50%">
	  <div class="top">
	  	<yd-button type="hollow" @click.native='handleCancel'>取消</yd-button>
	  	<yd-button type="primary" class='fr' @click.native='handleChoose'>选择</yd-button>
	  </div>
	  <div class="main">
	  	<slot></slot>
	  </div>
	</yd-popup>
</template>

<script>
export default {
	name: 'popupCheck',
	props: {
		bShow: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handleCancel() {
			this.$emit('handleCancel');
		},
		handleChoose() {
			this.$emit('handleChoose');
		}
	}
}
</script>

<style scoped>
	.top {
		box-sizing: border-box;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		padding: 0 .125rem;

		width: 100%;
		height: .8rem;
		line-height: .8rem;
		overflow: hidden;

		background-color: #ddd;
	}
	.fr {
		margin-top: .1rem;
		float: right;
	}
	.main {
		margin-top: .9rem;
	}
</style>