<template>
  <view class="attach-container" :class="{largeAttach: size === 200}">
    <view
      class="attach-card"
      :style="{width: autoSize, height: autoSize}"
      :title="item.name"
      v-for="(item, index) in imgs"
      :key="item.id"
      @click="openImg(item)">
      <image :src="item + '?x-oss-process=image/resize,m_fill,h_400,w_400'"></image>
      <image src="../static/close-red.svg" class="delete-file" @click.stop="deleteAttach($event, index, 'imgs')" v-if="!readonly"></image>
    </view>
    <view
      class="attach-card"
      :title="item.name"
      :style="{background: item.background, width: autoSize, height: autoSize}"
      v-for="(item, index) in list"
      :key="item.id"
      @click="clickOpen(item)">
      <view class="name van-multi-ellipsis--l2" :style="{fontSize: fontSize}">{{item.name}}</view>
      <view class="name size" :style="{fontSize: fontSize}">{{item.size ? item.showSize : ''}}</view>
      <image src="../static/close-red.svg" class="delete-file" @click.stop="deleteAttach($event, index, 'attchList')" v-if="!readonly">></image>
      <image class="attach-icon" src="../static/pdf.svg" v-if="item.type === 'pdf'"></image>
      <image class="attach-icon" src="../static/word.svg" v-if="item.type === 'docx' || item.type === 'doc'"></image>
      <image class="attach-icon" src="../static/excel.svg" v-if="item.type === 'xlsx' || item.type === 'xls'"></image>
      <image class="attach-icon" src="../static/ppt.svg" v-if="item.type === 'ppt' || item.type === 'pptx'"></image>
      <image class="attach-icon" src="../static/unkonw.svg" v-if="item.type !== 'pdf' && item.type !== 'ppt' && item.type !== 'pptx' && item.type !== 'docx' && item.type !== 'doc' && item.type !== 'xlsx' && item.type !== 'xls'"></image>
    </view>
    <view class="add attach-card" :style="{width: autoSize, height: autoSize}" @click="openModal()" v-if="imgs.length + attchList.length < max && !readonly">
      <image src="../static/add.svg"></image>
    </view>
    <van-popup
      :show="progressStatus && !ownerProgress"
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
  import api from '@/core/api'
  import BaseImg from '@/components/BaseImg'
  let task = null
  export default {
    components: {
      BaseImg
    },
    data () {
      return {
        progressStatus: false,
        isNetType: 'download',
        progress: 0,
        actions: [
          {
            name: '拍照上传'
          },
          {
            name: '从相册选择图片上传'
          },
          {
            name: '从聊天会话上传附件'
          }
        ]
      }
    },
    props: {
      // 自己的进度条
      ownerProgress: {
        type: Boolean,
        default: false
      },
      // 附件列表
      attchList: {
        type: Array,
        default: []
      },
      // 图片列表
      imgs: {
        type: Array,
        default: []
      },
      // 最多支持附件数
      max: {
        type: Number,
        default: 12
      },
      // 图片大小
      size: {
        type: Number,
        default: 220
      },
      // 字体大小
      fontSize: {
        type: String,
        default: '14px'
      },
      // 只读
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      list: function () {
        if (this.attchList.length) {
          const typeMaps = {
            ppt: '#E25535',
            pptx: '#E25535',
            docx: '#2C97FF',
            doc: '#2C97FF',
            xls: '#20B648',
            xlsx: '#20B648',
            pdf: '#EA2D2D'
          }
          this.attchList.forEach(item => {
            item.showSize = this.getFileSize(item.size)
            item.type = this.getType(item.name)
            item.background = typeMaps[item.type] ? typeMaps[item.type] : '#B7BBB8'
          })
        }
        console.log(this.attchList)
        return this.attchList
      },
      autoSize: function() {
        console.log('size', this.size)
        return uni.upx2px(this.size) + 'px'
      }
    },
    methods: {
      getFileSize(fileByte) {
        let fileSizeByte = fileByte
        let fileSizeMsg = ''
        if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(0) + 'K'
        else if (fileSizeByte == 1048576) fileSizeMsg = '1M'
        else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(0) + 'M'
        else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = '1G'
        else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(0) + 'G'
        else fileSizeMsg = '文件超过1TB'
        return fileSizeMsg
      },
      openModal() {
        this.$store.commit('updateAttachModal', true)
        uni.showActionSheet({
          itemList: ['拍照上传', '从相册选择图片上传', '从聊天会话上传附件'],
          success: res => {
            this.$store.commit('updateAttachModal', false)
            if (res.tapIndex === 0) {
              this.uploadImgs('camera')
            } else if (res.tapIndex === 1) {
              this.uploadImgs('album')
            } else {
              this.uploadFile()
            }
          },
          fail: res => {
            this.$store.commit('updateAttachModal', false)
            this.$emit('attachChange', {imgs: this.imgs, attach: this.attchList})
          }
        });
      },
      getType (name) {
        if (this.checkType(name)) {
          return name.toLocaleLowerCase().substr(name.lastIndexOf('.') + 1)
        } else {
          return 'not'
        }

      },
      async clickOpen(item) {
        if (item.type === 'not') {
          return uni.showToast({
            title: '此附件小程序暂不支持预览',
            icon: 'none'
          })
        }
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
            this.openDocument(path, item.type)
          }
        } else {
           console.log('下载打开')
          this.downloadFile(item)
        }
      },
      async downloadFile(item) {
        const resp = await this.$http.get(api.refreshUrl + item.url)
        if (resp.statusCode === 200) {
          this.progressStatus = true
          task = uni.downloadFile({
            url: resp.data.url,
            success: (data) => {
              task = null
              this.progressStatus = false
              this.progress = 0
              let filePath = data.tempFilePath
              item.tempFilePath = filePath
              this.openDocument(filePath, item.type)
            },
            fail: (e) => {
              task = null
              this.progressStatus = false
              this.progress = 0
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
            this.progress = res.progress
            this.progressStatus = true
            this.isNetType = 'download'
          })
        }
      },
      openDocument(filePath, type) {
        console.log(333, type)
        uni.openDocument({
          filePath,
          fileType: type
        }).then(res => {
          console.log('打开文档成功')
        }).catch(e => {
          console.log('打开失败')
        })
      },
      checkType(name) {
        name = name.toLocaleLowerCase()
        if (!name) {
          return false
        }
        if (name.indexOf('.') === -1) {
          return false
        } else {
          const type = name.toLocaleLowerCase().substr(name.lastIndexOf('.') + 1)
          const applyType = ['ppt', 'pptx', 'docx', 'doc', 'xls', 'xlsx', 'pdf']
          if (applyType.indexOf(type) === -1) {
            return false
          } else {
            return true
          }
        }
      },
      // 打开图片
      openImg(item) {
        uni.previewImage({
          current: item, // 当前显示图片的http链接
          urls: this.imgs // 需要预览的图片http链接列表
        })
      },
      // 上传
      uploadImgs(type) {
        this.$store.commit('updateAttachModal', true)
        uni.chooseImage({
          count: this.max - this.imgs.length - this.attchList.length, // 默认9
          sourceType: [type] //从相册选择
        }).then(async res => {
          if (!res[1]) {
            return this.$store.commit('updateAttachModal', false)
          }
          const imgs = res[1].tempFilePaths
          if (imgs.length) {
            uni.showLoading({
              mask: true,
              title: '上传图片中'
            })
            let isError = false
            for (let index = 0; index < imgs.length; index++) {
              const item = imgs[index]
              const [error, data] = await this.$http.uploadImg(api.imgUrl, item)
              if (data.statusCode !== 200) {
                isError = true
                uni.showToast({
                  title: JSON.parse(data.data).message || '系统繁忙',
                  icon: 'none',
                  duration: 3000
                })
              } else {
                this.imgs.push(JSON.parse(data.data).imageUrl)
              }
            }
            if (isError) {
              return uni.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 3000
              })
            }
            this.$emit('attachChange', {imgs: this.imgs, attach: this.attchList})
            this.$store.commit('updateAttachModal', false)
            console.log(31, this.imgs)
            uni.hideLoading()
          }
        }).catch(e => {
          uni.showToast({
            title: '图片超过最8M限制',
            icon: 'none',
            duration: 3000
          })
        })
      },
      // 上传附件
      uploadFile() {
        if (this.max === this.imgs.length - this.attchList.length) {
          return uni.showToast({
            title: '附件个数不能超过最大数',
            icon: 'none',
            duration: 3000
          })
        }
        uni.chooseMessageFile({
          count: 1,
          type: 'file',
        }).then(res => {
          this.$store.commit('updateAttachModal', true)
          const [error, resp] = res
          this.isNetType = 'upload'
          console.log(31313133, resp)
          if (!resp) {
            return this.$store.commit('updateAttachModal', false)
          }
          if (resp.tempFiles[0].size > 52428800) {
            return uni.showToast({
              title: '附件大小不能超过50M',
              icon: 'none',
              duration: 3000
            })
          }
          console.log(resp.tempFiles[0].path)
          let path = '/wxapp/' + resp.tempFiles[0].name
          // path = path.substring(path.indexOf('//') + 2, path.length)
          // path = path.replace('_', '/')
          this.$http.post(api.newFileUrl + '?groupId=wxapp&nameSpace=PUBLIC&path=' + path, {}).then(result => {
            // 文件上传服务
            task = uni.uploadFile({
              url: result.data.host,
              filePath: resp.tempFiles[0].path,
              name: 'file',
              formData: result.data,
              success: suc => {
                task = null
                this.$store.commit('updateAttachModal', false)
                const fileData = JSON.parse(suc.data)
                this.progressStatus = false
                this.attchList.push({
                  name: resp.tempFiles[0].name,
                  nameSpace: 'PUBLIC',
                  path: fileData.path,
                  url: fileData.url,
                  size: fileData.size,
                  tempFilePath: resp.tempFiles[0].path,
                  type: this.getType(resp.tempFiles[0].name)
                })
                this.$emit('attachChange', {imgs: this.imgs, attach: this.attchList})
              },
              fail: e => {
                task = null
                this.progressStatus = false
                this.$store.commit('updateAttachModal', false)
                uni.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 3000
                })
              }
            })
            task.onProgressUpdate((res) => {
              console.log(res)
              this.progress = res.progress
              this.progressStatus = true
              this.$emit('progress', res.progress)
            })
          })
        })
      },
      // 停止进度
      close() {
        this.progressStatus = false
        task.abort()
      },
      // 删除附件
      deleteAttach(e, index, type) {
        this[type].splice(index, 1)
        this.$emit('attachChange', {imgs: this.imgs, attach: this.attchList})
      }
    },
  }
</script>

<style lang="less">
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
.largeAttach{
  margin-left:20upx!important;
  .attach-card {
    &:nth-child(3n-1) {
      margin: 10upx 30rpx 20rpx 30rpx!important;
    }
  }
}
.attach-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .attach-card {
    width: 200upx;
    height: 200upx;
    margin-bottom: 10upx;
    position: relative;
    &:nth-child(3n-1) {
      margin: 0 10rpx 10rpx 10rpx;
    }
    .attach-icon {
      width: 58upx;
      height: 68upx;
      position: absolute;
      right: 15upx;
      bottom: 15upx;
    }
    .name {
      margin: 17upx;
      font-size: 14px;
      color: #fff;
      word-break: break-all;
    }
    .size {
      position: absolute;
      bottom: -3%;
    }
    image {
      width: 100%;
      height: 100%;
    }
    .delete-file {
      width: 44upx;
      height: 44upx;
      position: absolute;
      right: -17upx;
      top: -14upx;
    }
  }
  .add {
    background: #f5f5f5;
    width: 200upx;
    height: 200upx;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 68upx;
      height: 68upx;
    }
  }
}
</style>
