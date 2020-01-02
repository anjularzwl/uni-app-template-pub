<template>
  <view class="offical-account">
    <van-popup
      use-slot
      async-close
      zIndex="999"
      :showConfirmButton="false"
      :show="show"
    >
      <view class="official">
        <!-- <view class="official_top" wx:if="{{extConfig.appId}}" style="background-image:url('{{extConfig.officialIcon}}');">
          <text>{{extConfig.appName}}</text>
        </view> -->
        <view class="official_top">
          <text>艾办公</text>
        </view>
        <view class="official_bot">
          <view class="bot_title">关注公众号</view>
          <view class="bot_content"><text class="bot_num">回复“6”</text>关注<text>NexT+</text>微信公众号，第一时间接收结果通知。</view>
          <button open-type="contact">去关注</button>
          <view class="close_official">
            <!-- <image src="https://img.esenyun.com/images/20190428/6685e6051c524ac888b44dd0e2438bfc.png" @click="closeOfficial"></image> -->
            <image src="../static/close-wh.svg" @click="closeOfficial"></image>
          </view>
        </view>
      </view>
    </van-popup>
  </view>
</template>

<script>
  export default {
    props: {
      // 是否显示
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeOfficial() {
        this.$store.commit('closeOf')
        this.$emit('change', {})
      }
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.offical-account {
  .van-popup {
    border-radius: 20upx;
    width: 75%;
    overflow: inherit;
  }
  .official{
    background: #fff;
    border-radius: 16upx;
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
      padding: 50upx;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      .bot_title{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
      }
      .bot_content{
        margin-top: 32upx;
        font-size: 14px;
        line-height: 40upx;
        color: #333333;
        .bot_num{
          color: @primary-color;
          font-weight: bold;
        }
      }
      button {
        margin-top: 80upx;
        width: 268upx;
        height: 80upx;
        line-height: 80upx;
        color: #fff;
        font-size: 14px;
        background: @primary-color;
        border-radius: 60upx;
      }
      .close_official{
        position: absolute;
        left: 0;
        bottom: -137upx;
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