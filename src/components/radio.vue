<template>
  <!-- 音频 -->
  <view class="radio-box" :class="radio.level" @tap="changePlay()">
    <view class="listen-box" :class="{'icon-audio-playing': isPlay}">
    </view>
    <text class="radio-text">{{radio.exts}}</text>
  </view>
</template>
<script>
export default {
  props: {
    radio: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      radio: {},
      innerAudioContext: null,
      isPlay: false
    }
  },
  methods: {
    changePlay() {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        this.playVioce()
      } else {
        this.pauseVoice()
      }
    }
  },
  onLoad() {
    // 注册音频
    this.innerAudioContext = wx.createInnerAudioContext()
  },
  onHide() {
    this.innerAudioContext.pause()
    this.innerAudioContext.destroy()
  },
  // 播放语音
  playVioce() {
    const _this = this
    this.innerAudioContext.src = this.radio.urls
    this.innerAudioContext.play()
    this.innerAudioContext.onEnded(() => {
      _this.isPlay = false
      _ 
    })
  },
  // 暂停语音
  pauseVoice() {
    const _this = this
    this.innerAudioContext.src = this.radio.urls
    this.innerAudioContext.pause()
    this.innerAudioContext.onEnded(() => {
      _this.isPlay = false
      _ 
    })
  }
}
</script>
<style lang="less">
.radio-box {
  margin-top: 20rpx;
  display: inline-block;
  background-color: #F8F8F8;
  border-radius: 4px;
  margin-right: 10rpx;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: normal;
  vertical-align: middle;
  line-height: 70rpx;
  border: 1rpx solid #E8E8E8;
  text {
    color:#666666;
    font-size: 14px;
  }
  .radio-text {
    // font-weight: bold;
  }
}
.v1{
  min-width: 120px !important;
}
.v2{
  min-width: 140px !important;
}
.v3{
  min-width: 160px !important;
}
.v4{
  min-width: 180px !important;
}
.listen-box{
  width: 42rpx;
  height: 42rpx;
  display: inline-block;
  background-image: url('https://img.esenyun.com/images/20180630/52f11a84b82c45fe90159e213a11ae8b.png');
  background-size: 100% 100%;
  vertical-align: middle;
}
.icon-audio-playing{
  animation: audio-playing 1s infinite;
  -webkit-animation: audio-playing 1s infinite;
}
@keyframes audio-playing {
  30% {
    background-image: url('https://img.esenyun.com/images/20180630/a13de1ffc2284114bd620ce50234d44c.png');
  }

  31% {
    background-image: url('https://img.esenyun.com/images/20180630/8f049b95535e47698bb78ed1e6ccd4e2.png');
  }

  61% {
    background-image: url('https://img.esenyun.com/images/20180630/8f049b95535e47698bb78ed1e6ccd4e2.png');
  }

  62% {
    background-image: url('https://img.esenyun.com/images/20180630/52f11a84b82c45fe90159e213a11ae8b.png');
  }

  100% {
    background-image: url('https://img.esenyun.com/images/20180630/52f11a84b82c45fe90159e213a11ae8b.png');
  }
}

@-webkit-keyframes audio-playing {
  30% {
    background-image: url('https://img.esenyun.com/images/20180630/a13de1ffc2284114bd620ce50234d44c.png');
  }

  31% {
    background-image: url('https://img.esenyun.com/images/20180630/8f049b95535e47698bb78ed1e6ccd4e2.png');
  }

  61% {
    background-image: url('https://img.esenyun.com/images/20180630/8f049b95535e47698bb78ed1e6ccd4e2.png');
  }

  62% {
    background-image: url('https://img.esenyun.com/images/20180630/52f11a84b82c45fe90159e213a11ae8b.png');
  }

  100% {
    background-image: url('https://img.esenyun.com/images/20180630/52f11a84b82c45fe90159e213a11ae8b.png');
  }
}

</style>
