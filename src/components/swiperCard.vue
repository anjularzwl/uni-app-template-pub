<template>
<view class="swiper_box">
  <!-- 卡片 -->
  <swiper
    indicator-active-color="#29ab91"
    indicator-color="rgba(0, 0, 0, .1)"
    indicator-dots="indicatorDots"
    @change="slide"
  >
    <repeat v-for="item in cardList" :key="index" index="index" item="item">
      <block>
        <swiper-item>
          <view class="card-container">
            <view class="card-child">
              <card :detail.sync="item" :extConfig.sync="extConfig"></card>
            </view>
          </view>
        </swiper-item>
      </block>
    </repeat>
  </swiper>
</view>
</template>
<script>
// components
import card from '@/components/card'
export default {
  props: {
    cardList: {
      type: Array,
      default: [],
      twoWay: true
    },
    extConfig: {
      type: Array,
      default: [],
      twoWay: true
    }
  },
  components: {
    card
  },
  data() {
    return {
      indicatorDots: true
    }
  },
  methods: {
    slide(e) {
      let event = e.detail
      if (event.source === 'touch') {
        this.$emit('getCurrent', event.current)
      }
    }
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';
  swiper {
    min-height: 600px;
  }
  .swiper_box {
    padding: 0 10px;
  }
  .card-child{
    box-shadow: 0rpx 60rpx 70rpx -20rpx rgba(204, 204, 204, 0.6);
  }
</style>
