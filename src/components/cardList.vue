<template>
<view>
  <!-- @click="goDetail(item.vcardId, item.id)" -->
  <van-swipe-cell right-width="90" left-width="0" async-close v-for="(item, index) in contactList" :key="item" @close="onClose($event, item.id, item.vcardId)"> 
    <van-cell-group>
      <van-cell>
        <view slot="title">
          <view class="man_box"  @tap="goDetail(item.vcardId, item.id)">
            <!-- <i-swipeout  i-class="i-swipeout-demo-item" disabled="disabled" actions="actions" style="position:relative;" @change.stop="handDelete(item.vcardId)"> -->
              <view slot="content" class="slot_box">
                <view class="i-swipeout-image" >
                  <image v-if="item.avatar" :src="item.avatar + '?x-oss-process=image/resize,m_fill,h_200,w_200'" class="" style="border: 1px solid #eeeeee; width:100rpx; height:100rpx;border-radius: 50%;margin-right:20px;"></image>
                  <image src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg?x-oss-process=image/resize,m_fill,h_200,w_200"
                  style="width:100rpx; height:100rpx;border-radius: 50%;margin-right:20px;border: 1px solid #eeeeee;" v-if="!item.avatar"></image>
                </view>
                <view class="i-swipeout-des">
                  <view class="i-swipeout-des-h2" style="font-size:32rpx;color:#333333;font-weight:bold;">
                    <text style="display:inline-block;max-width:150px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{item.name}}</text>
                  </view>
                  <view class="i-swipeout-des-detail" style="font-size:24rpx;color:#939DA4;">
                    <text v-if="item.position && item.position === '1'" style="vertical-align:middle;display:inline-block;">互换名片后可显示职务</text>
                    <text v-if="item.position && item.position !== '1'" style="vertical-align:middle;display:inline-block;max-width:120px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">{{item.position}}</text>
                  </view>
                  <view class="i-swipeout-des-detail" style="font-size:24rpx;color:#939DA4;">
                    <text style="font-size:24rpx;color:#939DA4;" v-if="item.mobile && item.mobile === '1'">互换名片后可查看手机号</text>
                    <text style="font-size:24rpx;color:#939DA4;" v-if="item.mobile && item.mobile !== '1'">{{item.mobile}}</text>
                  </view>
                </view>
                <view class="tag_box" v-if="item.snsUnionId">
                  <view class="tag" v-if="!item.status || item.status === '1' || item.status === '2'">互换名片</view>
                  <view class="tags" v-else>
                    <image src="https://img.esenyun.com/images/20181106/4d01c8ea269640a2ba884bcd6c70ceb8.png"></image>
                    <text>已互换</text>
                  </view>
                </view>
              </view>
            <!-- </i-swipeout> -->
          </view>
        </view>
      </van-cell>
    </van-cell-group>
    <view slot="right">删除</view>
  </van-swipe-cell>
  <view class="team_list" v-for="(item, index1) in teamList" :key="id" @tap="goTeamSpecific(item.id, item.name, item.teamNum)" v-if="type === 'team'">
    <view class="team_top_container">
      <view class="team_left">
        <!-- <text>{{item.name}}</text> -->
        <image :src="item.imageUrl" v-if="item.imageUrl"></image>
        <image v-if="!item.imageUrl" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg?x-oss-process=image/resize,m_fill,h_200,w_200"></image>
      </view>
      <view class="team_right">
        <!-- <view>{{item.teamNum}}人</view> -->
        <view class="team_name">
          <text class="name_left">{{item.name}}</text>
          <text class="name_right">{{item.newTeamName}}</text>
        </view>
        <view class="team_time">
          <!-- <text>2014-09-12 12:00:23</text> -->
        </view>
        <view class="team_img_box">
          <view class="t_left">
            <view v-for="(it, index2) in item.members" :key="id" class="team_img">
              <image class="" :src="it.imageUrl" v-if="it.imageUrl"></image>
              <image class="" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg?x-oss-process=image/resize,m_fill,h_50,w_50"
                v-if="!it.imageUrl"></image>
            </view>
            <image src="https://img.esenyun.com/images/20181113/48bc8145107f49c9b566f74b7d81ae3e.png" class="dot" v-if="item.isMore"></image>
            <image src="https://img.esenyun.com/images/20181106/4d01c8ea269640a2ba884bcd6c70ceb8.png" class="t_img"></image>
            <!-- <text class="num_left">6</text> -->
            <text class="num_right">{{item.teamNum}}</text>
          </view>
          <view class="t_right">
            <text>查看</text>
            <i-icon size="16" color="#C7C7CC" type="enter" />
          </view>
        </view>
      </view>
    </view>
    </view>
  </view>
</view>
</template>

<script>
export default {
  props: {
    type: String,
    disabled: String,
    contactList: {
      type: Array,
      default: [],
      twoWay: true
    },
    teamList: {
      type: Array,
      default: [],
      twoWay: true
    }
  },
  data() {
    return {
      newGroupList:[],
      actions: [
        {
          name: '删除',
          color: '#fff',
          fontsize: '20',
          width: 100,
          // icon: 'undo',
          background: '#F15A4A'
        }
      ]
    }
  },
  onLoad() {
    console.log(this.contactList)
    this.getTeamList()
  },
  methods: {
    onClose(event, id, vcardId) {
      console.log(event, id, vcardId)
      this.$emit('emitId', vcardId)
    },
    handDelete(id) {
      this.$emit('emitId', id)
    },
    goDetail(cardId, id, e) {
      console.log(e)
      this.$emit('goDetail', cardId)
    },
    goTeamSpecific(detailId, name, number) {
      this.$emit('goTeamDetail', detailId, name, number)
    },
    getTeamList() {
      console.log('this.teamList----1', this.teamList)
      this.teamList =  this.teamList.map(res => {
          console.log('newVal', res)
          if (res.category === 'DEPARTMENT') {
            res.newTeamName = '部门'
          } else if (res.category === 'COMPANY') {
            res.newTeamName = '公司'
          } else if (res.category === 'TEAM') {
            res.newTeamName = '团队'
          } else if (res.category === 'PROJECT') {
            res.newTeamName = '项目组'
          }
          res.teamNum = res.members.length
          if (res.members.length > 4) {
            res.members = res.members.slice(0, 4)
            res.isMore = true
          }
          return res
        })
        console.log('this.teamList----2', this.teamList)
    }
  }
}
</script>

<style scoped lang="less">
@import '../common/less/common.less';

.van-cell-group{
  box-shadow: 0px 6px 11px -3px rgba(41, 171, 145, 0.17);
  border-radius: 14px;
  margin-top:10px !important;
}
.man_box {
  // box-shadow: 0px 6px 11px -3px rgba(41, 171, 145, 0.17);
  .card_time {
    position: absolute;
    top: 8px;
    right: 13px;
    color: @text-color-weak;
    font-size: 20rpx;
  }
  .slot_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .tag_box{
      position: absolute;
      right: 0;
      .tag {
        // position: absolute;
        // right: 0;
        padding: 5px 10px;
        // border: 1px solid @primary-color;
        font-size: 24rpx;
        border-radius: 14px;
        color: #fff;
        background: linear-gradient(to right, @tranform-color, @primary-color-sup-1);
      }
      .tags{
        // position: absolute;
        // right: 0;
        font-size: 12px;
        color: #C6CDD2;
        font-weight: bold;
        image{
          width: 12px;
          height: 8px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
  }
}
.team_list {
  box-shadow: 0px 6px 11px -3px rgba(41, 171, 145, 0.17);
  margin-top: 10px;
  background: #fff;
  padding: 0 30rpx;
  box-sizing: border-box;
  border-radius: 4px;
  // border-top: 1rpx solid @background-color-sup-1;
  font-size: 14px;
  width: 100%;
  // height: 162rpx;
  .team_top_container {
    display: flex;
    justify-content: flex-start;
    padding: 20px 0;
  }
  .team_left {
    color: @text-color-strong;
    width: 20%;
    font-size: 28rpx;
    image{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .team_right {
    color: @text-color-weak;
    width: 80%;
    font-size: 24rpx;
    .team_name{
      margin-bottom: 4px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .name_left{
        color: #333333;
        font-size: 16px;
        // font-weight: bold;
        margin-right: 3px;
      }
      .name_right{
        font-size: 10px;
        color: #ffffff;
        padding: 0 4px;
        background: #BAC1CB;
        border-radius: 2px;
      }
    }
    .team_time{
      color: #939DA4;
      font-size: 12px;
      margin-bottom: 15px;
    }
    .team_img_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50rpx;
      .t_left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .t_img{
          width: 12px;
          height: 8px;
          margin-right: 4px;
          margin-left: 10px;
        }
        .num_left{
          color: #29AB91;
          font-size: 12px;
        }
        .num_right{
          color: #939DA4;
          font-size: 12px;
        }
        .dot {
          width: 16px;
          height: 4px;
          margin-left: 10px;
        }
        .team_img {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          border: 1px solid #fff;
          image{
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
          }
        }
        .team_img:nth-child(2) {
          margin-left: -3px;
        }
        .team_img:nth-child(3) {
          margin-left: -3px;
        }
        .team_img:nth-child(4) {
          margin-left: -3px;
        }
      }
      .t_right{
        display: flex;
        align-items: center;
      }
    }
  }
  
}
</style>
