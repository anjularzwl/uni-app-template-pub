<template>
  <view class="sort">
    <van-popup
      :show="show"
      position="top"
      overlay
      overlay-style="top: 6.5vh;"
      custom-style="top: 6.5vh;"
      @close="onClose">
      <van-radio-group :value="radio">
        <van-cell-group>
          <van-cell :title="item.name" clickable @click="onCheck(item)" v-for="item in list" :key="item.id">
            <van-radio checked-color="#1F7DDE" :name="item.id" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </view>
</template>

<script>
  export default {
    computed: {
      top: () => {
        return uni.upx2px(89) + 'px'
      }
    },
    props: {
      radio: {
        type: String,
        default: false
      },
      show: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      onClose() {
        this.show = false
        this.$emit('close', null)
      },
      onCheck(item) {
        this.radio = item.id
        this.show = false
        this.$emit('close', item.id)
      }
    }
  }
</script>

<style lang="less">
.sort {
  overflow: hidden;
}
</style>
