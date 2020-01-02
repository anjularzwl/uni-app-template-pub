<script>
	import api from '@/core/api'
	export default {
		data () {
			return {
			}
		},
		onLaunch: function () {
			console.log('App Launch')
			this.checkUpdate()
			this.checkNetWork()
			const res = uni.getSystemInfoSync()
    	const result = (/iPhone X/gi).test(res.model)
    	const resultIOS = (/iPhone/gi).test(res.model)
			this.$store.commit('adjustX', result)
			this.$store.commit('adjustIOS', resultIOS)
			console.log('手机类型是iOS：', resultIOS)
			console.log('state', this.$store.state.isPhoneX)
		},
		onShow: function () {
		},
		onHide: function () {
			console.log('App Hide')
		},
		onPageNotFound(res) {
			wx.redirectTo({
				url: 'pages/index'
			})
		},
		onError(error) {
			console.log(error)
		},
		methods: {
			// 检查版本更新
			checkUpdate() {
				console.log('update')
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
					// 请求完新版本信息的回调
				})
				updateManager.onUpdateReady(function () {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success: function (res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
				updateManager.onUpdateFailed(function () {
					// 新的版本下载失败
				})
			},
			// 检查网络
			checkNetWork() {
				uni.onNetworkStatusChange(res => {
					if (!res.isConnected) {
						uni.hideLoading()
						uni.showModal({
							content: '当前无网络，请稍后再试',
							confirmText: '重试',
							showCancel: false,
							confirmColor: '#29ab91'
						}).then(res => {
							if (res[1].confirm) {
								const pages = getCurrentPages()
								const currentPage = pages[pages.length - 1]
								currentPage.onLoad(currentPage.options ? currentPage.options : '')
								currentPage.onShow()
							}
						})
						// uni.showToast({
						// 	title: '当前无网络，请稍后再试',
						// 	icon: 'none',
						// 	duration: 3000,
						// })
					}
					if (res.networkType) {
						switch (res.networkType) {
							case '2g':
								uni.hideLoading()
								uni.showToast({
									title: '当前网速较慢',
									icon: 'none',
									duration: 3000,
								})
								break;
							case '3g':
								uni.hideLoading()
								uni.showToast({
									title: '当前网速较慢',
									icon: 'none',
									duration: 3000,
								})
								break;
							default:
								break;
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">

	/*每个页面公共css */
	@import "./wxcomponents/vant/common/index.wxss";
	button::after {
		border: none;
	}
	page {
		/* height: 100%;
		overflow: auto; */
		background-color: #f2f2f2;
	}
	.b_radius {
		border-radius: 0upx !important;
		border-top-left-radius: 16upx !important;
		border-top-right-radius: 16upx !important;
	}
	.header_man_left {
		image {
			border: 1rpx solid #e5e5e5;
		}
	}
	.use {
		width: 84upx;
		height: 84upx;
		border-radius: 50%;
		font-size: 11px;
		color: #023066;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		box-shadow:0px 8upx 16upx 0px rgba(0,0,0,0.2);
		background: #fff;
	}
	text {
		word-break: break-all;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	.card-bg {
		position: relative;
		background: #fff;
		margin: 0 20rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		font-size: 27rpx;
		box-shadow: 0px 1px 10px #ddd;
		.card-footer {
			border-top: 1px dotted #eee;
			position: relative;
			.semi-circle {
				position: absolute;
				top: -12rpx;
				background: #f5f5f5;
				height: 25rpx;
				width: 25rpx;
				border-radius: 50%;
			}
			.left {
				left: -11rpx;
			}
			.right {
				right: -11rpx;
			}
		}
	}
</style>
