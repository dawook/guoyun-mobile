<template>
  <div :class='wrapCls'>
    <img
      :src="iconUrl"
      :class='iconCls'
      alt="">

    <form class="form__wrap">
      <v-input icon='user' class='m-b--sm'></v-input>
      <v-input type='password' icon='password' class='m-b--sm'></v-input>
      <input type="submit" value='立即登录' class='form__submit'>
      <p class='b-t-1px m-t--md form__line'>
        <span>or</span>
      </p>
      <p class='form__tips'>
        <router-link to='/reg'>立即注册</router-link>
        <router-link to='/forget'>忘记密码</router-link>
      </p>
    </form>



    
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