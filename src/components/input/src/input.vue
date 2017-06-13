<template>
	<div :class='formGroupCls'>
		<!-- label -->
		<span :class='labelCls' v-text='label' v-if='getShowLabel'></span>

		<!-- icon  -->
		<span :class='iconCls' v-else></span>

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
			@input='handleChange'>
		

		<!-- clear input -->
		<span :class='clearInputCls' v-if='getShowClearIcon' @click.stop='clear'></span>

		<!-- show password -->
		<span :class='showPasswordCls' v-if='getShowPassword' @click.stop='showPassword'></span>

		<!-- error icon -->
		<span :class='errorIconCls' v-if='getShowErrorIcon'></span>

		<!-- success icon -->
		<span :class='successIconCls' v-if='getShowSuccessIcon'></span>

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
		autocomplete: {
			type: String,
			default: 'off'
		},
		label: String,
		icon: String,
		customCls: String,
		showClearIcon: {
			type: Boolean,
			default: true
		},
		showErrorIcon: {
			type: Boolean,
			default: true
		},
		showSuccessIcon: {
			type: Boolean,
			default: true
		},
		regex: String,	// 验证规则
		required: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: 'text',
			validator(val) {
				return oneOf(val, ['text','tel','password','email','number']);
			}
		},
		max: {
			type: Number,
			validator(val) {
				return /^\d*$/.test(val);
			}
		},
		min: {
			type: Number,
			validator(val) {
				return /^\d*$/.test(val);
			}
		}
	},
	data() {
		return {
			currentValue: this.value,
			bShowClearIcon: true,
			bShowPassword: true,
			bShowErrorIcon: false,
			bShowSuccessIcon: false,

			// 为真 可见 
			bSeePwd: false,

			// 内置验证规则
			regObj: {
				email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',
				mobile: '^(86)?1[3,4,5,7,8]\\d{9}$',
				bankcard: '^\\d{15,19}$'
			}
		};
	},
	computed: {
		// 定义元素class
		formGroupCls() {
			return [
				`form-group`,
				{
					[`${this.customCls}`]: this.customCls
				}
			];
		},
		labelCls() {
			return [
				`form-group__label`
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
		errorIconCls() {
			return [
				`form-group__status`,
				`form-group__status--error`
			];
		},
		successIconCls() {
			return [
				`form-group__status`,
				`form-group__status--success`,
				`icon-choose`
			];
		},

		// 判断显示label或者icon
		getShowLabel() {
			return !!this.label && !this.iconCls;
		},

		// 是否显示clear icon
		getShowClearIcon() {
			return this.showClearIcon && this.bShowClearIcon
		},

		// 是否显示password icon
		getShowPassword() {
			return (this.type === 'password' && this.bShowPassword) || (this.type !== 'password' && !this.bShowPassword)
		},

		// 是否显示error icon
		getShowErrorIcon() {
			return this.showErrorIcon && this.bShowErrorIcon
		},

		// 是否显示success icon
		getShowSuccessIcon() {
			return this.showSuccessIcon && this.bShowSuccessIcon
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
		validator() {

		},
		clear() {
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
		}
	}
}
</script>