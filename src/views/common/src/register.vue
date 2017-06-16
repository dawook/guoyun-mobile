<template>
	<div>
		<v-header :isIndex='false' class='m-b--xxl'>
			用户注册
		</v-header>

		<form :class="formCls" onsubmit='return false;'>
      <v-input
        icon='icon-user'
        placeholder='请输入手机号'
        class='m-b--xs'
        v-model='username'
        ></v-input>
      <v-input
        type='password'
        icon='icon-password'
        placeholder='请输入登录密码'
        class='m-b--xs'
        showPasswordIcon
        v-model='password'
        ></v-input>
      <v-input
        type='password'
        icon='icon-password-confirm'
        placeholder='请确认登录密码'
        class='m-b--xs'
        showPasswordIcon
        v-model='passwordConfirm'
        ></v-input>
      <v-input
        icon='icon-verify-code'
        placeholder='请确认手机验证码'
        class='m-b--xs'
        getCode
        v-model='code'
        ></v-input>

      <v-button
				btnType='button'
				value='立即登录'
				type='danger'
				:block='true'
				:disabled="disabled"
				@click.native='submit'
      	></v-button>

    </form>

	</div>
</template>

<script>
import vHeader from '@/components/header/'
import vInput from '@/components/input/'
import vButton from '@/components/button/'

import {
  trim,
  setStore,
  encrypt
} from '@/utils/assist.js'

export default {
	name: 'register',
	components: {
		vHeader,
		vInput,
		vButton
	},
	data() {
		return {
			username: '',
			password: '',
			passwordConfirm: '',
			code: '',
			disabled: true
		}
	},
	computed: {
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
	watch: {
    username(val) {
      this.disabled = !(val && val.length);
    },
    password(val) {
      this.disabled = !(val && val.length);
    },
    passwordConfirm(val) {
    	this.disabled = !(val && val.length);
    },
    code(val) {
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
      let confirmPwd = trim(this.passwordConfirm);

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

      if (confirmPwd !== pwd) {
				this.$toast({msg: '登录密码不一致'});
        return false;
      }

      return true;
    },
    submit() {

      if(this.validator()) {
        
        // 注册操作
        // code 
        
        this.username = '';
        this.password = '';
        this.passwordConfirm = '';
        this.code = '';

        this.goBack();
      }

      return false;
    }
  }
}

</script>