<template>
  <view class="avatar">
    <image :src="avatar" :style="{width: avatarSize, height: avatarSize}"></image>
    <view class="msg">
      <view class="name van-ellipsis" :style="{'font-size': size.titleSize ? size.titleSize + 'px' : '15px', 'font-weight': weight ? 'bold' : 'normal'}">{{name ? name : '暂无'}}</view>
      <view class="title" :style="{'font-size': size.subTitleSize ? size.subTitleSize + 'px' : '11px'}">
        {{title}}  <text v-if="sourceType && sourceType === 'WB'">来自小白板</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      name: '',
      imgUrl: '',
      sourceType: '',
      title: '',
      size: {
        type: Object,
        default: {}
      },
      weight: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      avatarSize: function() {
        if (this.size.avatarSize) {
          return uni.upx2px(this.size.avatarSize) + 'px'
        } else {
          return uni.upx2px(72) + 'px'
        }
      },
      maxWidth: function() {
        if (this.size.maxWitdh) {
          return uni.upx2px(this.size.maxWitdh) + 'px'
        } else {
          return uni.upx2px(400) + 'px'
        }
      },
      avatar: function() {
        if (this.imgUrl) {
          return this.imgUrl + '?x-oss-process=image/resize,m_fill,h_400,w_400'
        } else {
          return 'https://img.esenyun.com/images/20190329/b94504cf0fd248cbabe1a3f4c486e0f7.png'
        }
      },
      getTitle: function() {

      }
    }
  }
</script>

<style scoped lang="less">
@import '../common/less/common.less';
.avatar {
  display: flex;
  image {
    width: 72upx;
    height: 72upx;
    border-radius: 50%;
    margin-right: 12upx;
  }
  .name {
    width: 100%;
    font-size: 15px;
    color: #000;
    max-width: 350upx;
    height: 42upx;
  }
  .title {
    color: @text-color-light;
    font-size: 11px;
    text{
      margin-left: 12upx;
    }
  }
  .msg {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 400upx;
  }
}
</style>