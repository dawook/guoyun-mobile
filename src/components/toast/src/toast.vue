<template>
	<transition 
		name='zoom'
		enter-active-class="zoom-in"
    leave-active-class="zoom-out"
	>	
		<div v-if='status' :class='wrapCls' :key='key' ref='toast'>
			<div :class='mainCls'>
				<i v-if='iconClass.length' :class='iconCls'></i>
				<p :class='msgCls'>{{ msg }}</p>
			</div>
		</div>
	</transition>
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
				default: 3000
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
				key: (new Date()).getTime(),
				status: true
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
		methods: {

		},
		mounted() {
			let $toast = this.$refs['toast'];
			if ($toast.classList.contains('toast--center')) {
				$toast.style.marginTop = `-${$toast.offsetHeight/2}px`
			}

			setTimeout(function () {
				this.status = false;
			}.bind(this), this.duration);

		}
	}
</script>