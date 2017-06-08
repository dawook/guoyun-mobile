<template>
  <div class='container'>
    <v-header></v-header>
		<v-carousel :items='carouselItems'></v-carousel>
		<v-menu></v-menu>
		<v-project-card	
			title='热门项目'
			:datas='hotDatas'></v-project-card>
		<v-project-card	title='影视文化'></v-project-card>
		<v-project-card	title='不良资产'></v-project-card>
		<v-project-card	title='PPP耕地'></v-project-card>
		<v-project-card	title='商学院'></v-project-card>
		<v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from '@/components/header/'
import vCarousel from '@/components/carousel/'
import vMenu from '@/components/menu/'
import {vProjectCard} from '@/components/card/index.js'
import vFooter from '@/components/footer/'

export default {
   name: 'vHome',
   components: {
    vHeader,
    vCarousel,
    vMenu,
    vProjectCard,
    vFooter
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
   		],
   		hotDatas: [
   			{
   				id: 20170512,
   				title: "国运产权-GY-001",
   				profit: '35.0',
   				period: 6,
   				status: 2,
   				money: 500
   			}
   		]
   	}
   },
   methods: {

   }
}
</script>