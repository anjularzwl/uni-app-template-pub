<template>
  <view class="contact_box" v-if="isShow">
    <view class="contact_left">
      <image src="../static/horn.svg"></image>
      <text>点我回复“6”，关注公众号领取通知特权</text>
      <button open-type="contact">领取</button>
    </view>
    <view class="contact_close" @tap="close">×</view>
  </view>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.isShow = false
        this.$emit('contactClose', true)
      }
    }
  }
</script>

<style lang="less">
  .contact_box {
    background: #FFFBE8;
    width: 100%;
    height: 80upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0upx 32upx;
    box-sizing: border-box;
    color: #ED6A0C;
    font-size: 12px;
    .contact_left {
      display: flex;
      align-items: center;
      image {
        width: 40upx;
        height: 40upx;
        margin-right: 16upx;
      }
      text {
        margin-right: 20upx;
      }
      button {
        width: 96upx;
        height: 48upx;
        line-height: 48upx;
        background: #ffffff;
        border: 1px solid #DCDDE0;
        border-radius: 4upx;
        font-size: 12px;
        color: #ED6A0C;
        padding: 0;
      }
    }
    .contact_close {
      font-size: 20px;
      margin-bottom: 4upx;
    }
  }
</style>