<template>
  <view class="help-container">
    <view class="help-title">帮助中心</view>
    <view class="help-list" v-for="item in list" :key="item.name" @click="clickOpen(item)">
      <image src="../static/book.svg"></image>
      <text>{{item.name}}</text>
    </view>
    </view>
</template>

<script>
  import api from '@/core/api'
  export default {
    data() {
      return {
        list: [
          {
            name: '如何接收艾办公消息通知?',
            url: 'https://aosnext-yundisk.oss-cn-shanghai.aliyuncs.com/manual/how_to_receive_message.pdf',
            tempFilePath: ''
          },
          {
            name: '如何由小白板开启讨论？',
            url: 'https://aosnext-yundisk.oss-cn-shanghai.aliyuncs.com/manual/how_to_create_wb.pdf',
            tempFilePath: ''
          },
          {
            name: '如何对讨论内容形成结论？',
            url: 'https://aosnext-yundisk.oss-cn-shanghai.aliyuncs.com/manual/how_to_make_conclusion.pdf',
            tempFilePath: ''
          },
          {
            name: '如何发起审批？',
            url: 'https://aosnext-yundisk.oss-cn-shanghai.aliyuncs.com/manual/how_to_create_approval.pdf',
            tempFilePath: ''
          },
          {
            name: '如何管理我待处理的审批？',
            url: 'https://aosnext-yundisk.oss-cn-shanghai.aliyuncs.com/manual/how_to_manage_my_approval.pdf',
            tempFilePath: ''
          }
        ]
      }
    },
    onLoad() {
    },
    methods: {
      async clickOpen(item) {
        if (item.tempFilePath) {
          const path = item.tempFilePath
          const [error, data] = await uni.getFileInfo({
            filePath: path
          })
          if (error) {
            console.log('下载过的路径打不开了')
            this.downloadFile(item)
          } else {
            console.log('下载过的路径打开了')
            this.openDocument(path)
          }
        } else {
           console.log('下载打开')
          this.downloadFile(item)
        }
      },
      async downloadFile(item) {
        uni.showLoading({
          title: '打开中',
          mask: true
        })
        let task = uni.downloadFile({
          url: item.url,
          success: (data) => {
            uni.hideLoading()
            task = null
            let filePath = data.tempFilePath
            item.tempFilePath = filePath
            this.openDocument(filePath)
          },
          fail: (e) => {
            task = null
            uni.hideLoading()
            uni.showToast({
              title: '下载失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
        task.onProgressUpdate(res => {
          // console.log('下载进度' + res.progress)
          // console.log('已经下载的数据长度' + res.totalBytesWritten)
          // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite)
          // this.progress = res.progress
          // this.progressStatus = true
          // this.isNetType = 'download'
        })
      },
      openDocument(filePath) {
        uni.openDocument({
          filePath,
          fileType: 'pdf'
        }).then(res => {
          console.log('打开文档成功')
        }).catch(e => {
          console.log('打开失败')
        })
      },
    }
  }
</script>

<style lang="less">
page {
  background: #fff;
}
.help-container {
  .help-title {
    font-size: 20px;
    font-weight: bold;
    margin: 35upx 0 0 48upx;
  }
  .help-list {
    font-size: 16px;
    display: flex;
    align-items: center;
    margin: 48upx 0 48upx 48upx;
    image {
      width: 32upx;
      height: 32upx;
      margin-right: 16upx;
    }
  }
}
</style>