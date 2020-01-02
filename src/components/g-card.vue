<template>
  <view class="card_body">
    <view class="card_box">
      <view style="text-align:center;">
        <text class="loading_block" style="width: 90%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 18%;"></text>
        <text class="loading_block" style="width: 18%;"></text>
        <text class="loading_block" style="width: 18%;"></text>
        <text class="loading_block" style="width: 18%;"></text>
        <text class="loading_block" style="width: 18%;"></text>
      </view>
    </view>
    <view class="card_box">
      <view class="loading_block" style="width: 30%;"></view>
      <view>
        <text class="loading_block" style="width: 50%;"></text>
        <text class="loading_block" style="width: 10%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 22%;"></text>
        <text class="loading_block" style="width: 30%;"></text>
      </view>
      <view style="text-align:center;">
        <text class="loading_block" style="width: 65%;"></text>
      </view>
      <view style="text-align:center;">
        <text class="loading_block" style="width: 21%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
        <text class="loading_block" style="width: 40%;"></text>
      </view>
    </view>
    <view class="card_box card_third">
      <view class="loading_block" style="width: 30%;"></view>
      <view>
        <text class="loading_block" style="width: 28%;"></text>
        <text class="loading_block" style="width: 62%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 22%;"></text>
        <text class="loading_block" style="width: 66%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 56%;"></text>
        <text class="loading_block" style="width: 39%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 21%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 40%;"></text>
        <text class="loading_block" style="width: 39%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 21%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
        <text class="loading_block" style="width: 40%;"></text>
      </view>
    </view>
    <view class="card_box card_third">
      <view class="loading_block" style="width: 30%;"></view>
      <view>
        <text class="loading_block" style="width: 28%;"></text>
        <text class="loading_block" style="width: 62%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 22%;"></text>
        <text class="loading_block" style="width: 66%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 56%;"></text>
        <text class="loading_block" style="width: 39%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 21%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 40%;"></text>
        <text class="loading_block" style="width: 39%;"></text>
      </view>
      <view>
        <text class="loading_block" style="width: 21%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
        <text class="loading_block" style="width: 40%;"></text>
      </view>
    </view>
    <view class="card_box">
      <view class="loading_block" style="width: 30%;"></view>
      <view>
        <text class="loading_block" style="width: 28%;"></text>
        <text class="loading_block" style="width: 62%;"></text>
      </view>
      <view style="padding-left:10%">
        <text class="loading_block" style="width: 22%;"></text>
        <text class="loading_block" style="width: 56%;"></text>
      </view>
      <view style="padding-left:10%">
        <text class="loading_block" style="width: 56%;"></text>
        <text class="loading_block" style="width: 39%;"></text>
      </view>
      <view style="padding-left:10%">
        <text class="loading_block" style="width: 21%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
      </view>
      <view style="padding-left:10%">
        <text class="loading_block" style="width: 22%;"></text>
        <text class="loading_block" style="width: 66%;"></text>
      </view>
      <view style="padding-left:10%">
        <text class="loading_block" style="width: 40%;"></text>
        <text class="loading_block" style="width: 39%;"></text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.show = false
    }
  }
}
</script>
<style lang="less">
  .card_body{
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    .card_box{
      margin-bottom: 20px;
      .loading_block{
        display: inline-block;
        margin: 5px 1% 0;
        height: 16px;
        border-radius: 2px;
        background: linear-gradient(90deg,rgba(207,216,220,.2),rgba(207,216,220,.4),rgba(207,216,220,.2));
        -webkit-animation: card-loading 1.4s ease infinite;
        animation: card-loading 1.4s ease infinite;
        background-size: 600% 600%;
      }
    }
  }
  @keyframes card-loading {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>
