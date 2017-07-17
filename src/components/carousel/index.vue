<template>
	<div class="carousel">
		<yd-slider autoplay="5000" >
      <yd-slider-item
      	v-for='(item, index) in slider'
      	:key='index'>
      	<img :src="item.apppic" @click='redirect(item.summary)'>
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
	methods: {
		redirect(id) {
			this.$router.push({ path: 'notice', query: { noticeId: id }})
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

	@media only screen and (min-width: 640px){
    .slider-item img {
			height: 220px;
		}
	}
	@media only screen and (min-width: 960px){
    .slider-item img {
			height: 330px;
		}
	}
</style>