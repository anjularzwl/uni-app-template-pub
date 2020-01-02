<template>
  <!-- <van-dialog
    use-slot
    async-close
    zIndex="999"
    :showConfirmButton="false"
    :show="show"
  > -->
  <view>
    <van-popup
      use-slot
      async-close
      zIndex="999"
      :showConfirmButton="false"
      :show="show"
    >
      <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo($event, 1)">去反馈</button> -->
      <view class="auth-pop">
        <view class="img_box">
          <!-- <image src="../static/userinfo.svg" mode="widthFix"></image> -->
        </view>
        <view class="content_box">
          <view class="title">欢迎使用<text>{{extConfig.appName ? extConfig.appName : 'NexT+服务中心'}}</text></view>
          <view class="content">我们提供反馈、销售工具箱、预约演示服务</view>
          <view class="btn_box">
            <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo($event, 1)">微信授权登录</button>
          </view>
          <view class="fot">微信授权登录后请放心使用，您的信息和数据将受到保护</view>
        </view>
      </view>
      <!-- <view class="bind-container" v-if="isShowBind">
        <view class="wx-icon">
          <view class="wx-grid">
            <image src="../static/wxmp.svg"></image>
            <text>艾办公小程序</text>
          </view>
          <view class="wx-grid">
            <image class="wx-arrow" src="../static/wx-arrow.svg"></image>
          </view>
          <view class="wx-grid">
            <image src="../static/wx.svg"></image>
            <text>企业微信</text>
          </view>
        </view>
        <view class="wx-tip"><text>·</text>同意此应用获取你当前企业微信账号的企业部门职位、手机号等信息</view>
        <button @click="goBind()">立即绑定</button>
      </view> -->
    </van-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/core/api'
export default {
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDisabled: false,
      unionId: '',
      code: '',
      extConfig: {}
    }
  },
  computed: mapState([
    // 映射 this.isShowBind 为 store.state.isShowBind
    'isShowBind'
  ]),
  methods: {
    async bindGetUserInfo(event, a) {
      if (this.isDisabled) {
        return
      }
      this.isDisabled = true
      if (!event.detail.userInfo) {
        this.isDisabled = false
        return uni.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
      uni.setStorageSync('userInfo', event.detail.userInfo)
      if (!this.code) {
        await this.wxLogin()
      }
      uni.showLoading({
        title: '授权中',
        mask: true
      })
      // 检查登录状态
      this.register(event)
    },
    // 注册换取toke方法
    register(event) {
      const data = {
        appId: api.appId,
        encryptedData: event.detail.encryptedData,
        ivStr: event.detail.iv,
        jsCode: this.code
      }
      this.$http
        .post(api.registerUrl, data)
        .then(async res => {
          this.code = ''
          uni.setStorageSync('register', res.data)
          this.unionId = res.data.unionId
          const profile = await this.$store.dispatch('requestProfile')
          if (!profile.props.img_url || profile.props.img_url.indexOf('wx.qlogo') !== -1) {
            console.log('包含微信头像')
            profile.imageUrl = event.detail.userInfo.avatarUrl
            profile.props.img_url = event.detail.userInfo.avatarUrl
          }
          console.log('包含微信头像', profile)
          uni.setStorageSync('profile', profile)
          this.$store.commit('changeAuthModal', false)
          this.$emit('updateToken')
          // if (profile.userId) {
          //   this.$store.commit('changeAuthModal', false)
          //   // this.$store.commit('changeShowBind', false)
          //   this.$emit('updateToken')
          // } else {
          //   // this.$store.commit('changeShowBind', true)
          // }
          uni.hideLoading()
          setTimeout(() => {
            this.isDisabled = false
          }, 1000)
        })
        .catch(error => {
          this.code = ''
          uni.hideLoading()
          this.isDisabled = false
        })
    },
    // 微信小程序登录
    wxLogin() {
      return uni.login().then(res => {
        const [error, data] = res
        if (error) {
          this.isDisabled = false
          return uni.showToast({
            title: error,
            icon: 'none'
          })
        } else {
          this.code = data.code
        }
      })
    },
    onClose() {
      this.show = false
    },
    goBind() {
      const register = uni.getStorageSync('register')
      this.$http.get(api.webviewUrl + `?state=${register.unionId}`).then(res => {
        const url = res.data.redirectUri
        // const newUrl = url.slice(0 ,url.length - 16) + `&state=${this.unionId}` + url.slice(url.length - 16 ,url.length)
        this.$store.commit('updateWebviewUrl', url)
        uni.navigateTo({
					url: '/pages/bind'
				})
      })
    }
  },
  onLoad() {
    this.extConfig = api.extConfig
    this.wxLogin()
  },
  onHide() {
    this.code = ''
  }
}
</script>

<style lang="less">
  @import '../common/less/common.less';
  .van-popup {
    border-radius: 16upx;
  }
	.auth-pop {
		width: 620upx;
		background-color: #fff;
		overflow: hidden;
    .img_box {
      width: 620upx;
      height: 344upx;
      background: url('https://img.esenyun.com/images/20190619/c21c726bae0b4639b18eaf71a3ff2492.png');
      // background: url('https://img.esenyun.com/images/20190326/a3ce7f6366c24bf6a7b05cbc1261ba13.png');
      background-size: cover;
    }
		.content_box {
      text-align: center;
			padding: 48upx 30upx 35upx 30upx;
			box-sizing: border-box;
			.title {
				font-size: 16px;
				color: #000000;
				font-weight: bold;
			}
			.content {
				color: #939DA4;
				font-size: 13px;
        margin-top: 30upx;
        padding: 0upx 20upx;
			}
			.btn_box{
				display: flex;
				justify-content: center;
				padding: 72upx 0 50upx 0;
        margin-top: 0;
				button {
					height: 88upx;
					line-height: 88upx;
					color: #FFFFFF;
					font-size: 16px;
					padding: 0 64upx;
					background-color: @primary-color;
					border-radius: 6upx;
				}
			}
			.fot {
				font-size: 11px;
        color: #CCCCCC;
        padding-bottom: 10px;
			}
		}
	}
  .bind-container {
    width: 100vw;
    height: 100vh;
    .wx-icon {
      display: flex;
      justify-content: space-between;
      color: #333;
      font-size: 14px;
      padding: 130upx 120upx;
    }
    .wx-grid {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text {
        font-weight: bold;
      }
      image {
        width: 120upx;
        height: 120upx;
        margin-bottom: 23upx;
      }
      .wx-arrow {
        width: 40upx;
        height: 30upx;
        padding-bottom: 44upx;
      }
    }
    .wx-tip {
      color: #939DA4;
      font-size: 15px;
      position: relative;
      margin: 0 43upx;
      padding-left: 35upx;
      text {
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(2);
      }
    }
    button {
      margin: 100upx 40upx;
      background: #1F7DDE;
      border-color: #1F7DDE;
      color: #fff;
    }
  }
  .auth {
    .van-popup {
      border-radius: 10px;
    }
  }
</style>
