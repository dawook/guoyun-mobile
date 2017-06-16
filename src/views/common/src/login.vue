<template>
  <div :class='wrapCls'>
    <img
      :src="iconUrl"
      :class='iconCls'
      alt="">

    <form :class="formCls">
      <v-input
        icon='icon-user'
        class='m-b--sm'

        v-model='username'
        ></v-input>
      <v-input
        type='password'
        icon='icon-password'
        class='m-b--sm'
        showPasswordIcon
        v-model='password'
        ></v-input>
      
      <p class='form__tips m-t--xxs'>
        <input type="checkbox" >记住我
      </p>

      <v-button 
        value='立即登录' 
        type='danger' 
        block
        btnType='button'
        :disabled='disabled' 
        @click.native='submit'></v-button>

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
import vInput from '@/components/input/'
import vButton from '@/components/button/'
import '@/components/toast/'

import {
  trim,
  setStore,
  encrypt
} from '@/utils/assist.js'

export default {
  name: 'login',
  computed: {
    wrapCls() {
      return [`login`,`b-t-1px`]
    },
    iconCls() {
      return `login__icon`
    },
    formCls() {
      return [
        `form__wrap`
      ];
    },
    formBtn() {
      return [
        `form__submit`,
        {
          [`form__submit--disabled`]: this.disabled
        }
      ];
    }
  },
  data() {
    return {
      iconUrl: require('@/assets/imgs/icon.png'),
      username: '',
      password: '',
      disabled: true
    }
  },
  components: {
    vInput,
    vButton
  },
  watch: {
    username(val) {
      this.disabled = !(val && val.length);
    },
    password(val) {
      this.disabled = !(val && val.length);
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
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
        try {
          setStore('username', encrypt(this.username));
          setStore('password', encrypt(this.username));
        }catch(e) {}
        
        this.username = '';
        this.password = '';

        this.goBack();
      }

      return false;
    }
  }
}
</script>