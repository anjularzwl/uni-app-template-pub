<template>
  <view class="video-box" v-if="isPlayVideo">
    <!-- <view class="video-bg" @tap="closeVideo()"></view>
    <view class="video-cha" @tap="closeVideo()">
      <image src="https://img.esenyun.com/images/20190509/6a5ccb93b38b4f5bb8dd9933947076ea.png"></image>
    </view> -->
    <video :src="url" id="myVideo" style="height:0px;" custom-cache="false" @fullscreenchange="closeAll($event)" v-if="isPlayVideo"></video>
  </view>
</template>
<script>
export default {
  props: {
    isPlayVideo: {
      type: Boolean
    },
    url: {
      type: String
    }
  },
  data() {
    return {
      url: '',
      isPlayVideo: false,
      videoContext: null
    }
  },
  methods: {
    closeAll(e) {
      console.log(e)
      if (!e.detail.fullScreen) {
        this.videoContext = null
        this.isPlayVideo = false
        this.$emit('close', this.isPlayVideo)
      }
    },
    startVideo(url) {
      this.url = url
      this.isPlayVideo = true
    },
    // 关闭预览视频
    closeVideo() {
      this.isPlayVideo = false
      this.$emit('close', this.isPlayVideo)
    }
  },
  onLoad() {
    setTimeout(() => {
      this.videoContext = uni.createVideoContext('myVideo', this)
      this.videoContext.requestFullScreen({ direction: 0 })
    }, 200)
  }
}
</script>
<style lang="less">
// .video-box {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   background-color: #000;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
// }
// .video-bg {
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
// }
// .video-box video {
//   width: 100%;
// }
// .video-cha {
//   position: absolute;
//   top: 20px;
//   left: 20px;
// }
// .video-cha image {
//   width: 30px;
//   height: 30px;
// }
</style>
