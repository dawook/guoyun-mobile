<template>
  <div :class='objCls'>
  	<template v-if='isIndex'>
  		<router-link :to="{ path: '/' }" class='header__logo'>
	  		<i class='icon-logo'></i>
	  	</router-link>
			<nav class='header__nav'>
				<router-link :to="{ path: '/' }" v-if='!isLogin'>
		  		<i class='icon-user'></i>
		  	</router-link>
		  	<router-link :to="{ path: '/' }" v-else>
		  		<img :src="avtarImg" class='header__avtar'>
		  	</router-link>
		  	<router-link :to="{ path: '/' }">
		  		<i class='icon-notice-circle'></i>
		  	</router-link>
		  	<router-link :to="{ path: '/' }">
		  		<i class='icon-setting'></i>
		  	</router-link>
			</nav>

  	</template>
  	
  </div>
</template>

<script>
	import {oneOf} from '@/utils/assist.js';
 
  export default {
    name: 'vHeader',
    props: {
    	isIndex: {
    		type: Boolean,
    		default: true
    	}
    },
    data() {
    	return {
    		avtarImg: require('@/assets/imgs/avatar.jpg'),
    		isLogin: false
    	}
    },
    computed: {
    	objCls() {
    		return [
    			`header`,
    			{
    				[`header--index`]: this.isIndex
    			}
    		];
    	}
    }
  }
</script>

