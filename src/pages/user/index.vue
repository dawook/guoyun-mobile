<template>
	<div class="m-home">
		<div class="header">
	    <user-navbar></user-navbar>
			<user-avatar
				:imgSrc='avatarImg'
				:userName='userName'
				:level='level'></user-avatar>
		</div>



	</div>
</template>

<script>
import userNavbar from '@/components/userNavbar'
import userAvatar from '@/components/userAvatar'
import {getStore} from '@/utils/assist.js'

export default {
	name: 'user',
	components: {
		userNavbar,
		userAvatar
	},
	data() {
		return {
			avatarImg: require('@/assets/images/head.jpg'),
			userName: '',
			level: ''
		}
	},
	methods: {
		getUser() {
			this.userName = getStore("_user_name");
			let _user_school = getStore("_user_school");
			this.level = _user_school === 'null' ? false : _user_school.charAt(_user_school.length - 1);
		}
	},
	mounted() {
		this.getUser();
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