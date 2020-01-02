<template>
  <view class="search-container">
    <view class="search-content" :class="{'search-action-content': showAction}">
      <view class="icon">
        <image src="../static/search-icon.svg"></image>
      </view>
      <view class="search-input">
        <input type="text" confirm-type="search" :focus="isFocus" @blur="blur" @focus="focusAction" @confirm="enterAction" :placeholder="placeholder" placeholder-style="color:#A6A6A6" :value="intVal" @input="change">
        <image class="search-clear" src="../static/search-delete.svg" @click="clear" v-if="intVal"></image>
      </view>
    </view>
    <view class="cancle" v-if="showAction" @click="cancleAction">取消</view>
  </view>
</template>

<script>
  import api from '@/core/api'
  import BaseImg from '@/components/BaseImg'
  export default {
    components: {
      BaseImg
    },
    data () {
      return {
        isFocus: false
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: { // 占位符
        type: String,
        default: '搜索'
      },
      type: { // 搜素类型
        type: String,
        default: 'enter' // 默认回车有效 enter 和 change
      },
      showAction: {  // 取消按钮
        type: Boolean,
        default: false
      }
    },
    computed: {
      intVal: function() {
        return this.value
      }
    },
    methods: {
      change(e) {
        console.log(e)
        if (this.value !== e.detail.value && e.detail.cursor >= 0) {
          this.value = e.detail.value
          this.$emit('input', e.detail.value)
        }
      },
      // blur() {
      //   console.log('234')
      //   this.isFocus = false
      // },
      clear() {
        console.log('123')
        this.value = ''
        this.isFocus = false
        setTimeout(() => {
          this.isFocus = true
        }, 300)
        this.$emit('clear', '')
      },
      focusAction(e) {
        this.$emit('focus')
      },
      enterAction(e) {
        this.$emit('search', e.detail.value)
      },
      cancleAction(e) {
        console.log('cancel')
        this.value = ''
        this.$emit('cancel', e)
      }
    },
    onLoad() {
      console.log('类型数据', this.showAction, this.type, this.placeholderText)
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
  .search-container{
    display: flex;
    align-items: center;
    background: #FFFFFF;
    height: 88upx;
    padding: 0 30upx;
    justify-content: space-between;
    .search-content{
      display: flex;
      align-items: center;
      background:#F2F2F2;
      border-radius:28upx;
      padding-left:20upx;
      height:56upx;
      width: 100%;
      .icon{
        display:flex;
        align-items:center;
        image{
          width: 40upx;
          height: 40upx;
          margin: 0;
        }
      }
      .search-input{
        font-size: 14px;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        input {
          width: 100%;
        }
        .search-clear {
          position: relative;
          width: 35upx;
          height: 56upx;
          padding: 0 24upx;
        }
      }
    }
    .search-action-content{
      width: 83%;
    }
    .cancle{
      color: @primary-color;
      font-size: 14px;
      // margin-left: 26upx;
    }
  }
</style>
