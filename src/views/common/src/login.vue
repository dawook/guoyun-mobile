<template>
  <div :class='wrapCls'>
    <img
      :src="iconUrl"
      :class='iconCls'
      alt="">
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      iconUrl: require('@/assets/imgs/icon.png')
    }
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