<template>
  <!-- 卡片 -->
  <view class="card-bg">
    <slot name="card-body"></slot>
    <view class="card-footer" v-if="show === '1'">
      <view class="semi-circle left"></view>
      <view class="semi-circle right"></view>
      <slot name="card-footer"></slot>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    show: {
      type: String,
      default: '0'
    }
  },
  onLoad() {
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';
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
