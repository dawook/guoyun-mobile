<template>
	<p>
		<span v-if='btnType=="normall"' v-text='value' :class='btnCls'></span>
		<button v-if='btnType=="button"' v-text='value' :class='btnCls' :disabled='disabled'></button>
		<input type="submit" v-if='btnType=="submit"' :class='btnCls' :value='value' :disabled='disabled'>
		<input type="reset" v-if='btnType=="reset"' :class='btnCls' :value='value' :disabled='disabled'>
	</p>
</template>

<script>
import {oneOf} from '@/utils/assist.js'

export default {
	name: 'vButton',
	props: {
		btnType: {
			type: String,
			default: 'normall',
			validator(val) {
				return oneOf(val, ['normall', 'button', 'submit', 'reset']);
			}
		},
		type: {
			type: String,
			default: 'normall',
			validator(val) {
				return oneOf(val, ['success', 'warning', 'danger', 'info']);
			}
		},
		size: {
			type: String,
			default: 'normal',
			validator(val) {
				return oneOf(val, ['mini', 'normal', 'large'])
			}
		},
		block: Boolean,
		plain: Boolean,
		iconCls: String,
		value: String,
		disabled: Boolean
	},
	computed: {
		btnCls() {
			return [
				`btn`,
				`btn--${this.type}`,
				`btn--${this.size}`,
				{
					[`btn--block`]: this.block,
					[`btn--plain`]: this.plain,
					[`btn--disabled`]: this.disabled
				}
			];
		}
	}
}
</script>