<template>
	<div :class='cls'>
		<slot name='header'></slot>
		<slot name='main'></slot>
		<slot name='footer'></slot>
	</div>
</template>

<script>
	export default {
		name: 'vCard',
		computed: {
			cls() {
				return 'card'
			}
		}
	}
</script>