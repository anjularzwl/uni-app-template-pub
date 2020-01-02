<template>
  <view class="steps-wrap">
    <view v-for="(item,index) in stepsList" :key="item.id" class="steps-list">
      <view class="steps-list-right">
        <view class="title" v-if="item.title">{{item.title}}</view>
        <view class="comment" :class="{'step-board-comment': type === 'board'}">
          <text v-if="item.dec">{{item.dec}}</text>
        </view>
      </view>
      <view class="steps-list-time">
        <view class="year">{{item.year}}</view>
        <view class="minute">{{item.minute}}</view>
      </view>
      <view class="steps-list-left" :class="{'steps-list-left-ios': isIOS}">
          <image v-if="item.icon === 'pass'" src="../static/opt-pass.svg" style=""></image>
          <image v-if="item.icon === 'reject'" src="../static/opt-reject.svg" style=""></image>
          <image v-if="item.icon === 'back'" src="../static/opt-back.svg" style=""></image>
          <image v-if="item.icon === 'new'" src="../static/icon-new.svg" style=""></image>
          <view class="circular" v-if="item.icon === 'point'">
            <view :class="{'step-active-circular': index === 0}"></view>
          </view>
      </view>
      <view class="steps-list-line"></view>
    </view>
  </view>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  export default {
    computed: mapState([
      'isIOS'
    ]),
    props: {
      list: {
        type: String,
        default: ''
      },
      type: '',
    },
    data() {
      return {
        stepsList: [],
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
          this.stepsList = []
          console.log('type', this.list, this.type)
          if (this.list && this.type) {
            const tempList = Object.assign([], this.list)
            console.log('传过来的数据', tempList)
            if(this.type === 'approval') {
              tempList.map((val, index) => {
                const obj = {
                  title: '',
                  dec: '',
                  year: null,
                  minute: null,
                  icon: ''
                }
                let word = ''
                if(val.status === 2) {
                  word = '  通过申请'
                } else if(val.status === 3) {
                  word = '  拒绝审批'
                } else if(val.status === 5) {
                   word = '  发起审批'
                } else if(val.status === 4) {
                  word = '  撤回审批'
                }
                obj.title = val.executor.name + (val.executor.title ? ('('+ val.executor.title + ')') : '') + word
                obj.dec = val.comment ? ('备注：' + val.comment) : null
                obj.icon = 'point'
                if(index === 0) {
                  if(val.status === 2) {
                    obj.icon = 'pass'
                  } else if(val.status === 3) {
                    obj.icon = 'reject'
                  } else if(val.status === 4) {
                    obj.icon = 'back'
                  } else if(val.status === 5) {
                    obj.icon = 'new'
                  }
                } else if(index === tempList.length - 1) {
                  if(val.status === 5) {
                    obj.icon = 'new'
                  }
                }
                obj.year = moment(val.executeTime * 1000).format('YYYY.MM.DD')
                obj.minute = moment(val.executeTime * 1000).format('HH:mm')
                this.stepsList.push(obj);
              })
            } else if(this.type === 'board') {
              tempList.map((val, index) => {
                const obj = {
                  title: '',
                  dec: '',
                  year: null,
                  minute: null,
                  icon: ''
                }
                obj.title = null
                obj.dec = val.logMessage
                obj.icon = 'point'
                obj.year = moment(val.logTime * 1000).format('YYYY.MM.DD')
                obj.minute = moment(val.logTime * 1000).format('hh:mm')
                this.stepsList.push(obj);
              })
            }
          }
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.steps-wrap {
  padding: 30upx 30upx 0 212upx;
  background: #FFFFFF;
  .steps-list{
    float: none;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 36upx;
    flex: 1;
    font-size: 14px;
    position: relative;
    display: flex;
    color: #969799;
    .steps-list-time{
      position: absolute;
      top: 0;
      left: -181upx;
      text-align: right;
      .year{
        color: #333333;
        font-size: 11px;
      }
      .minute{
        color: #A6A6A6;
        font-size: 9px;
      }
    }
    .steps-list-left-ios {
      left: -63upx!important;
    }
    .steps-list-left{
      position: absolute;
      top: -2upx;
      left: -62upx;
      z-index: 1;
      width: 44upx;
      height: 44upx;
      image{
        width: 100%;
        height: 100%;
      }
      .circular{
        width: 44upx;
        height: 44upx;
        view{
          width: 14upx;
          height: 14upx;
          border-radius: 50%;
          background: #CCCCCC;
          margin:0 auto;
          margin-top: 14upx;

        }
      }
      .step-active-circular{
        background: @primary-color!important;
        // margin-top: 0!important;
      }
    }
    .steps-list-right{
      .title{
        font-size: 15px;
        color: #000000;
        margin-bottom: 6upx;
        line-height: 24px;
      }
      .comment{
        color: #999999;
        font-size: 13px;
        min-height: 15upx;
        text-align: justify;
        text{
          text-align: justify;
        }
      }
      .step-board-comment{
        color: #333333;
      }
    }
    .steps-list-line{
      position: absolute;
      top: 14upx;
      left: -40upx;
      width: 1px;
      height: 100%;
      background-color: #E5E5E5;
    }
    &:last-child{
      .steps-list-line{
        display: none;
      }
    }
  }

}
</style>
