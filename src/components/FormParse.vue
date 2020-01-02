<template>
  <view class="create-form">
    <van-cell-group>
      <view v-for="(item,listIndex) in transformTemplate" :key="item.id">
        <!-- 单行文本解析 -->
        <van-field
          :value="item.value"
          :label="item.label"
          :required="item.required"
          :placeholder="item.placeholder"
          :readonly="readonly"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          @change="changeVal($event, item)"
          v-if="item.hint === 'INPUT'"
        />
        <!-- 多行文本解析 -->
        <van-field
          class="textarea-field"
          :type="item.changeType"
          autosize
          :show-confirm-bar="false"
          :value="item.value"
          :label="item.label"
          :required="item.required"
          :placeholder="item.placeholder"
          :readonly="readonly"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          @change="changeVal($event, item)"
          v-if="item.hint === 'TEXTAREA' && !item.editFlg"
        />
         <view class="detail-list" v-if="item.hint === 'TEXTAREA' && item.editFlg">
          <view class="detail-label">
            <text class="required" :class="{'no-required': !item.required}">*</text>
            <text class="name">{{item.label}}</text>
          </view>
          <view class="detail-content" :class="{'textarea-detail': item.hint === 'TEXTAREA', 'van-ellipsis': item.hint !== 'TEXTAREA', 'create-placehoder': !item.value}">
            <text selectable>{{item.value ? item.value : item.placeholder}}</text>
          </view>
        </view>

        <!-- 数值 -->
        <van-field
          type="digit"
          :value="item.value"
          :label="item.label"
          :required="item.required"
          :readonly="readonly"
          :placeholder="item.placeholderText"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          @change="changeVal($event, item)"
          v-if="item.hint === 'INPUTNUMBER'"
        />
        <!-- 金额 -->
        <van-field
          type="digit"
          :value="item.value"
          :label="item.label"
          :readonly="readonly"
          :required="item.required"
          :placeholder="item.placeholderText"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          @change="changeVal($event, item)"
          v-if="item.hint === 'INPUTCASH'"
        />
        <!-- 日期选择器 -->
        <!-- <van-field
          type="digit"
          readonly
          :label="item.label"
          :value="item.value ? item.formatVal : null"
          :required="item.required"
          :placeholder="item.placeholderText"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          icon="arrow"
          v-if="item.hint === 'DATEPICKER'"
          @click="open($event, item)"
        /> -->
         <view class="detail-list-option" v-if="item.hint === 'DATEPICKER'">
          <view class="detail-label">
            <text class="required" :class="{'no-required': !item.required}">*</text>
            <text class="name">{{item.label}}</text>
          </view>
          <view class="detail-content" :class="{'create-placehoder': !item.value}" @click="open($event, item)">
            <view selectable>{{item.value ? item.formatVal : item.placeholderText}}</view>
            <image src="../static/approval-right.svg"></image>
          </view>
        </view>
        <van-popup
          position="bottom"
          :show="item.isShow"
          :overlay="true"
          v-if="item.hint === 'DATEPICKER'"
        >
          <van-datetime-picker
            type="date"
            :value="item.showTime"
            :max-date="maxDate"
            @confirm="confirmDate($event, item)"
            @cancel="cancel($event, item)"
          />
        </van-popup>
        <!-- 单选选择器 -->
        <view class="detail-list-option" v-if="item.hint === 'RADIO_GROUP'">
          <view class="detail-label">
            <text class="required" :class="{'no-required': !item.required}">*</text>
            <text class="name">{{item.label}}</text>
          </view>
          <view class="detail-content" :class="{'create-placehoder': !item.value}" @click="open($event, item)">
            <view selectable>{{item.value ? item.value : item.placeholderText}}</view>
            <image src="../static/approval-right.svg"></image>
          </view>
        </view>
        <!-- <van-field
          type="digit"
          readonly
          :label="item.label"
          :value="item.value"
          :required="item.required"
          :placeholder="item.placeholderText"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          icon="arrow"
          v-if="item.hint === 'RADIO_GROUP'"
          @click="open($event, item)"
        /> -->
        <van-dialog
          use-slot
          async-close
          :show="item.isShow"
          show-cancel-button
          @cancel="cancel($event, item)"
          @confirm="confirmRadio($event, item)"
          v-if="item.hint === 'RADIO_GROUP'"
          :title="item.label"
        >
          <view class="checkbox-container">
            <van-radio-group :value="item.formValue">
              <van-cell-group>
                <van-cell v-for="child in item.options" :key="child.tabIndex" :title="child.label" clickable :data-name="child.label" :border="false" @click="onChangeRadio(child, item)">
                  <image v-if="child.label === item.formValue" @click="onChangeRadio(child, item)" src="../static/select-status.svg"></image>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </view>
        </van-dialog>
        <!-- 多选选择器 -->
        <!-- <van-field
          type="digit"
          readonly
          :label="item.label"
          :value="item.formatVal"
          :required="item.required"
          :placeholder="item.placeholderText"
          :border="listIndex === template.length ? false : true"
          input-align="right"
          icon="arrow"
          v-if="item.hint === 'CHECKBOX_GROUP'"
          @click="open($event, item)"
        /> -->
        <view class="detail-list-option" v-if="item.hint === 'CHECKBOX_GROUP'">
          <view class="detail-label">
            <text class="required" :class="{'no-required': !item.required}">*</text>
            <text class="name">{{item.label}}</text>
          </view>
          <view class="detail-content" :class="{'create-placehoder': !item.value}" @click="open($event, item)">
            <view selectable>{{item.value ? item.value : item.placeholderText}}</view>
            <image src="../static/approval-right.svg"></image>
          </view>
        </view>
        <van-dialog
          use-slot
          async-close
          :show="item.isShow"
          show-cancel-button
          @cancel="cancel($event, item)"
          @confirm="confirmDialog($event, item)"
          v-if="item.hint === 'CHECKBOX_GROUP'"
          :title="item.label"
        >
          <view class="checkbox-container">
            <van-checkbox v-for="i in item.options" :key="i.tabIndex" :value="i.checked" @change="onChange($event, i)">
              {{ i.value }}
            </van-checkbox>
          </view>
        </van-dialog>
      </view>
    </van-cell-group>
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
      readonly: {
        type: Boolean,
        default: false
      },
      status: {
        type: Boolean,
        default: false
      },
      editFlg: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dealTemplate: null,
        saveCheckbox: null,
        typeList: ['INPUT', 'TEXTAREA', 'INPUTNUMBER', 'INPUTCASH', 'DATEPICKER', 'RADIO_GROUP', 'CHECKBOX_GROUP'],
        maxDate: new Date(2050, 11, 31).getTime(),
      }
    },
    mounted() {
      setTimeout(() => {
        this.show = true
      }, 5000)
      if(this.status) {
        // console.log('this.status', this.status)
         this.$emit('change', {json: this.dealReturnVal(), allRequired: this.isRequired()})
      }
    },
    computed: {
      transformTemplate: {
        // getter
        get: function () {
          let newTemplate
          if (this.template) {
            if(JSON.parse(this.template).jsonTemplate[0].length > 1) {
               newTemplate = JSON.parse(this.template).jsonTemplate[0]
            } else {
               newTemplate = JSON.parse(this.template).jsonTemplate
            }
          }
          console.log('传过来的模板数据', newTemplate)
          if(newTemplate && newTemplate.length > 0) {
            newTemplate.forEach((item, index) => {
              item.id = index
              if(this.editFlg) {
                item.editFlg = true
              } else {
                item.editFlg = false
              }
              if (item.hint === 'TEXTAREA') {
                item.changeType = 'textarea'
              }
              if (item.hint === 'RADIO_GROUP') {
                item.isShow = false
                item.placeholderText = item.placeholder ? item.placeholder : '点击选择'
                item.formValue = item.value
                item.options.forEach(i => {
                  i.text = i.value
                })
              }
              if(item.hint === 'INPUTCASH') {
                item.placeholderText = item.placeholder + ' 单位 ' + (item.unit ? '(' + item.unit + ')' : '(元)')
                console.log('item', item)
              }
              if(item.hint === 'INPUTNUMBER') {
                item.placeholderText = item.placeholder + ' 单位 ' + (item.unit ? '(' + item.unit + ')' : '(个)')
              }
              if (item.hint === 'DATEPICKER') {
                item.isShow = false
                item.placeholderText = item.placeholder ? item.placeholder : '点击设置'
                item.formatVal = moment(item.value).format('YYYY-MM-DD')
                item.showTime = item.value ? item.value : new Date().getTime()
              }
              item.value = item.value || null
              if (item.hint === 'CHECKBOX_GROUP') {
                item.formatVal = this.getCheckboxVal(item.options)
                item.placeholderText = item.placeholder ? item.placeholder : '点击选择'
              }
            })
          }
         
          this.dealTemplate = Object.assign([], newTemplate)
          console.log('最终显示的数据', this.dealTemplate)
          if(this.status) {
            this.$emit('change', {json: this.dealReturnVal(), allRequired: this.isRequired()})
          }
          return newTemplate
        }
      },
    },
    methods: {
      // 修改textarea层级bug 暂未很好的解决方案
      changeTextarea(type) {
        this.dealTemplate.forEach(i => {
          if (i.hint === 'TEXTAREA') {
            i.changeType = type
          }
        })
      },
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
        return newShowText ? newShowText.slice(0, newShowText.length - 1) : ''
      },
      open(e, item) {
        if (this.readonly) {
          return false
        }
        this.transformTemplate.map(val => {
          val.editFlg = true
        })
        item.isShow = true
        if (item.hint === 'CHECKBOX_GROUP') {
          this.saveCheckbox = JSON.stringify(item.options)
        }
      },
      // 日期选择器的确定
      confirmDate(e, item) {
        item.value = e.detail
        item.formatVal = moment(e.detail).format('YYYY-MM-DD')
        item.isShow = false
        this.transformTemplate.map(val => {
          val.editFlg = false
        })
        this.$emit('change', {json: this.dealReturnVal(), allRequired: this.isRequired()})
      },
      // 选择器的取消(日期 单选)
      cancel(e, item) {
        item.isShow = false
        this.transformTemplate.map(val => {
          val.editFlg = false
        })
        if (item.hint === 'CHECKBOX_GROUP') {
          item.options = JSON.parse(this.saveCheckbox)
        } else if(item.hint === 'RADIO_GROUP') {
          item.formValue = item.value
        } else if(item.hint === 'DATEPICKER') {
          item.showTime = item.value ? item.value : new Date().getTime()
        }

      },
      // 单选点击确定
      onChangeRadio(child, item) {
        item.formValue = child.label
        // item.options.map(val => {
        //   val.checked = false
        // })
        // child.checked = !child.checked

        console.log('单选框的变化事件1', item)
      },
      confirmRadio(e, item) {
        console.log('确认e', e, item)
        item.value = item.formValue
        item.isShow = false
        this.transformTemplate.map(val => {
          val.editFlg = false
        })
        this.$emit('change', {json: this.dealReturnVal(), allRequired: this.isRequired()})
      },
      // checkbox
      onChange(e, item) {
        item.checked = e.detail
      },
      confirmDialog(e, item) {
        this.saveCheckbox = item.options
        item.formatVal = this.getCheckboxVal(item.options)
        item.isShow = false
        this.transformTemplate.map(val => {
          val.editFlg = false
        })
        this.$emit('change', {json: this.dealReturnVal(), allRequired: this.isRequired()})
      },
      // 值变化
      changeVal(e, item) {
        item.value = e.detail
        this.$emit('change', {json: this.dealReturnVal(), allRequired: this.isRequired()})
      },
      // 是否有必填项为填
      isRequired() {
        let allRequired = {
          label: '',
          status: true
        }
        for(let i = 0; i < this.dealTemplate.length; i++) {
          if (this.typeList.indexOf(this.dealTemplate[i].hint) > -1 && this.dealTemplate[i].required) {
            if (!this.dealTemplate[i].value) {
              allRequired.status = false
              allRequired.label = this.dealTemplate[i].label
              break;
            } else {
              if((this.dealTemplate[i].hint !== 'DATEPICKER' && this.dealTemplate[i].hint !== 'CHECKBOX_GROUP') && this.dealTemplate[i].value.match(/^[ ]*$/)) {
                allRequired.status = false
                allRequired.label = this.dealTemplate[i].label
                break;
              }
            }
          }
        }
        return allRequired
      },
      // 处理返回格式
      dealReturnVal() {
        const newTem = JSON.parse(this.template)
        this.dealTemplate.map(item => {
          if (item.hint === 'CHECKBOX_GROUP') {
            const checkedList = item.options.filter(i => i.checked)
            const list = [];
            checkedList.map(val => {
              list.push(val.value)
            })
            item.value = list.length > 0 ? list : null
            return item
          }
        })
        newTem.jsonTemplate = this.dealTemplate
        return newTem
      }
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.create-form {
  .van-cell{
    font-size: 16px;
    padding:13px 15px;
    // .van-cell__title{
    //   max-width: 200upx!important;
    //   min-width: 200upx!important;
    // }
    .van-cell__value{
      margin-left:24upx;
    }
    .van-field__icon-container{
      margin-top: 4upx;
    }

  }
  .textarea-field{
    .van-cell{
      display: block;
    }
    .van-field__body{
      margin-top: 24upx;
    }
    .van-cell__value{
      margin-left:0!important;
    }
    .van-cell__title{
      max-width:100%!important;
      min-width:100%!important;
    }
    textarea{
      min-height: 250upx!important;
      max-height: 250upx!important;
      height: 250upx!important;
      text-align: justify;
    }
  }
  .van-field__placeholder  {
    padding-top: 4px;
  }
  .van-hairline--top-bottom::after{
    border-width: 0!important;
  }
  .checkbox-container {
    width: toUpx(100);
    max-height: 50vh;
    overflow: auto;
    padding: 32upx;
    padding-top:0;
    .checkbox-title{
      text-align: center;
      padding-bottom: 20upx;
      border-bottom: 1px solid #eeeeee;
    }
    .van-checkbox__label{
      font-size: 14px;
      // margin-top: -2upx;
    }
    .van-cell__value{
      flex: inherit;
    }
    .van-checkbox {
      padding: 12upx 0;
      display:flex;
    }
    image{
      width: 30upx;
      height: 30upx;
    }
  }
  .van-dialog__header{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 32rpx 150rpx;
  }
  // textarea{
  //   min-height: 250upx!important;
  //   max-height: 250upx!important;
  //   height: 250upx!important;
  //   text-align: justify;
  // }
  .create-placehoder{
    color: #999!important;
  }
  .detail{
    background: #FFFFFF;
  }
  .detail-list{
    display: block;
    padding:22upx 30upx 18upx 16upx;
    line-height:24px;
    color:#333;
    background-color:#fff;
    border-bottom: 2upx solid #ebedf0;
    .detail-label{
      width: calc(100% - 55upx);
      .required{
        font-size: 14px;
        color: #f44;
        margin-right: 3upx;
      }
      .no-required{
        opacity: 0;
      }
      .name{
        color: #323233;
        font-size: 16px;
      }
    }
    .detail-content{
      margin-top: 18upx;
      color: #323233;
      font-size: 16px;
      text-align: justify;
      line-height:48upx;
      margin-left: 14upx;
    }
    .textarea-detail{
      height: 250upx!important;
      overflow:scroll;
    }
  }
  .detail-list-option{
    // display: flex;
    // justify-content:space-between;
    padding:22upx 30upx 18upx 16upx;
    line-height:24px;
    color:#333;
    background-color:#fff;
    border-bottom: 2upx solid #ebedf0;
    // align-items:center;
    .detail-label{
      max-width: 200upx;
      min-width: 200upx;
      display: inline-block;
      .required{
        font-size: 14px;
        color: #f44;
        margin-right: 3upx;
      }
      .no-required{
        opacity: 0;
      }
      .name{
        color: #323233;
        font-size: 16px;
      }
    }
    .detail-content{
      display: inline-block;
      width: calc(100% - 220upx);
      color: #323233;
      font-size: 16px;
      line-height:48upx;
      margin-left: 14upx;
      text-align: right;
      vertical-align:top;
      position: relative;
      view{
        margin-right: 20upx;
        display: inline-block;
        width: calc(100% - 55upx);
      }
      image{
        width: 30upx;
        height: 30upx;
        vertical-align: middle;
        position: absolute;
        top: 50%;
        margin-top: -13upx;
        right: -15upx;
      }
    }

  }
}
</style>
