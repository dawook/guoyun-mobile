<template>
	<yd-flexbox>
    <yd-flexbox-item>
      <div class="progress">
      	<span class="progress-bar" :style="'width:' + suffx + '%'"></span>
      </div>
    </yd-flexbox-item>
    <span class="progress-num">{{suffx}}%</span>
  </yd-flexbox>
</template>

<script>
export default {
	name: 'vProgress',
	props: {
		suffx: {
			type: [Number, String],
			default: 0
		}
	}
}
</script>

<style scoped>
	.progress {
		position: relative;
		display: inline-block;
		width: 100%;
		height: 2px;
		background-color: #eee;
	}
	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: #3599D5;
	}
	.progress-bar:after {
		position: absolute;
		content: "";
		width: 4px;
		height: 4px;
		top: -1px;
		right: 0;
		background-color: #fff;
		border: 1px solid #3599d5;
		border-radius: 50%;
	}
	.progress-num {
		margin-left: 5px;
		position: relative;
		top: 3px;
		font-size: .18rem;
		color: #666;
	}
</style>