<template>
	<view class="uni-badge" :class="{'uni-badge-no-active': !text, 'mut': transText > 1}" @click="onClick()">{{text}}</view>
</template>

<script>
	export default {
		name: 'uni-badge',
		props: {
			text: {
				type: String,
				default: ''
			},
			scale: {
				type: String,
				default: '0.5'
			}
		},
		computed: {
			transText: function() {
				console.log(123, this.text.length)
				return this.text.length
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	@bage-size:12px;

	.uni-badge {
		box-sizing: border-box;
    min-width: 30upx;
    height: 30upx;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 30upx;
    white-space: nowrap;
    text-align: center;
    background: #F15A4A;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #fff;
	}
	.mut {
		padding: 0 10upx;
		border-radius: 30upx;
	}
	.uni-badge-no-active {
		width: 12upx;
		height: 12upx;
		min-width: 12upx;
	}
</style>
