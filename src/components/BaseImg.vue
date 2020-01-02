<template>
  <view>
    <image :src="item.url" v-for="item in imgList" :key="item.id" @click="openImg(item)">
      {{ item }}
    </image>
  </view>
</template>

<script>
  export default {
    props: {
      imgList: {
        type: Array,
        default: []
      }
    },
    methods: {
      openImg(item) {
        console.log(item)
        const urls = this.imgList.map(i => i.url)
        uni.previewImage({
          current: item.url, // 当前显示图片的http链接
          urls // 需要预览的图片http链接列表
        })
      }
    },
  }
</script>

<style scoped>

</style>
