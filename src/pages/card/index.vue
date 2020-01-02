<template>
  <view>分包：pages/card/index</view>
</template>
<script>
import api from '@/core/api'
import common from '@/share/common'
import analysis from '@/share/analysis'
// import { $Message } from '../../lib/iView/base/index'
import cardList from '@/components/cardList'
import BaseMore from '@/components/BaseMore'
export default {
  components: {
    cardList,
    cardListTeam: cardList,
    BaseMore
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  onLoad() {
    this.extConfig = api.extConfig
    let LaunchOption = uni.getLaunchOptionsSync()
    console.log('\\\\', LaunchOption)
    if (LaunchOption.scene === 1048) {
      console.log('1048')
      analysis.saveAnlysis({
        event: {
          type: 'mt',
          id: 'index:page:VCARD_distinguishIndex',
          page: '/pages/index'
        },
        params: {
          targetId: 'wx837e24e675ea733a',
          show_flag: '1',
          target_flag: true
        }
      })
    }
    analysis.getStartTime('/pages/index')
  },
  onShow() {
  },
  onHide() {
    
  },
  onUnload() {
    
  },
  // 加载更多
  onReachBottom (e) {
    
  },
  // 下拉刷新
  onPullDownRefresh () {
    
  }
}
</script>
<style lang="less">
@import '../../common/less/common.less';

</style>
