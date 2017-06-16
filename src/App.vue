<template>
  <div id="app">
  	<transition name="outLeftInRight">
    	<router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
.outLeftInRight-enter-active,
.outLeftInRight-leave-active {
	transition: all .1s ease;
}

.outLeftInRight-enter {
  opacity: 0;
  transform: translateY(50%);
}
.outLeftInRight-leave {
  opacity: 0;
  transform: translateY(-20%);
}
</style>
