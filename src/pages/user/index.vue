<template>
	<div class="m-home">
		<div class="header">
	    <user-navbar></user-navbar>
			<user-avatar :imgSrc='avatarImg' :userName='userName'></user-avatar>
		</div>
		


	</div>
</template>

<script>
import userNavbar from '@/components/userNavbar'
import userAvatar from '@/components/userAvatar'

export default {
	name: 'user',
	components: {
		userNavbar,
		userAvatar
	},
	data() {
		return {
			avatarImg: require('@/assets/images/head.jpg'),
			userName: 'lzp318'
		}
	}
}
</script>

<style scoped>
	.header {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		overflow: hidden;
    min-height: 3.4rem;
    color: #fff;
    background: #ed424b url(../../assets/images/center-header-bg.0.1.jpg) no-repeat center;
    background-size: cover;
	}

</style>