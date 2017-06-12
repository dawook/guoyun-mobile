<template>
	<div :class='wrapCls' :key='key' ref='toast'>
		<div :class='mainCls'>
			<i v-if='iconClass.length' :class='iconCls'></i>
			<p :class='msgCls'>{{ msg }}</p>
		</div>
	</div>
</template>

<script>
	import {oneOf} from '@/utils/assist.js';

	export default {
		name: 'vToast',
		props: {
			position: {
				type: String,
				default: 'bottom',
				validator(val) {
					return oneOf(val, ['bottom', 'top', 'center'])
				}
			},
			duration: {
				type: Number,
				default: 3500
			},
			msg: {
				type: String,
				default: ''
			},
			iconClass: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				key: (new Date()).getTime()
			}
		},
		computed: {
			wrapCls() {
				return [
					`zoom-in`,
					`toast`,
					`toast--${this.iconClass.length ? 'center' : this.position}`,
					{
						[`toast--has-icon`]: this.iconClass.length
					}
				];
			},
			mainCls() {
				return [
					`toast__content`
				];
			},
			iconCls() {
				return [
					`${this.iconClass}`,
					`toast__icon`
				];
			},
			msgCls() {
				return [
					`toast__msg`
				];
			}
		},
		
		mounted() {
			let $toast = this.$refs['toast'];
			if ($toast.classList.contains('toast--center')) {
				$toast.style.marginTop = `-${$toast.offsetHeight/2}px`
			}

		}
	}
</script>