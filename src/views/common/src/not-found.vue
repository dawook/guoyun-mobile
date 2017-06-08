<template>
  <div class="not-found">
    <img :src="img" alt="">
    <p>
      <v-touch
        tag='a'
        class='btn border-1px'
        v-on:tap='goBack'>返回上页</v-touch>
      <router-link to='/' class='btn'>返回首页</router-link>
    </p>

  </div>
</template>
<script>
export default {
  name: 'notFound',
  data() {
    return {
      img: require('@/assets/imgs/404.svg')
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  }
}
</script>

<style scoped>
  .not-found {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    padding-top: 6rem;
    background-color: #fff;
  }
  .btn {
    margin-top: 1rem;
    display: inline-block;
    padding: 12px 18px;
    font-size: .8rem;
    line-height: 1.0;
    color: #d61518;
  }
  .btn:after {
    border-color: #d61518;
  }
  .btn:last-child {
    margin-left: 15px;
    background-color: #d61518;
    color: #fff;
  }
</style>