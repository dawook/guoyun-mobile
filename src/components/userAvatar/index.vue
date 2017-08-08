<template>
	<div class="avatar">
		<img class="avatar-img" :src='imgSrc'></img>
		<p class="user-name">
			{{userName}}
			<yd-badge type="hollow" color='#eee' class='level' v-if='level'>
				{{levelSchool[+level - 1]}}
				<i class="dy-icon-arrow-right icon"></i>
			</yd-badge>
		</p>


	</div>
</template>

<script>



export default {
	name: 'userAvatar',
	props: {
		imgSrc: {
			type: String
		},
		userName: {
			type: String
		},
		level: {
			type: [String, Number, Object, Boolean]
		}
	},
	data() {
		return {
			levelSchool: ['银卡会员','金卡会员','白金会员','钻石会员','黑卡会员']
		}
	}
}
</script>

<style scoped>
	.avatar {
		width: 100%;
		text-align: center;
	}
	.avatar-img {
		display: inline-block;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		border: 3px solid rgba(255,255,255,.2);
	}
	.user-name {
		font-family: 'dwyer';
		font-size: .28rem;
		margin: .12rem 0;
	}
	.level {
		position: relative;
		padding-right: 18px;
		margin-left: 6px;
		background-color: transparent;
		font-size: .2rem;
	}
	.level:after {
		top: -1px;
		border-color: #f8f8f8;
	}
	.icon {
		position: absolute;
		top: 0;
		right: 2px;
		font-size: 16px;
	}

</style>