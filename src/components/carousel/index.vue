<template>
	<div :class='wrapCls'>
		<swipe 
    	v-model="current" 
    	class='swiper__wrap'
    	:pagination='false'>

		  <swipe-item 
		  	class='swiper__item' 
		  	v-for='(item, index) in items' 
		  	:key='index'>
		  	<router-link :to='item.path'>
		  		<img :src="item.imgurl" class='swiper__image'>
		  	</router-link>
		  </swipe-item>
		  
		</swipe>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'c-swipe';
	require('c-swipe/dist/swipe.css');

	export default {
		name: 'vCarousel',
		props: {
			items: {
				type: Array
			},
			currentIndex: {
				type: Number,
				default: 0
			},
			wrapCls: {
				type: String,
				default: 'swiper__container'
			}
		},
		data() {
			return {
				current: 0
			}
		},
		components: {
			Swipe,
			SwipeItem
		},
		mounted() {
			this.current = this.currentIndex >= this.items.length ? this.items.length : this.currentIndex;
		}
	}
</script>
