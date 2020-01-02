<template>
  <view>
    <view>pages/index</view>
    <!-- 业务组件 -->
    <AuthLogin :show="isShowAuthModal" @updateToken="getToken()"></AuthLogin>
  </view>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/core/api'
import AuthLogin from '@/components/AuthLogin'
import AuthPhone from '@/components/AuthPhone'
import common from '@/share/common'
import moment from 'moment'
import mta from '@/wxcomponents/js/mta_analysis'
import analysis from '@/share/analysis'
import { setTimeout } from 'timers';
import iCard from '@/components/i-card'
import Contact from '@/components/contact'
export default {
  components: {
    AuthLogin,
    iCard,
    AuthPhone,
    Contact
	},
  data() {
    return {
      
    }
  },
  computed: mapState([
    // 映射 this.filterList 为 store.state.filterList
    'profile',
    'ofStatus',
    'isShowAuthModal',
    'isCheckUser'
  ]),
  methods: {
    getToken() {
      this.problemCount()
    },
    problemCount() {
      let data = {
        appId: api.appId,
        tenantId: uni.getStorageSync('register').unionId
      }
      this.$http.post(api.problemCountUrl, data).then(res => {
        console.log(res)
        this.tabList.forEach(item => {
          switch (item.id) {
            case 1:
              item.num = res.data.allot
              break
            case 2:
              item.num = res.data.doing
              break
            case 3:
              item.num = res.data.confirm
              break
            case 4:
              item.num = res.data.evaluate
              break
            default:
              break
          }
        })
        console.log(this.tabList)
        
      })
    }
  },
  onLoad(options) {
    let LaunchOption = wx.getLaunchOptionsSync()
    console.log('\\\\', LaunchOption)
    if (LaunchOption.scene === 1048) {
      console.log('1048')
      analysis.saveAnlysis({
        event: {
          type: 'mt',
          id: 'index:page:FB_distinguishIndex',
          page: '/pages/index'
        },
        params: {
          targetId: 'wx61bb8e43195c7ac5',
          show_flag: '1',
          target_flag: true
        }
      })
    }
    analysis.getStartTime('/pages/index')
    mta.Page.init()
  },
  onShow() {
    const data = {
      callback: () => {
        this.problemCount()
      },
      disserror: () => {
        console.log('errerrerrerr')
      }
    }
    this.$store.dispatch("login",  data)
  },
  onShareAppMessage() {

  },
  onUnload() {
    
  },
  onHide() {
    
  }
}
</script>
<style lang="less">
@import '../common/less/common.less';

</style>
