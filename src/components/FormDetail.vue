<template>
  <view class="detail-form">
    <view v-for="item in transformTemplate" :key="item.id">
      <view class="detail-list" v-if="item.hint === 'TEXTAREA' || item.hint === 'INPUT' || item.hint === 'INPUTNUMBER' || item.hint === 'INPUTCASH' || item.hint === 'DATEPICKER'  || item.hint === 'RADIO_GROUP' || item.hint === 'CHECKBOX_GROUP'">
        <view class="detail-label">
          {{item.label}}
          <!-- <text class="required" v-if="item.required">*</text> -->
          <!-- <text class="name">{{item.label}}</text> -->
        </view>
        <text class="detail-content" selectable>
          {{item.value}} <text v-if="item.unit && item.value !== '暂无'">   ({{item.unit}})</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      template: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        saveCheckbox: null
      }
    },
    mounted() {
      setTimeout(() => {
        this.show = true
      }, 5000)
    },
    computed: {
      transformTemplate: {
        // getter
        get: function () {
          let newTemplate
          if (this.template && this.template !== '' && this.template !== '{}') {
            newTemplate = JSON.parse(this.template).jsonTemplate
          } else {
            return false
          }
          newTemplate.forEach(item => {
            console.log('详情数据', item)
            if (item.hint === 'RADIO_GROUP') {
              item.options.forEach(i => {
                i.text = i.value
              })
            }
            if (item.hint === 'DATEPICKER') {
              item.value = item.value ? moment(item.value).format('YYYY年MM月DD日') : '暂无'
            }
            if (item.hint === 'CHECKBOX_GROUP') {
              item.value = this.getCheckboxVal(item.options)
            }
            item.value = item.value || '暂无'
          })
          return newTemplate
        }
      }
    },
    methods: {
      // 处理多选值
      getCheckboxVal(options) {
        let newShowText = ''
        if (options) {
          options.forEach(i => {
            if (i.checked) {
              newShowText = `${newShowText}${i.value}、`
            }
          })
        }
        return newShowText ? newShowText.slice(0, newShowText.length - 1) : '暂无'
      },
    },
    onLoad() {
     console.log('load')
    },
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.detail-form {
  .checkbox-container {
    width: toUpx(100);
    max-height: 50vh;
    overflow: auto;
    padding: 20upx;
  }
  .detail-list{
    display: flex;
    margin-bottom: 20upx;
    .detail-label{
      max-width: 200upx;
      min-width: 200upx;
      color: #999999;
      font-size: 16px;
    }
    .detail-content{
      color: #111111;
      font-size: 16px;
      text-align: justify;
      margin-left: 12upx;
    }
  }
}
</style>
