<template>
  <view class="more">
    <view v-if="isLoading">
      <van-loading size="14px"/>
      <text class="loading-tip">正在加载中</text>
    </view>
    <view v-if="isAll">
      <text class="loading-tip">已加载全部</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      isAll: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
.more {
  text-align: center;
}
.loading-tip {
  padding: 10upx 0 15upx 0;
  margin-left: 5px;
  font-size: 12px;
  color: #999;
}
</style>