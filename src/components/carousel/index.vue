<template>
	<div class="carousel">
		<yd-slider autoplay="5000" >
      <yd-slider-item
      	v-for='(item, index) in slider'
      	:key='index'>
      	<router-link :to="'/notice/' + item.summary">
      		<img :src="item.apppic">
      	</router-link>
      </yd-slider-item>
    </yd-slider>
	</div>
</template>

<script>
export default {
	name: 'Carousel',
	data() {
		return {
			slider: []
		}
	},
	created() {
		this.$http.get(this.HOST + 'api.php?action=slider').then(response => {
			this.slider = response.data.data;
		})
	}
}
</script>

<style scoped>
	.carousel {
		padding: 0 .25rem;
		width: 100%;
		overflow: hidden;
	}
	.slider-item img {
		height: 2.1818rem;
	}
	@media only screen and (min-width: 768px){
    .slider-item img {
			height: 3.928rem;
		}
	}
	@media only screen and (min-width: 768px){
    .slider-item img {
			height: 5.714rem;
		}
	}
</style>