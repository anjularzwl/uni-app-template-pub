<template>
  <view class="voice-box" v-if="show">
    <view class="speak">
      <view class="sp-left" :class="voiceLevel" @tap.stop="changeIsPlay()">
        <view class="listen-box" :class="{'icon-audio-playing': isPlay}">
        </view>
        <text>{{time}}</text>
      </view>
      <view class="sp-right" @tap="deleteV()" v-if="isDeleteIcon">
        <image src="https://img.esenyun.com/images/20190509/e062d603007940c1b8a99719c8d43d43.png"></image>
      </view>
    </view>
  </view>
</template>
<script>
// api
import api from '@/core/api'
export default {
  props: {
    show: {
      type: Boolean
    },
    isDeleteIcon: {
      type: Boolean
    },
    voice: {
      type: Object
    },
    voiceLevel: {
      type: String
    },
    time: {
      type: String
    }
  },
  data() {
    return {
      isPlay: false,
      innerAudioContext: null
    }
  },
  methods: {
    changeIsPlay() {
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        this.replaceUrl()
      } else {
        this.pauseVoice()
      }
    },
    // 更换链接
    replaceUrl() {
      this.$http.get(api.objectUrl + '?url=' + this.voice.urls).then(res => {
        console.log('voice', res)
        this.playVioce(res.data.url)
      }).catch(error => {
        uni.showToast({
          icon: 'none',
          title: '链接无效'
        })
        this.isPlay = false
      })
    },
    // 播放音频
    playVioce(url) {
      this.isPlay = true
      console.log(this.voice)
      this.innerAudioContext.src = url
      this.innerAudioContext.play()
      this.innerAudioContext.onEnded(() => {
        console.log('播放完毕')
        this.isPlay = false
      })
      this.innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
        uni.showToast({
          icon: 'none',
          title: '格式错误'
        })
        this.isPlay = false
      })
    },
    // 暂停播放音频
    pauseVoice() {
      this.isPlay = false
      console.log(this.voice)
      this.innerAudioContext.src = this.voice.urls
      this.innerAudioContext.pause()
      this.innerAudioContext.onEnded(() => {
        console.log('播放完毕')
        this.isPlay = false
      })
    },
    // 删除语音
    deleteV() {
      console.log(this.voiceLevel)
      this.voice = {}
      this.show = false
      this.isPlay = false
      this.$emit('deleteVoice', this.show)
    }
  },
  onLoad() {
    this.innerAudioContext = uni.createInnerAudioContext()
  },
  onUnload() {
    this.innerAudioContext.pause()
    this.isPlay = false
  },
  onHide() {
    this.innerAudioContext.pause()
    this.isPlay = false
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';
  .voice-box {
    text-align: left;
    padding: 0px;
    .speak image {
      vertical-align: middle;
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
    .sp-left {
      background-color: #F8F8F8;
      min-width: 110px;
      display: inline-block;
      border-radius: 4px;
      margin-right: 20px;
      padding: 0 10px;
      box-sizing: border-box;
      color: @primary-color;
      font-size: 16px;
      vertical-align: middle;
      line-height: 34px;
      border: 1rpx solid #E8E8E8;
    }
    .sp-left image {
      margin-right: 10px;
    }
    .sp-left text {
      vertical-align: middle;
      font-size: 14px;
      color: #666666;
    }
    .sp-right {
      display: inline-block;
    }
    .sp-right image {
      width: 20px;
      height: 20px;
    }
    .listen-box{
      width: 42rpx;
      height: 42rpx;
      display: inline-block;
      margin-right: 8px;
      background-image: url('https://img.esenyun.com/images/20180630/52f11a84b82c45fe90159e213a11ae8b.png');
      background-size: 100% 100%;
      vertical-align: middle;

    }
    .icon-audio-playing{
      animation: audio-playing 1s infinite;
      -webkit-animation: audio-playing 1s infinite;
    }
    @keyframes record-animation-playing {
      50% {
        background-image: url('https://img.esenyun.com/images/20180704/3daef92cb9b84902a3e7d2f249ef9070.png');
      }
      100% {
        background-image: url('https://img.esenyun.com/images/20180704/d91dcf3c1f714b3c81eb9444a0adf534.png');
      }
    }
    @-webkit-keyframes record-animation-playing {
      50% {
        background-image: url('https://img.esenyun.com/images/20180704/3daef92cb9b84902a3e7d2f249ef9070.png');
      }
      100% {
        background-image: url('https://img.esenyun.com/images/20180704/d91dcf3c1f714b3c81eb9444a0adf534.png');
      }
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
  }
</style>
