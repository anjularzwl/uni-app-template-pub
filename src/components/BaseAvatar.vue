<template>
  <view class="avatar" :style="{'align-items': flex}">
    <image lazy-load :src="avatar" :style="{width: avatarSize, height: avatarSize}" v-if="!imgShow"></image>
    <image lazy-load @load="load" :src="avatar" :style="{width: avatarSize, height: avatarSize}" v-else></image>
    <view class="msg" :style="{'max-width': maxWidth}">
      <view class="name van-ellipsis" :style="{'max-width': maxWidth, 'font-size': size.titleSize ? size.titleSize + 'px' : '15px', 'font-weight': weight ? 'bold' : 'normal'}">{{profile.name ? profile.name : '暂无'}}</view>
      <view
        class="position van-multi-ellipsis--l2"
        :style="{'max-width': maxWidth, 'font-size': size.subTitleSize ? size.subTitleSize + 'px' : '11px'}"
        v-if="position || profile.departMent"
      >{{ profile.departMent || '' }} {{ profile.departMent && position ? '|' : ''}} {{position || ''}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        imgShow: false
      }
    },
    props: {
      flex: {
        type: String,
        defalut: 'initial'
      },
      profile: {
        type: Object,
        default: {}
      },
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
        if (this.profile.avatar || this.profile.imageUrl) {
          return this.profile.avatar ? this.profile.avatar + '?x-oss-process=image/resize,m_fill,h_400,w_400' : this.profile.imageUrl  + '?x-oss-process=image/resize,m_fill,h_400,w_400'
        } else {
          return 'https://img.esenyun.com/images/20190329/b94504cf0fd248cbabe1a3f4c486e0f7.png'
        }
      },
      position: function () {
        return this.profile.position || this.profile.title
      }
    },
    methods: {
      load(e) {
        this.imgShow = true
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
    max-width: 400upx;
  }
  .position {
    color: @text-color-light;
    font-size: 11px;
    max-width: 400upx;
  }
  .msg {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 400upx;
  }
}
</style>
