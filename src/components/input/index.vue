<template>
  <div :class='wrapCls'>
    <textarea
      v-if="this.type == 'textarea'"
      ref='input'
      :class='inputCls'
      :value='val'
      :name='name'
      :disabled='disabled'
      :placeholder='placeholder'
      :readonly="readonly"
      :rows='rows'
      @input='changeVal'>
    </textarea>
    <template v-else>
      <i 
        :class='iconCls'
        v-if='icon.length'></i>
      <input
        ref='input'
        :class='inputCls'
        :type= 'this.type'
        :value='val'
        :name="name"
        :disabled='disabled'
        :placeholder='placeholder'
        :readonly="readonly"
        @input='changeVal'
        @focus='focus'
        @blur='blur'>

      <span
        v-if='this.clear'
        :class='`input__close`'
        @click.stop='clearVal'>
        &times;
      </span>
      <span
        v-if='showSeePwd'
        :class='seepwdCls'
        @click.stop='seePassword'>
      </span>
    </template>

  </div>
</template>

<script>
  import {oneOf} from '@/utils/assist.js';
  export default {
    name: 'drInput',
    props: {
      customCls: {
        type: String
      },
      type: {
        type: String,
        default() {
          return 'text'
        },
        validator(val) {
          return oneOf(val, ['text', 'password', 'number', 'textarea']);
        }
      },
      size: {
        type: String,
        validator(val) {
          return oneOf(val, ['large', 'small']);
        }
      },
      clear: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: ''
      },
      name: {
        type: String
      },
      value: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      placeholder: {
        type: String
      },
      readonly: {
        type: Boolean,
        default: false
      },
      // 仅在type='textarea'时生效
      rows: {
        type: Number
      },
      perfixCls: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        val: '',
        showSeePwd: false,
        seepwd: false,
        isFocus: false
      }
    },
    computed: {
      wrapCls() {
        return [
          `input__wrap`,
          {
            [`input-has-icon`]: this.icon.length
          }
        ];
      },
      iconCls() {
        return [
          `input__icon`,
          `icon-${this.icon}`,
          {
            [`input__icon--focus`]: this.isFocus
          }
        ];
      },
      inputCls() {
        let clsList = [
          `input`
        ];

        if (this.type !== 'textarea') {
          clsList.push(
            this.size ? `input--${this.size}` : ''
          );
        } else {
          clsList.push(
            `input-textarea`
          );
        }

        clsList.push(
          this.customCls ? this.customCls : ''
        );

        return clsList;
      },
      seepwdCls() {
        let pwdCls = [
          `input__seepwd`
        ];

        pwdCls.push(
          this.seepwd ? `icon-eye-open` : `icon-eye-close`
        );

        return pwdCls;
      }
    },
    watch: {
      val: function (v, ov) {
        this.$emit('change', v);
      }
    },
    methods: {
      focus() {
        this.isFocus = true;
      },
      blur() {
        this.isFocus = false;
      },
      clearVal() {
        this.$refs.input.focus();
        if (this.val == '') return false;
        this.val='';
      },
      seePassword() {
        this.$refs.input.focus();
        this.seepwd = !this.seepwd;

        this.$refs.input.type = this.seepwd ? 'text' : 'password';
      },
      changeVal: function (val) {
        let $input = this.$refs.input;
        this.val = $input.value;
      }
    },
    mounted() {
      this.val = this.value;
      this.showSeePwd = this.type == 'password';
    }
  }
</script>

