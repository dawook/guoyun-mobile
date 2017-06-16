<template>
	<div :class='formGroupCls'>

		<!-- icon  -->
		<span :class='iconCls' v-if='icon'></span>

		<!-- input -->
		<input
			:class='inputControllerCls'
			:type='type'
			:name='name'
			:placeholder='placeholder'
			:autocomplete='autocomplete'
			:readonly='readonly'
			:disabled='disabled'
			:value='currentValue'
			@focus='bFocus = true'
			@blur='bFocus = false'
			@input='handleChange'>
		
	
		<div :class='tipsCls'>

			<!-- show password -->
			<span :class='showPasswordCls' v-if='showPasswordIcon' @click.stop='showPassword'></span>

			<!-- clear input -->
			<span :class='clearInputCls' v-if='getShowClearIcon' @click.stop='clear'></span>

			<!-- get code buttun -->
			<span :class='getCodeBtnCls' v-if='getCode' @click.stop='handleGetCode'>{{btnCodeTxt}}</span>

		</div>

	</div>
</template>

<script>
import {
	oneOf,
	trim
} from '@/utils/assist.js'

export default {
	name: 'vInput',
	props: {
		name: String,
		value: [String, Number],
		placeholder: String,
		readonly: Boolean,
		disabled: Boolean,
		getCode: {
			type: Boolean,
			default: false
		},
		countDown: {
			type: Number,
			default: 120
		},
		autocomplete: {
			type: String,
			default: 'off'
		},
		icon: String,
		customCls: String,
		border: {
			type: Boolean,
			default: true
		},
		showClearIcon: {
			type: Boolean,
			default: true
		},
		showPasswordIcon: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'text',
			validator(val) {
				return oneOf(val, ['text','tel','password','email','number']);
			}
		}
	},
	data() {
		return {
			currentValue: this.value,
			bShowClearIcon: true,

			// 为真 可见 
			bSeePwd: false,

			// 是否获取焦点
			bFocus: false,

			bCountDown: false,
			btnCodeTxt: '获取验证码',
			iCountDown: this.countDown
		};
	},
	computed: {
		// 定义元素class
		formGroupCls() {
			return [
				`form-group`,
				{
					[`form-group--border`]: this.border,
					[`form-group--line`]: !this.border,
					[`form-group--active`]: this.bFocus,
					[`${this.customCls}`]: this.customCls
				}
			];
		},
		iconCls() {
			return [
				`form-group__icon`,
				`${this.icon}`
			];
		},
		inputControllerCls() {
			return [
				`form-group__input`
			];
		},
		tipsCls() {
			return [
				`form-group__tips`
			];
		},
		clearInputCls() {
			return [
				`form-group__clear`,
				'icon-close'
			];
		},
		showPasswordCls() {
			return [
				`form-group__show-password`,
				{
					[`icon-eye-open`]: this.bSeePwd,
					[`icon-eye-close`]: !this.bSeePwd
				}
			];
		},

		// 是否显示get code 按钮
		getCodeBtnCls() {
			return [
				`form-group__btn-code`,
				{
					[`form-group__btn-code--disabled`]: this.bCountDown
				}
			];
		},

		// 是否显示clear icon
		getShowClearIcon() {
			return this.showClearIcon && this.bShowClearIcon
		}

	},
	watch: {
		value(val) {
			this.currentValue = val;
		},
		currentValue(val) {
			this.$emit('input', val);
		}
	},
	methods: {
		
		clear() {
			if (this.currentValue = '') return;
			this.currentValue = '';
		},
		showPassword() {
			this.bSeePwd = !this.bSeePwd;
			this.type = this.bSeePwd ?  'text' : 'password';
		},
		handleChange(e) {
			let val = trim(e.target.value);
			this.currentValue = val;
			e.target.value = this.currentValue;
		},
		handleGetCode() {
			if (this.bCountDown) return false;

			this.bCountDown = true;
			this.iCountDown--
			
			var timer = setInterval(function () {
				if (this.iCountDown > 0) {
					this.btnCodeTxt = `${this.iCountDown--}s后重新获取`;
				} else {
					clearInterval(timer);
					this.bCountDown = false;
					this.btnCodeTxt = '获取验证码';
				}
			}.bind(this), 1000)

		}
	}
}
</script>