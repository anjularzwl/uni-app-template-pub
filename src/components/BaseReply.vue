<template>
  <view class="base-reply" catchtouchmove="preventTouchMove">
    <van-popup :z-index="20" custom-class="comment-popup" position="bottom" :show="show" overlay
      @close="onClose">
      <view style="height: 83vh;">
        <view class="pop_top">
          <text class="canle" @click="onClose()">
            取消
          </text>
          <text class="title">{{params.title ? params.title : '回复小白板'}}</text>
          <form class="sure" @submit="createComment($event)" report-submit>
            <button form-type="submit">确定</button>
          </form>
        </view>
        <textarea :show-confirm-bar="false" :adjust-position="false" fixed :focus="show && once" @blur="blur" :value="content" maxlength="4000" placeholder="请输入要回复的内容..." placeholder-class="text-class" v-if="!attachModalStauts"/>
        <!-- <textarea @confirm="setContent" :value="content" maxlength="4000" placeholder="请输入要回复的内容..." placeholder-class="text-class"/> -->
        <!-- <input class="uni-input" :value="content" @input="setContent" focus placeholder="自动获得焦点" /> -->
        <view class="hide-text" v-else>
          <text :class="{'active': !content}">{{content ? content : '请输入要回复的内容...'}}</text>
        </view>
        <scroll-view scroll-y class="text-container">
          <view class="attach-body">
            <BaseAttach :size="200" :ownerProgress="isIOS" :attchList="data.attach" :imgs="data.imgs" @attachChange="attachChange" @progress="getProgress"></BaseAttach>
          </view>
          <view class="remind_box">
            <view class="remind_line" @click="goPartChoose">
              <view class="line_left">@ 提醒TA</view>
              <view class="line_right" v-if="memberList.length">
                <view class="right_box">
                  <view class="img_box">
                    <view class="name">{{showAtText}}</view>
                    <text style="margin-left: 10upx;">共{{memberList.length}}位</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </van-popup>
    <van-popup
      :show="isStartProgress && isIOS"
    >
      <view class="progress-dialog">
        <view class="progress-txt" v-if="isNetType === 'download'">文件下载进度</view>
        <view class="progress-txt" v-else>文件上传进度</view>
        <progress :percent="progress" show-info activeColor="#1F7DDE"/>
        <!-- <image src="../static/close.svg" @click="close"></image> -->
      </view>
    </van-popup>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import api from '@/core/api'
  import BaseAttach from '@/components/BaseAttach'
  import common from '@/common/js/common'
  export default {
    components: {
      BaseAttach
    },
    computed: mapState([
      // 映射 this.filterList 为 store.state.filterList
      'attachModalStauts',
      'isIOS'
    ]),
    props: {
      show: {
        type: Boolean,
        default: false
      },
      params: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        isStartProgress: false,
        progress: 0,
        showAtText: '',
        once: true,
        btnStatus: true,
        content: '',
        memberList: [],
        data: {
          attach: [],
          imgs: []
        }
      }
    },
    onShow() {
      if (getApp().globalData.atMembers && getApp().globalData.atMembers.status) {
        this.memberList = getApp().globalData.atMembers.selectMembers
        getApp().globalData.atMembers = {
          status: false,
          selectMembers: this.memberList
        }
      }
      if (getApp().globalData.atMembers && !getApp().globalData.atMembers.selectMembers.length) {
        this.memberList = []
      }
      this.atText()
    },
    methods: {
      setContent(e) {
        console.log(3, e)
        this.content = e.detail.value
      },
      preventTouchMove () {

      },
      blur(e) {
        this.content = e.detail.value
				this.once = false
			},
      // @人显示文案
      atText() {
        this.showAtText = ''
        if (this.memberList.length) {
          this.memberList.forEach(item => {
            this.showAtText = this.showAtText + '，' + item.name
          })
          this.showAtText = this.showAtText.slice(1, this.showAtText.length)
        }
      },
      onClose() {
        this.once = true
        this.$emit('close', {})
      },
      preventTouchMove () {
      },
      attachChange(e) {
        this.once = false
        this.data = e
      },
      getProgress(e) {
        this.isStartProgress = true
        this.progress = e
        if (this.progress === 100) {
          this.isStartProgress = false
        }
      },
      // @人
      goPartChoose() {
        uni.navigateTo({
          url: `manchoose?title=提醒&globalVar=atMembers&wordId=${this.$store.state.wordDetail.detail.id}`
        })
      },
      createComment(e) {
        setTimeout(() => {
          if (e && e.detail.formId) {
            common.saveFromId(e.detail.formId)
          }
          if (!this.btnStatus) {
            return
          }
          const attach = JSON.stringify(this.data)
          console.log(11, this.content)
          console.log(12, this.data)
          if (!this.content && (!this.data.imgs.length && !this.data.attach.length)) {
            return uni.showToast({
              title: '回复内容不能为空',
              icon: 'none'
            })
          }
          if (this.content && !this.content.trim()) {
            return uni.showToast({
              title: '回复内容不能全为空格',
              icon: 'none'
            })
          }
          let putConent = this.content
          putConent += this.dealAt()
          const data = {
            wordId: this.params.id,
            commentId: this.params.commentId,
            content: putConent,
            data: attach,
            sourceType: 'WECHAT',
            replyId: this.params.replyId
          }
          this.btnStatus = false
          uni.showLoading({
            mask: true,
            title: '发表中'
          })
          this.$http.post(api.replyUrl, data).then(res => {
            uni.showToast({
              title: '回复成功',
              icon: 'success'
            })
            this.content = ''
            this.data = {
              attach: [],
              imgs: []
            }
            this.memberList = []
            this.btnStatus = true
            this.once = true
            getApp().globalData.atMembers = {
              status: false,
              selectMembers: []
            }
            this.$emit('close', res.data)
          }).catch(e => {
            this.btnStatus = true
            uni.hideLoading()
          })
        }, 300)
      },
      // 处理@人
      dealAt() {
        let content = ''
        if (this.memberList.length) {
          this.memberList.forEach(res => {
            content += '@' + res.name + ':' + res.openId + ' '
          })
          return content
        } else {
          return content
        }
      }
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.base-reply {
  .progress-dialog {
    height: 50upx;
    margin: 20upx 50upx 50upx 50upx;
    width: 500upx;
    font-size: 14px;
    text-align: center;
    position: relative;
    .progress-txt {
      margin-bottom: 10upx;
    }
    image {
      width: 30upx;
      height: 30upx;
      right: -33upx;
      position: absolute;
      top: 50upx;
      padding: 5upx;
    }
  }
  .comment-popup {
      border-radius:24upx 24upx 0 0;
      overflow: hidden;
    .text-class {
      font-size: 14px;
      color: #A6A6A6;
    }
    .pop_top {
      display: flex;
      font-size: 16px;
      border-bottom: 1px solid #e5e5e5;
      padding: 20upx 40upx;
      justify-content: space-between;
      .canle{
        color: #ccc;
      }
      .sure {
        button {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 16px;
          padding: 0;
          background: #fff;
          color: @primary-color;
        }
      }
    }
    textarea {
      padding: 47upx 40upx 0 40upx;
      margin-bottom: 47upx;
      height: 400upx;
      width: 100%;
      text-align:justify;
      font-size: 16px;
      box-sizing: border-box;
    }
    .hide-text {
      padding: 47upx 40upx 0 40upx;
      line-height: 36upx;
      height: 400upx;
      word-break: break-all;
      text {
        background: #fff;
        font-size: 16px;
      }
      .active {
        color: #999;
        font-size: 14px;
      }
    }
  }
  .text-container {
    height: calc(100% - 490upx);
    overflow: auto;
  }
  .attach-body {
    padding: 47upx 40upx 0 20upx;
  }
  .remind_box {
    margin: 65upx 30upx 0 30upx;
    // border-top: 1px solid #f0f0f6;
    // border-bottom: 1px solid #f0f0f6;
    padding-bottom: 94upx;
    box-sizing: border-box;
    .remind_line {
      height: 66upx;
      line-height: 66upx;
      box-shadow:0 4upx 10upx 0upx rgba(2,48,102,0.1);
      border-radius: 42upx;
      padding: 0 30upx;
      display: inline-block;
      // justify-content: space-between;
      align-items: center;
      .line_left {
        display: inline-block;
        font-size: 16px;
        color: @primary-color;
      }
      .line_right {
        display: inline-block;
        margin-left: 48upx;
        .right_box {
          margin-right: 10upx;
          display: flex;
          justify-content: flex-start;
          .img_box {
            font-size: 14px;
            color: #023066;
            display: flex;
            .name {
              max-width: 315upx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .arrow {
      width: 48upx;
      height: 48upx;
    }
  }
}
</style>
