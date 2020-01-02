<template>
  <view class="card_body" catchtouchmove="touchmove">
    <view class="car_box card_third" v-for="item in list" :key="item">
      <view style="margin-bottom: 10px;">
        <text class="loading_block" style="width: 30%;"></text>
        <text class="loading_block" style="width: 15%;"></text>
      </view>
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
      <view class="specific_box">
        <text class="loading_block" style=""></text>
        <text class="loading_block" style=""></text>
        <text class="loading_block" style=""></text>
        <text class="loading_block" style=""></text>
      </view>
      <view>
        <text class="loading_block" style="width: 15%;"></text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	
  data() {
		return {
			list: ['', '', '', '', '']
		}
  },
  methods: {
    hideModal() {
      this.show = false
    },
    touchmove() {

    }
  }
}
</script>
<style lang="less">
	@import '../common/less/common.less';
  .card_body{
    background: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    .car_box{
      margin-bottom: 20px;
      .specific_box{
        margin-bottom: 15px;
        .loading_block{
          width: 60px;
          height: 60px;
        }
      }
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
