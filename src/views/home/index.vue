<template>
  <div>
    <v-header></v-header>
    <swipe 
    	v-model="index" 
    	style="text-align: center; line-height: 80px; height: 100px;"
    	:pagination='false'>
		  <swipe-item style="height: 100px;"><img :src="img"></swipe-item>
		  <swipe-item style="height: 100px;">item2</swipe-item>
		  <swipe-item style="height: 100px;">item3</swipe-item>
		</swipe>
  </div>
</template>

<script>
import vHeader from '@/components/header/'
import { Swipe, SwipeItem } from 'c-swipe';
require('c-swipe/dist/swipe.css');

export default {
   name: 'vHome',
   components: {
    vHeader,
    Swipe,
    SwipeItem
   },
   data() {
   	return {
   		index: 0,
   		img: require('@/assets/imgs/swiper_01.png')
   	}
   }
}
</script>