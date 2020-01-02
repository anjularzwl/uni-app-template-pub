<template>
	<view class="admin" v-if="show">
		<!-- <button open-type="getPhoneNumber" @getphonenumber="bindetPhoneNumber($event, 1)">获取手机号</button> -->
		<view class="code_box">
			<view class="code">
				<image src="../static/close.svg" class="close_img" @tap="close"></image>
				<view class="code_title">请填写手机短信验证码</view>
				<view class="code_phone">已发送到手机号:17630107763</view>
				<view class="input_box">
					<!-- <input type="number" value="" maxlength='6' class="input_line" /> -->
					<!-- <input type="number" maxlength="6" value="" class="inp" />
					<view class="line_box">
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
						<view></view>
					</view> -->
					<view class='blocks'>
					  <view class="block">
						<view v-if="!numList.length" class="cursor"></view>
						<text v-if="numList.length">{{numList[0]}}</text>
					  </view>
					  <view class="block">
						<view v-if="numList.length===1" class="cursor"></view>
						<text v-if="numList.length>=2">{{numList[1]}}</text>
					  </view>
					  <view class="block">
						<view v-if="numList.length===2" class="cursor"></view>
						<text v-if="numList.length>=3">{{numList[2]}}</text>
					  </view>
					  <view class="block">
						<view v-if="numList.length===3" class="cursor"></view>
						<text v-if="numList.length>=4">{{numList[3]}}</text>
					  </view>
					  <view class="block">
						<view v-if="numList.length===4" class="cursor"></view>
						<text v-if="numList.length>=5">{{numList[4]}}</text>
					  </view>
					  <view class="block">
						<view v-if="numList.length===5" class="cursor"></view>
						<text v-if="numList.length>=6">{{numList[5]}}</text>
					  </view>
					  <input unselectable="on" type='number' maxlength='6' focus='true' auto-focus='true' @input="change" />
					</view>
				</view>
				<view class="btn_box">
					<view v-if="isShow">{{timeNum}}s后可重发</view>
					<view v-else="" class="btn" @click="second_btn">再次发送</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/core/api'
	import common from '@/share/common'
	import analysis from '@/share/analysis'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			phoneValue: {
				type: String,
				default: ''
			},
			tel: {
				type: Object,
				default: {}
			}
		},
		watch: {
			show:function(e) {
				if (e && !this.timeNum) {
					// this.getPhoneCode()
					console.log(222)
				}
			}
		},
		data() {
			return {
				numList: '',
				isShow: true,
				timeNum: null,
				timer: null
			}
		},
		methods: {
			close() {
				console.log(1)
				this.$emit('close', true)
			},
			second_btn() {
				this.isShow = true
				this.times()
			},
			times() {
				this.timer = setInterval(()=> {
					if (this.timeNum >1) {
						this.timeNum -= 1
					} else {
						this.isShow = false
						this.timeNum = 59
						clearInterval(this.timer)
					}
				}, 1000)
			},
			change(e) {
				this.numList = e.detail.value
			},
			bindetPhoneNumber(res) {
				console.log(res)
				if (!res.detail.iv || !res.detail.encryptedData) {
					uni.showToast({
					  title: '授权失败',
					  icon: 'none'
					})
				} else {
					// 注册
					this.phoneuaa(res)
				}
			},
			phoneuaa(resp) {
				uni.login({
					success: (res) => {
						if (res.code) {
							const data = {
								appId: api.appId,
								encryptedData: resp.detail.encryptedData,
								ivStr: resp.detail.iv,
								jsCode: res.code
							}
							this.$http.post(api.mobileUrl, data).then(res => {
								console.log(',,,', res)
								if (!res || !res.data.phoneNumber) {
								  // 失败登录后重新拿code
								  uni.login({
									success(res) {
									  uni.setStorageSync('code', res.code)
									}
								  })
								  return uni.showToast({
									title: '服务器异常',
									icon: 'none',
									duration: 2000
								  })
								} else {
								  console.log('phoneuaa注册成功')
								  uni.setStorageSync('phone', res.data.phoneNumber)
								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			// 确定验证
			sureBtn() {
				let newUrl = api.API + 'esencommon/openapi/code/verify' + '?mobile=' + this.phoneValue + '&code=' + this.codeValue
				this.$http.get(newUrl).then(res => {
					console.log(res)
					if (res.statusCode !== 200) {
						uni.showToast({
							icon: 'none',
							title: '请填写正确的验证码'
						})
					} else {
						this.apply()
					}
				})
			},
		},
		onLoad() {
			console.log('---', api)
			this.times()
		},
		onShow() {
			console.log(888)
		}
	}
</script>

<style lang="less">
	@import '../common/less/common.less';
	.code_box{
		z-index: 999;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.code{
			background-color: #fff;
			width: 80%;
			padding: 60upx 100upx;
			box-sizing: border-box;
			position: relative;
			border-radius: 12upx;
			.close_img{
				width: 40upx;
				height: 40upx;
				position: absolute;
				top: 20upx;
				left: 20upx;
			}
			.code_title{
				text-align: center;
				margin-top: 20upx;
				font-size: 18px;
			}
			.code_phone{
				text-align: center;
				margin-top: 20upx;
				color: #8B8A8A;
				font-size: 14px;
				margin-top: 20upx;
			}
			.input_box{
				margin-top: 20upx;
				.input_line{
					border-bottom: 2upx solid #000;
					font-size: 20px;
					color: @primary-color;
				}
				.inp{
					letter-spacing:20upx;
					font-size: 20px;
					color: @primary-color;
				}
				.line_box{
					display: flex;
					justify-content: space-between;
					view{
						width: 8%;
						height: 2px;
						background: #8B8A8A;
					}
				}
				input {
				  position: absolute;
				  left: 0;
				  top: 0;
				  color: transparent;
				  z-index: 0;
				  height: 40px;
				}

				.blocks {
				  background-color: #fff;
				  position: relative;
				  width: 100%;
				  display: flex;
				  justify-content: space-between;
				}

				.block {
				  z-index: 999;
				  width: 8%;
				  height: 80upx;
				  border-bottom: 4upx solid #000;
				  font-size: 24px;
				}

				.cursor4 {//光标的样式
				  width: 2upx;
				  height: 60upx;
				  background-color: #000;
				  animation: focus 1s infinite;
				}

				/* 光标动画 */

				@keyframes focus {
				  from {
					opacity: 1;
				  }

				  to {
					opacity: 0;
				  }
				}
			}
			.btn_box{
				margin-top: 20px;
				display: flex;
				justify-content: center;
				font-size: 14px;
				color: #B6B5B7;
				.btn{
					padding: 0upx 40rpx;
					height: 60upx;
					line-height: 60upx;
					border: 2upx solid #B6B5B7;
					border-radius: 30upx;
				}
			}
		}
	}
</style>
