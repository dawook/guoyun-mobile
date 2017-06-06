<template>
  <div :class='objCls'>
    header
  </div>
</template>

<script>
	import {oneOf} from '@/utils/assist.js';
 
  export default {
    name: 'vHeader',
    props: {
    	isIndex: {
    		type: Boolean,
    		default: false
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

<style lang="sass">
  @import "./header.scss";
</style>