<template>
  <div class='container'>
    <v-header></v-header>
		<v-carousel :items='carouselItems'></v-carousel>
		<v-menu></v-menu>
  </div>
</template>

<script>
import vHeader from '@/components/header/'
import vCarousel from '@/components/carousel/'
import vMenu from '@/components/menu/'

export default {
   name: 'vHome',
   components: {
    vHeader,
    vCarousel,
    vMenu
   },
   data() {
   	return {
   		carouselItems: [
   			{
   				path: '/',
   				imgurl: require('@/assets/imgs/swiper_01.png')
   			},
   			{
   				path: '/',
   				imgurl: require('@/assets/imgs/swiper_02.jpg')
   			},
   			{
   				path: '/',
   				imgurl: require('@/assets/imgs/swiper_03.jpg')
   			}
   		]
   	}
   }
}
</script>