

export default {
  data () {
  },
  methods: {
    // 播放语音
    playVioce(_this, url) {
      _this.innerAudioContext.src = url
      _this.innerAudioContext.play()
      _this.innerAudioContext.onEnded(() => {
        _this.isPlay = false
      })
    },
    // 暂停语音
    pauseVoice(_this, url) {
      _this.innerAudioContext.src = url
      _this.innerAudioContext.pause()
      _this.innerAudioContext.onEnded(() => {
        _this.isPlay = false
      })
    }

  },

  onShow() {
  },

  onLoad() {
  }
}
