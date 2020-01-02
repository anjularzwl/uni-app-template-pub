<template>
  <view>
  <!-- 卡片 -->
  <view class="card_box" v-if="detail.certified && (!detail.templateId || detail.templateId === 'card-1')">
    <view class="headimg_box">
      <image :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_370,w_325'" class="headimg" mode="widthFix"  v-if="detail.avatar"></image>
      <image src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" v-if="!detail.avatar" class="headimg" mode="widthFix"></image>
      <view class="write write_one" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
      <view class="name_box">
        <view class="name">{{detail.name}}</view>
        <view class="position" v-if="detail.position && detail.position === '1'">互换名片后可查看职务</view>
        <view class="position" v-if="detail.position && detail.position !== '1'">{{detail.position}}</view>
        <view class="company" v-if="detail.company">{{detail.company}}</view>
      </view>
    </view>
    <view class="address_box">
      <view class="address_left">
        <view class="phone" v-if="!detail.mobile">暂无手机号</view>
        <view class="phone" style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</view>
        <view class="phone" v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</view>
        <view class="phone" v-if="!detail.mail">暂无邮箱</view>
        <view class="phone" style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</view>
        <view class="phone" v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</view>
        <view class="phone" v-if="!detail.address">暂无地址</view>
        <view class="phone" style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</view>
        <view class="phone" v-if="detail.address && detail.address !== '1'">{{detail.address}}</view>
      </view>
      <view class="address_right">
        <image :src="detail.wxappQrCode" v-if="detail.wxappQrCode"></image>
      </view>
    </view>
  </view>
  <view class="notpurchase" v-if="!detail.certified">
    <image src="https://img.esenyun.com/images/20181226/e88ff30e3be1406a98f73fcfac886845.png" mode="widthFix" class="bgimg"></image>
    <image :src="extConfig.appId ? extConfig.mycardIcon : 'https://img.esenyun.com/images/20181226/2fba11ffb9854b91b3ddf8eab604fdd5.png'" mode="widthFix" class="bj" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'"></image>
    <view class="head_top">
      <view class="headimg_left">
        <image v-if="detail.avatar" :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_500,w_500'"></image>
        <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg"></image>
      </view>
      <view class="headimg_right">
        <view class="h_name">{{detail.name}}</view>
        <view class="h_position" v-if="!detail.position">暂无职位</view>
        <view class="h_position" v-if="detail.position && detail.position === '1'">互换名片后可查看职务</view>
        <view class="h_position" v-if="detail.position && detail.position !== '1'">{{detail.position}}</view>
        <view class="h_company" v-if="!detail.company">暂无公司</view>
        <view class="h_company" v-if="detail.company && detail.company === '1'">互换名片后可查看公司</view>
        <view class="h_company" v-if="detail.company && detail.company !== '1'">{{detail.company}}</view>
      </view>
    </view>
    <view class="email_box">
      <view class="add_box">
        <image src="https://img.esenyun.com/images/20181226/0d9b4e81c26241de9d2c864c9ada3b67.png" mode="widthFix"></image>
        <text v-if="!detail.mobile">暂无手机号</text>
        <text style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</text>
        <text v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</text>
      </view>
      <view class="add_box">
        <image src="https://img.esenyun.com/images/20181226/0ef31f09ac2f4efe9deb04c67f5dd159.png" mode="widthFix"></image>
        <text v-if="!detail.mail">暂无邮箱</text>
        <text style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</text>
        <text v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</text>
      </view>
      <view class="add_box">
        <image src="https://img.esenyun.com/images/20181226/c6573a5c7d904c2ab0e22aa39fdcb5b2.png" mode="widthFix"></image>
        <text v-if="!detail.address">暂无地址</text>
        <text style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</text>
        <text v-if="detail.address && detail.address !== '1'">{{detail.address}}</text>
      </view>
    </view>
    <view class="one_bot">
      <view class="bot_box">
        <image src="https://img.esenyun.com/images/20181226/1f77615753644ff6a710ecbe379bf7ef.png" class="" style="width: 50px; height: 50px;"></image>
        <view class="v_text">二维码功能暂未开放</view>
      </view>
    </view>
  </view>
  <view class="first_type" v-if="detail.certified && detail.templateId === 'card-7'">
    <view class="write write_first" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
    <view class="c_box">
      <image src="https://img.esenyun.com/images/20180926/2045e7d715cc408dbbc9ea72b1db723a.png" class="first_bg_img"></image>
      <view class="avatar_box">
        <image v-if="detail.avatar" :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_90,w_90'" class="avatar_img"></image>
        <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" class="avatar_img"></image>
      </view>
      <view class="name_box">{{detail.name}}</view>
      <view class="firstinfo_box">
        <view v-if="detail.position && detail.position === '1'">互换名片后可查看职务</view>
        <view v-if="detail.position && detail.position !== '1'">{{detail.position}}</view>
        <view v-if="!detail.mobile">暂无手机号</view>
        <view style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</view>
        <view v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</view>
        <view v-if="detail.company">{{detail.company}}</view>
      </view>
    </view>
    <view class="firstbot_box">
      <view class="firstbot_left">
        <view v-if="!detail.mail">暂无邮箱</view>
        <view style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</view>
        <view v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</view>
        <view v-if="!detail.address">暂无地址</view>
        <view style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</view>
        <view v-if="detail.address && detail.address !== '1'">{{detail.address}}</view>
      </view>
      <view class="firstbot_right">
        <image src="detail.wxappQrCode + '?x-oss-process=image/resize,m_fill,h_85,w_85'" class="avatar_img"></image>
      </view>
    </view>
  </view>
  <view class="second_type" v-if="detail.certified && detail.templateId === 'card-5'">
    <view class="write write_second" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
    <view class="c_box">
      <image src="https://img.esenyun.com/images/20180926/4d813aca108642c6a05461f41f82a79f.png" mode="widthFix" class="first_bg_img"></image>
      <view class="avatar_box">
        <image v-if="detail.avatar" src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_90,w_90'" class="avatar_img"></image>
        <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" class="avatar_img"></image>
      </view>
      <view class="firstinfo_box">
        <view class="name_box">{{detail.name}}</view>
        <view v-if="detail.position && detail.position === '1'">互换名片后可查看职务</view>
        <view v-if="detail.position && detail.position !== '1'">{{detail.position}}</view>
        <view class="mob_box" v-if="!detail.mobile">暂无手机号</view>
        <view class="mob_box" style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</view>
        <view class="mob_box" v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</view>
      </view>
      <view class="firstbot_box">
        <view class="firstbot_left">
          <view v-if="!detail.mail">暂无邮箱</view>
          <view style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</view>
          <view v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</view>
          <view v-if="!detail.address">暂无地址</view>
          <view style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</view>
          <view v-if="detail.address && detail.address !== '1'">{{detail.address}}</view>
        </view>
        <view class="firstbot_right">
          <image :src="detail.wxappQrCode + '?x-oss-process=image/resize,m_fill,h_85,w_85'" class="avatar_img"></image>
        </view>
      </view>
    </view>
  </view>
  <view class="third_type" v-if="detail.certified && detail.templateId === 'card-2'">
    <view class="write write_third" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
    <view class="c_box">
      <image src="https://img.esenyun.com/images/20180926/bb43cc23b3504a5db7bd3a66352bf808.png" mode="widthFix" class="first_bg_img"></image>
      <view class="avatar_box">
        <view class="avatar_img_box">
          <image v-if="detail.avatar" :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_90,w_90'" class="avatar_img"></image>
          <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" class="avatar_img"></image>
        </view>
      </view>
      <view class="firstinfo_box">
        <view class="name_box">{{detail.name}}</view>
        <view class="third_position">
          <text v-if="detail.position && detail.position === '1'">互换名片后可查看职务</text>
          <text v-if="detail.position && detail.position !== '1'">{{detail.position}}</text>
        </view>
        <view class="mob_box" v-if="!detail.mobile">暂无手机号</view>
        <view class="mob_box" style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</view>
        <view class="mob_box" v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</view>
      </view>
      <view class="firstbot_box">
        <view class="firstbot_left">
          <view v-if="!detail.mail">暂无邮箱</view>
          <view style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</view>
          <view v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</view>
          <view v-if="!detail.address">暂无地址</view>
          <view style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</view>
          <view v-if="detail.address && detail.address !== '1'">{{detail.address}}</view>
        </view>
      </view>
      <view class="bot_company">{{detail.company}}</view>
    </view>
    <view class="firstbot_right">
      <image :src="detail.wxappQrCode + '?x-oss-process=image/resize,m_fill,h_85,w_85'" class="avatar_img"></image>
    </view>
  </view>
  <view class="fouth_type" v-if="detail.certified && detail.templateId === 'card-6'">
    <view class="write write_fouth" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
    <view class="c_box">
      <image src="https://img.esenyun.com/images/20180926/9d3a23cf0bb34e689fd56b32d94baf84.png" class="first_bg_img"></image>
      <view class="avatar_box">
        <image v-if="detail.avatar" :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_90,w_90'" class="avatar_img"></image>
        <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" class="avatar_img"></image>
      </view>
      <view class="firstinfo_box">
        <view class="name_box">{{detail.name}}</view>
        <view v-if="!detail.mobile">暂无手机号</view>
        <view style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</view>
        <view v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</view>
        <view v-if="detail.position && detail.position === '1'">互换名片后可查看职务</view>
        <view v-if="detail.position && detail.position !== '1'">{{detail.position}}</view>
      </view>
      <view class="firstbot_box">
        <view class="firstbot_left">
          <view>
            <image src="https://img.esenyun.com/images/20181226/3c4d6059b3b74ff79c8917d5d88206aa.png" mode="widthFix"></image>
            <text v-if="!detail.mail">暂无邮箱</text>
            <text style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</text>
            <text v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</text>
          </view>
          <view>
            <image src="https://img.esenyun.com/images/20181226/bce30322ac4d4c3c9faf7b7913553c9d.png" mode="widthFix"></image>
            <text v-if="!detail.address">暂无地址</text>
            <text style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</text>
            <text v-if="detail.address && detail.address !== '1'">{{detail.address}}</text>
          </view>
          <view>
            <image src="https://img.esenyun.com/images/20181226/30331faf0cc54c3ab9f55147e96adddf.png" mode="widthFix"></image>
            <text>{{detail.company}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="firstbot_right">
      <image :src="detail.wxappQrCode + '?x-oss-process=image/resize,m_fill,h_85,w_85'" class="avatar_img"></image>
    </view>
  </view>
  <view class="fifth_type" v-if="detail.certified && detail.templateId === 'card-3'">
    <view class="c_box">
      <view class="write write_fifth" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
      <image v-if="detail.avatar" :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_325,w_300'" mode="widthFix" class="first_bg_img"></image>
      <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" mode="widthFix" class="first_bg_img"></image>
    </view>
    <view class="name_box">
      <view class="name_top">
        <text class="name_first">{{detail.name}}</text>
        <!-- <text class="name_two">{{detail.position}}</text> -->
        <text class="name_two" v-if="detail.position && detail.position === '1'">互换名片后可查看职务</text>
        <text class="name_two" v-if="detail.position && detail.position !== '1'">{{detail.position}}</text>
      </view>
      <view class="name_bot">
        <!-- <text>{{detail.mobile}}</text> -->
        <text v-if="!detail.mobile">暂无手机号</text>
        <text style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</text>
        <text v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</text>
      </view>
    </view>
    <view class="firstbot_box">
      <image src="https://img.esenyun.com/images/20180926/798822c5c58f4f439124c9689b3bc0a8.png" mode="widthFix" class="pos_img"></image>
      <view class="firstbot_right">
        <image :src="detail.wxappQrCode + '?x-oss-process=image/resize,m_fill,h_85,w_85'" class="avatar_img"></image>
      </view>
      <view class="firstbot_left">
        <view>{{detail.company}}</view>
        <view v-if="!detail.mail">暂无邮箱</view>
        <view style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</view>
        <view v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</view>
        <view v-if="!detail.address">暂无地址</view>
        <view style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</view>
        <view v-if="detail.address && detail.address !== '1'">{{detail.address}}</view>
      </view>
    </view>
  </view>
  <view class="sixth_type" v-if="detail.certified && detail.templateId === 'card-4'">
    <view class="top_box">
      <image src="https://img.esenyun.com/images/20180926/993d7c2c5d8243ce8293754f4e0cda9e.png" mode="widthFix" class="pos_one"></image>
      <image src="https://img.esenyun.com/images/20180926/b79f0e9277f643138998d2b9a771e62e.png" mode="widthFix" class="pos_two"></image>
      <view class="t_left">
        <view class="write write_sixth" @tap="write(detail.id)" v-if="detail.source === '0' && edit === '0'">编辑</view>
        <image v-if="detail.avatar" :src="detail.avatar + '?x-oss-process=image/resize,m_fill,h_244,w_225'" mode="widthFix"></image>
        <image v-if="!detail.avatar" src="https://img.esenyun.com/images/20180911/c1ca18f68754426ba2eb7f3b92be4cc9.jpg" mode="widthFix"></image>
      </view>
      <view class="t_right">
        <view class="vertical_name">{{detail.name}}</view>
        <!-- <view class="vertical_position">{{detail.position}}</view> -->
        <view class="vertical_position" v-if="detail.position && detail.position === '1'">互换名片后可查看职务</view>
        <view class="vertical_position" v-if="detail.position && detail.position !== '1'">{{detail.position}}</view>
      </view>
    </view>
    <view class="infomation_box">
      <!-- <view class="infomation_mobile">{{detail.mobile}}</view> -->
      <view class="infomation_mobile" v-if="!detail.mobile">暂无手机号</view>
      <view class="infomation_mobile" style="color:#34B59D;" v-if="detail.mobile && detail.mobile === '1'">互换名片后可查看手机号</view>
      <view class="infomation_mobile" v-if="detail.mobile && detail.mobile !== '1'">{{detail.mobile}}</view>
      <view>{{detail.company}}</view>
      <view v-if="!detail.mail">暂无邮箱</view>
      <view style="color:#34B59D;" v-if="detail.mail && detail.mail === '1'">互换名片后可查看邮箱</view>
      <view v-if="detail.mail && detail.mail !== '1'">{{detail.mail}}</view>
      <view v-if="!detail.address">暂无地址</view>
      <view style="color:#34B59D;" v-if="detail.address && detail.address === '1'">互换名片后可查看地址</view>
      <view v-if="detail.address && detail.address !== '1'">{{detail.address}}</view>
    </view>
    <view class="wxcode_box">
      <image src="https://img.esenyun.com/images/20180926/573e3a4b01794405b444adf176d687e9.png" mode="widthFix" class="pos_three"></image>
      <image :src="detail.wxappQrCode + '?x-oss-process=image/resize,m_fill,h_85,w_85'" class="avatar_img"></image>
    </view>
  </view>
</view>
</template>
<script>
// lib
import common from '@/share/common'
export default {
  props: {
    detail: {
      type: Object,
      default: {},
      twoWay: true
    },
    extConfig: {
      type: Object,
      default: {},
      twoWay: true
    },
    edit: {
      type: String,
      default: '0'
    }
  },
  watch: {
    detail(newVal) {
      console.log('newVal', newVal)
      newVal.mobile = common.privacy(newVal.mobile)
      newVal.position = common.privacy(newVal.position)
      newVal.mail = common.privacy(newVal.mail)
      newVal.address = common.privacy(newVal.address)
      console.log('newVal----', newVal)
    }
  },
  methods: {
    // 修改
    write(e) {
      console.log(e)
      uni.navigateTo({
        url: './createCard?createId=' + e
      })
    }
  },
  data() {
    return {
      avatar: ''
    }
  },
  onLoad() {
    this.avatar = uni.getStorageSync('userInfo').avatarUrl
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';
.write{
  border-radius: 4px;
  background: rgba(186, 186, 186, 0.5);
  // box-shadow: 0px 1px 1px 0px rgba(186, 186, 186, 0.5);
  // text-shadow: 5px 2px 8px 0px gray;
  width: 60px;
  height: 25px;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
  z-index: 999;
}
.write_one{
  position: absolute;
  right: 20px;
  bottom: 20px;
  border: 1rpx solid @text-color-font;
  color: @text-color-font;
}
.write_first{
  background: transparent !important;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 1rpx solid @text-color-font;
  color: @text-color-font;
}
.write_second{
  background: transparent !important;
  position: absolute !important;
  left: 18px !important;
  bottom: 42px !important;
  border: 1rpx solid @text-color-strong !important;
  color: @text-color-strong !important;
}
.write_third{
  background: transparent !important;
  position: absolute;
  right: 10px;
  top: 20px;
  border: 1rpx solid @text-color-font;
  color: @text-color-font;
}
.write_fouth{
  background: transparent !important;
  position: absolute;
  left: 15px;
  top: 20px;
  border: 1rpx solid @text-color-font;
  color: @text-color-font;
}
.write_fifth{
  background: transparent !important;
  position: absolute;
  right: 10px;
  bottom: 20px;
  border: 1rpx solid @text-color-font;
  color: @text-color-font;
}
.write_sixth{
  background: transparent !important;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border: 1rpx solid @text-color-font;
  color: @text-color-font;
}
.card_box{
  background: @text-color-font;
  width: 100%;
  padding: 30rpx;
  box-sizing: border-box;
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  .headimg_box{
    position: relative;
    margin-bottom: 18px;
    height: 370px;
    overflow: hidden;
    .headimg{
      width: 100%;
      min-height: 370px;
    }
    .logoimg{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 80px;
    }
    .name_box{
      position: absolute;
      left: 30rpx;
      bottom: 50rpx;
      background: rgba(0, 0, 0, 0.4);
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      color: @text-color-font;
      min-width: 160px;
      .name{
        font-size: 28px;
        margin-bottom: 10rpx;
      }
      .position{
        font-size: 16px;
        margin-bottom: 10rpx;
      }
      .company{
        font-size: 16px;
        margin-bottom: 10rpx;
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .address_box{
      display: flex;
      justify-content: space-between;
      .address_left{
        width: 65%;
        color: @text-color-strong;
        font-size: 12px;
        .phone{
          // color: @primary-color-sup-4;
          margin-bottom: 10px;
        }
        .email{
          margin-bottom: 10px;
        }
      }
      .address_right{
        width: 30%;
        text-align: center;
        image{
          width: 80px;
          height: 80px;
        }
      }
    }
}
.notpurchase{
  position: relative;
  width: 100%;
  .bgimg{
    width: 100%;
  }
  .bj{
    width: 60px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 999;
  }
  .head_top{
    padding: 0 60rpx;
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    top: 15px;
    display: flex;
    justify-content: space-between;
    .headimg_left{
      width: 60px;
      height: 60px;
      image{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .headimg_right{
      text-align: right;
      width: 60%;
      .h_name{
        margin-top: 20rpx;
        font-size: 15px;
        color: @text-color-strong;
        width: 100%;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .h_position{
        margin-top: 10rpx;
        font-size: 12px;
        color: @text-color-weak;
      }
      .h_company{
        margin-top: 10rpx;
        font-size: 12px;
        color: @text-color-weak;
      }
    }
  }
  .email_box{
      position: absolute;
      left: 60rpx;
      top: 7em;
    .add_box{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10rpx;
      image{
        width: 22rpx;
        margin-right: 23rpx;
      }
      text{
        color: @text-color-weak;
        font-size: 24rpx;
      }
    }
  }
  .one_bot{
    position: absolute;
    bottom: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .bot_box{
      text-align: center;
      image{
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 25rpx;
      }
      .v_text{
        // margin-top: 10px;
        font-size: 24rpx;
        color: #CCCCCC;
      }
    }
  }
}
.first_type{
  position: relative;
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: @text-color-font;
  .c_box{
    width: 100%;
    height: 385px;
    position: relative;
    .first_bg_img{
      width: 100%;
      height: 100%;
    }
    .avatar_box{
      position: absolute;
      top: 20px;
      left: 18px;
      width: 90px;
      height: 90px;
      .avatar_img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid @text-color-font;
      }
    }
    .name_box{
      position: absolute;
      top: 120px;
      left: 52px;
      width: 20px;
      color: @text-color-font;
      font-weight: bold;
      font-size: 26px;
    }
    .firstinfo_box{
      position: absolute;
      bottom: 20px;
      right: 10px;
      text-align: right;
      view{
        font-size: 14px;
        color: @text-color-font;
        margin-top: 10px;
      }
    }
  }
  .firstbot_box{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .firstbot_left{
      font-size: 14px;
      color: @text-color-strong;
      padding-right: 25px;
      view{
        margin-top: 10px;
      }
    }
    .firstbot_right{
      image{
        width: 85px;
        height: 85px;
      }
    }
  }
}
.second_type{
  position: relative;
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  // padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: @text-color-font;
  .c_box{
    width: 100%;
    position: relative;
    .first_bg_img{
      width: 100%;
      height: 100%;
    }
    .avatar_box{
      position: absolute;
      top: 60px;
      right: 30px;
      width: 75px;
      height: 75px;
      .avatar_img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid @text-color-font;
      }
    }
    .firstinfo_box{
      color: @text-color-strong;
      position: absolute;
      top: 140px;
      right: 30px;
      text-align: right;
      view{
        font-size: 14px;
        color: @text-color-strong;
        margin-top: 10px;
      }
      .name_box{
        font-weight: bold;
        font-size: 26px;
      }
      .mob_box{
        font-size: 16px;
      }
    }
    .firstbot_box{
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      bottom: 25px;
      left: 0px;
      padding: 0 18px;
      display: flex;
      justify-content: space-between;
      .firstbot_left{
        width: 65%;
        font-size: 14px;
        color: @text-color-strong;
        padding-right: 25px;
        view{
          margin-top: 6px;
        }
      }
      .firstbot_right{
        width: 35%;
        // position: absolute;
        // top: 50px;
        // right: 30px;
        image{
          margin-top: 50px;
          width: 85px;
          height: 85px;
        }
      }
    }
  }
}
.third_type{
  position: relative;
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  // padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: @text-color-font;
  color: @text-color-font;
  .c_box{
    width: 100%;
    position: relative;
    .first_bg_img{
      width: 100%;
      height: 100%;
    }
    .avatar_box{
      color: @text-color-font;
      position: absolute;
      top: 40px;
      right: 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      .avatar_img_box{
        width: 90px;
        height: 90px;
        border-radius: 50%;
        .avatar_img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid @text-color-font;
        }
      }
    }
    .firstinfo_box{
      width: 100%;
      text-align: center;
      color: @text-color-font;
      position: absolute;
      top: 132px;
      right: 0px;
      view{
        font-size: 14px;
        margin-top: 10px;
      }
      .name_box{
        font-weight: bold;
        font-size: 26px;
      }
      .mob_box{
        font-size: 16px;
      }
      .third_position{
        text{
          display: inline-block;
          font-size: 12px;
          border-radius: 10px;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
    .firstbot_box{
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      bottom: 60px;
      left: 0px;
      padding: 0 25px;
      text-align: center;
      .firstbot_left{
        font-size: 14px;
        view{
          margin-top: 2px;
        }
      }
    }
    .bot_company{
      width: 100%;
      position: absolute;
      text-align: center;
      font-size: 14px;
      bottom: 15px;
      left: 0;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .firstbot_right{
    text-align: right;
    margin-top: 10px;
    padding-right: 10px;
    image{
      width: 85px;
      height: 85px;
    }
  }
}
.fouth_type{
  position: relative;
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  // padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: @text-color-font;
  color: @text-color-font;
  .c_box{
    width: 100%;
    height: 400px;
    position: relative;
    .first_bg_img{
      width: 100%;
      height: 100%;
    }
    .avatar_box{
      position: absolute;
      top: 40px;
      right: 30px;
      width: 90px;
      height: 90px;
      .avatar_img{
        width: 100%;
        height: 100%;
        border: 1px solid @text-color-font;
      }
    }
    .firstinfo_box{
      position: absolute;
      top: 145px;
      right: 30px;
      text-align: right;
      view{
        font-size: 14px;
        margin-top: 10px;
      }
      .name_box{
        font-weight: bold;
        font-size: 26px;
      }
    }
    .firstbot_box{
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      bottom: 30px;
      left: 0px;
      padding: 0 25px;
      .firstbot_left{
        width: 80%;
        font-size: 14px;
        padding-right: 25px;
        view{
          margin-top: 6px;
          image{
            width: 18px;
            margin-right: 10px;
            vertical-align: middle;
          }
          text{
            vertical-align: middle;
          }
        }
      }
    }
  }
  .firstbot_right{
    text-align: right;
    margin-top: 10px;
    padding-right: 10px;
    image{
      width: 85px;
      height: 85px;
    }
  }
}
.fifth_type{
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  padding: 20px 20px 0px 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: @text-color-font;
  .c_box{
    position: relative;
    width: 100%;
    position: relative;
    .first_bg_img{
      width: 100%;
      height: 100%;
    }
  }
  .name_box{
    margin: 6px 0px 10px 0px;
    color: @text-color-strong;
    .name_top{
      .name_first{
        font-size: 18px;
        font-weight: 700;
      }
      .name_two{
        font-size: 12px;
        color: @text-color-weak;
        margin-left: 8px;
      }
    }
    .name_bot{
      font-size: 14px;
      margin-top: 5px;
    }
  }
  .firstbot_box{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-bottom: 10px;
    .pos_img{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 58px;
    }
    .firstbot_left{
      font-size: 14px;
      color: @text-color-strong;
      padding-left: 25px;
      text-align: right;
      view{
        margin-top: 6px;
      }
    }
    .firstbot_right{
      image{
        width: 85px;
        height: 85px;
      }
    }
  }
}
.sixth_type{
  box-shadow: 0px 1px 8px 0px rgba(186, 186, 186, 0.5);
  box-sizing: border-box;
  background: @text-color-font;
  width: 100%;
  .top_box{
    display: flex;
    justify-content: space-between;
    padding: 14px;
    box-sizing: border-box;
    position: relative;
    .pos_one{
      position: absolute;
      right: 0;
      top: 0;
      width: 80px;
    }
    .pos_two{
      width: 80px;
      position: absolute;
      left: 0;
      bottom: -70px;
    }
    .t_left{
      position: relative;
      width: 70%;
      image{
        width: 100%;
      }
    }
    .t_right{
      width: 30%;
      .vertical_name{
        padding-top: 20px;
        text-align: center;
        width: 30px;
        margin: 0 auto;
        margin-bottom: 10px;
        font-size: 28px;
        color: @text-color-strong;
      }
      .vertical_position{
        text-align: center;
        width: 20px;
        margin: 0 auto;
        font-size: 14px;
        color: @text-color-weak;
      }
    }
  }
  .infomation_box{
    margin-top: 30px;
    padding-right: 14px;
    text-align: right;
    font-size: 12px;
    color: @text-color-strong;
    view{
      margin-top: 6px;
    }
    .infomation_mobile{
      font-size: 14px;
    }
  }
  .wxcode_box{
    position: relative;
    padding: 0 14px;
    margin-top: 10px;
    text-align: right;
    image{
      width: 85px;
      height: 85px;
    }
    .pos_three{
      position: absolute;
      left: 14px;
      bottom: 0;
      width: 60px;
    }
  }
}
</style>
