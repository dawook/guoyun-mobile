<template>
	<header :class='wrapCls'>
		<h1 :class="logoCls">
			<router-link to='/'>
				<i class="dy-icon-logo"></i>
			</router-link>
		</h1>
		<div :class='iconCls'>
			<router-link to='/user' v-if='avatarImg'>
				<img class="avatar" :src="avatarImg">
			</router-link>
			<router-link to='/login' v-else>
				<i class="dy-icon-user"></i>
			</router-link>
			<router-link to='/news'>
				<i class="dy-icon-notice-circle"></i>
			</router-link>
		</div>
	</header>
</template>

<script>
import WebStorageCache from 'web-storage-cache'

export default {
	name: 'homeHeader',
	computed: {
		wrapCls() {
			return `header`
		},
		logoCls() {
			return `header__item logo`
		},
		iconCls() {
			return `header__item list`
		}
	},
	data() {
		return {
			avatarImg: ''
		}
	},
	created() {
		let wsCache = new WebStorageCache();
		let _user = wsCache.get('user');
		this.avatarImg = _user ?  _user.avatar : '';
	}
}
</script>

<style scoped>
	.header {
		padding: 0 .25rem;
		width: 100%;
		height: .9rem;
		display: flex;
	}
	.header__item {
		display: flex;
    align-items: center;
    flex: 1;
	}
	.logo {
		font-size: .35rem;
		color: #666;
	}
	.list {
		justify-content: flex-end;
	}
	.list > a {
		padding-left: 12px;
		font-size: .45rem;
		color: #999;
	}
	.avatar {
		display: inline-block;
		width: 22px;
		height: 22px;
		border-radius: 11px;
		border: 1px solid #999;
		overflow: hidden;
	}
</style>