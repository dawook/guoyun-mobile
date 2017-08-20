<template>
  <div class="no-data">
    <img :src="imgUrl" class="img">
  </div>
</template>

<script>
export default {
  name: 'noData',
  data() {
    return {
      imgUrl: require('@/assets/images/no-data.svg')
    }
  }
}
</script>

<style scoped>
  .no-data {
    margin-top: 1rem;
    width: 100%;
    text-align: center;
  }
  .img {
    display: inline-block;
  }

</style>