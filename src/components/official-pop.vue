<template>
  <view class="official_box" v-if="account == 'true'">
    <view class="official">
      <view class="official_top" v-if="extConfig.appId" :style="{background:url('extConfig.officialIcon')}">
        <text>{{extConfig.appName}}</text>
      </view>
      <view class="official_top" v-if="!extConfig.appId">
        <text>NexT+客户反馈</text>
      </view>
      <view class="official_bot">
        <view class="bot_title">关注公众号</view>
        <view class="bot_content"><text class="bot_num">回复“6”</text>关注<text>{{extConfig.appId ? extConfig.officialName : 'NexT+小助手'}}</text>微信公众号，第一时间接收结果通知。</view>
        <button open-type="contact">去关注</button>
        <view class="close_official">
          <image src="https://img.esenyun.com/images/20190213/3baed53110544135968351ca0b2dd7e8.png" @tap="closeOfficial"></image>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    account: {
      type: String,
      default: '1'
    }
  },
  data() {
		return {
			isOfficial: false,
			extConfig: {}
		}
  },
  methods: {
    closeOfficial() {
      this.account = 'false'
      // uni.setStorageSync('isOfficial', true)
       
    }
  },
  onLoad() {
    this.extConfig = this.$parent.extConfig
    console.log('--', this.extConfig)
    console.log('--', this.account)
    // if (uni.getStorageSync('isOfficial')) {
    //   this.isOfficial = false
    // } else {
    //   this.isOfficial = true
    // }
    if (this.account === 'true') {
      this.isOfficial = true
      console.log('???')
       
    } else {
      this.isOfficial = false
       
    }
     
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';
  .official_box{
    z-index: 10;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .official{
      margin-bottom: 20%;
      width: 76%;
      background: #fff;
      border-radius: 8px;
      // overflow: hidden;
      .official_top{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 100px;
        width: 100%;
        background: url('https://img.esenyun.com/images/20190215/7c57e7d75b77446ab680c9a5f715aee4.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
      }
      .official_bot{
        padding: 25px;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        .bot_title{
          font-size: 18px;
          color: #333333;
          font-weight: bold;
        }
        .bot_content{
          margin-top: 16px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
          .bot_num{
            color: @primary-color;
            font-weight: bold;
          }
        }
        button{
          margin-top: 40px;
          width: 134px;
          height: 40px;
          line-height: 40px;
          color: #fff;
          font-size: 14px;
          background: linear-gradient(to right, @tranform-color, @primary-color-sup-1);
          border-radius: 30px;
        }
        .close_official{
          position: absolute;
          left: 0;
          bottom: -60px;
          width: 100%;
          text-align: center;
          image{
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>
