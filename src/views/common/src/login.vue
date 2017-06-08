<template>
  <div :class='wrapCls'>
    <img
      :src="iconUrl"
      :class='iconCls'
      alt="">

    <v-input size='large'></v-input>
  </div>
</template>

<script>
import vInput from '@/components/input/'
export default {
  name: 'login',
  data() {
    return {
      iconUrl: require('@/assets/imgs/icon.png')
    }
  },
  components: {
    vInput
  },
  computed: {
    wrapCls() {
      return [`login`,`b-t-1px`]
    },
    iconCls() {
      return `login__icon`
    }
  }
}
</script>