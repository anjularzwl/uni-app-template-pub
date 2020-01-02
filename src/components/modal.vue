<template>
<view>
  <!-- 弹窗 -->
  <view class="modal-mask" @tap="hideModal" v-if="show"></view>
  <view class="modal-dialog" v-if="show">
    <view class="content">
      <image src="https://img.esenyun.com/images/20190513/614017798d9f424fa51a2ee6c653be5c.png"></image>
      <view>保存成功</view>
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
.show-btn {
  margin-top: 100rpx;
  color: #22cc22;
}

.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 100;
  color: #fff;
}

.modal-dialog {
  width: 250rpx;
  position: fixed;
  top: 58%;
  left: 24%;
  z-index: 200;
  background: #f9f9f9;
  margin: -180rpx 80rpx;
  border-radius: 10rpx;
}

.modal-title {
  height: 30rpx;
  padding: 10rpx;
  font-size: 36rpx;
  color: #030303;
}

.modal-content {
  padding: 50rpx 32rpx;
}

.modal-close {
  float: right;
  width: 25rpx;
  height: 25rpx;
  margin: 5rpx 5rpx 0 0;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  height: 86rpx;
  border-top: 1px solid #dedede;
  font-size: 34rpx;
  line-height: 86rpx;
}

.btn-cancel {
  width: 50%;
  color: #666;
  text-align: center;
  border-right: 1px solid #dedede;
}

.btn-confirm {
  width: 50%;
  color: #ec5300;
  text-align: center;
}
.content {
    text-align: center;
    padding: 30rpx 0;
    image {
      width: 60rpx;
      height: 60rpx;
    }
    view {
      font-size: 15px;
    }
  }
</style>
