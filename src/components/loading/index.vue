<template>
	<div class="load-icon">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <p class="load-txt" v-text='text' v-if='text'></p>
  </div>
</template>

<script>
export default {
	name: 'vLoading',
  props: {
    text: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style scoped>
.load-icon {
  padding-top: .125rem;
  font-size: .25rem;
  text-align: center;
  color: #999;
}
.spinner {
  margin: 0 auto;
  width: 50px;
  height: 1.2rem;
  text-align: center;
}

.spinner > div {
  background-color: #7ECF94;
  height: 100%;
  width: 5px;
  display: inline-block;

  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  background-color: #fab57d;
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  background-color: #5ab1ef;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  background-color: #93d4d0;
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  background-color: #ee7179;
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%, 40%, 100% {
    -webkit-transform: scaleY(0.4)
  }
  20% {
    -webkit-transform: scaleY(1.0)
  }
}

@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>