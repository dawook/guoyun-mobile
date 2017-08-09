<template>
	<yd-flexbox class='navbar'>
		<div class="back-icon"  v-back></div>
	  <yd-flexbox-item class='navbar__title'>个人中心</yd-flexbox-item>
	  <div class="setting-icon" @click.stop='handleSet'>
			<yd-icon name="setting" size='.36rem'></yd-icon>
	  </div>
	</yd-flexbox>
</template>

<script>
export default {
	name: 'userNavbar',
	methods: {
		handleSet() {
			this.$emit('changeSet', true);
		}
	}
}
</script>

<style scoped>
	.back-icon,
	.setting-icon {
		width: 36px;
		text-align: center;
	}

	.navbar {
		position: relative;
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		color: #fff;
	}

</style>