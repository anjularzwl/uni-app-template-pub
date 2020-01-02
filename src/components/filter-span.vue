<template>
  <view class="tag-container">
    <view class="tag-item" v-for="item in tagList" :key="item.id">
      <view class="tag text-overflow">{{item.name}}</view>
      <image src="../assets/images/delete.png" @tap="deleteStatus(item)"></image>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
      default: []
    }
  },
  methods: {
    deleteStatus(item) {
      this.$emit('deleteTag', item)
    }
  },
  onLoad() {
    console.log(this.tagList)
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';
.tag-container {
  height: 98rpx;
  padding:26rpx 0;
  box-sizing:border-box;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.tag {
  width: 150rpx;
  height: 50rpx;
  display: inline-block;
  line-height: 50rpx;
  color: @primary-color;
  font-size: 24rpx;
  border-radius: 40rpx;
  border: 1px solid @primary-color;
  background: fade(@primary-color, 10%);
  text-align: center;
  padding: 0 10rpx;
  font-weight: bold;
}
.tag-item {
  display: inline-block;
  position: relative;
  margin-left: 20rpx;
  image {
    position: absolute;
    top: -12rpx;
    right: -8rpx;
    width: 30rpx;
    height: 30rpx;
  }
}
</style>
