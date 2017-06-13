<template>
  <div :class='wrapCls'>
    <img
      :src="iconUrl"
      :class='iconCls'
      alt="">

    <form class="form__wrap" @submit='submit'>
      <v-input
        icon='user'
        class='m-b--sm'
        v-model='username'
        ></v-input>
      <v-input
        type='password'
        icon='password'
        class='m-b--sm'
        v-model='password'
        ></v-input>
      <input type="submit" value='立即登录' class='form__submit'>
      <p class='b-t-1px m-t--md form__line'>
        <span>or</span>
      </p>
      <p class='form__tips' >
        <router-link to='/reg'>立即注册</router-link>
        <router-link to='/forget'>忘记密码</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import vInput from '@/components/input/src/input.vue'
import '@/components/toast/'
import {trim, setStore, getStore} from '@/utils/assist.js'

export default {
  name: 'login',
  computed: {
    wrapCls() {
      return [`login`,`b-t-1px`]
    },
    iconCls() {
      return `login__icon`
    }
  },
  data() {
    return {
      iconUrl: require('@/assets/imgs/icon.png'),
      username: '222',
      password: '222'
    }
  },
  components: {
    vInput
  },
  methods: {
    validator() {
      let uname = trim(this.username);
      let pwd = trim(this.password);

      if (!uname.length) {
        this.$toast({msg: '用户名不能为空'});
        return false;
      }
      if(!/^[0-9A-Za-z_]{6,15}$/.test(uname)) {
        this.$toast({msg: '用户名必须是0-9,a-z,A-z,_的6-15位字符'});
        return false;
      }
      if (!pwd.length) {
        this.$toast({msg: '登录密码不能为空'});
        return false;
      }
      if (pwd.length < 6) {
        this.$toast({msg: '登录密码不能少于6位'});
        return false;
      }
      return true;
    },
    submit() {
      if(this.validator()) {
        this.username = '';
        this.password = '';
      }

      return false;
    }
  }
}
</script>