<template>
  <view class="filter" catchtouchmove="preventTouchMove">
    <van-popup
      :show="show"
      position="right"
      overlay
      @close="onClose">
      <view class="filter-body">
        <view v-for="(item, index) in filterList.filter" :key="item.title" style="padding: 0 20upx; padding-bottom: 40upx;" v-if="item.tags.length">
          <view class="header">
            <view class="header-title">{{item.title}}</view>
            <view class="selected" v-if="item.type === 'single'">{{item.selected ? item.selected.name : '全部'}}</view>
            <view class="selected" v-else>{{item.showText ? item.showText : '全部'}}</view>
          </view>
          <view class="common-label">
            <view class="tag cus-tag" :class="{'sure_label': tag.checked}"  v-for="(tag, i) in item.tags" :key="tag.id" @click="selectTag({tag, list: item, i: index, index: i})">{{tag.name}}</view>
          </view>
        </view>
        <view class="filter-btn" :class="{'ipx': isPhoneX}">
          <view @click="reset()">重置</view>
          <view class="right" @click="sure()">确定</view>
        </view>
      </view>
    </van-popup>
    <van-popup
      :show="showCompany"
      position="right"
      overlay
      @close="onOverClose">
      <view class="filter-body">
        <view>
          <phone-directory :selectTags="selectTags" :phones="phones" @right="right" @leave="showCompany = false" v-if="showCompany"></phone-directory>
        </view>
      </view>
    </van-popup>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import pinyin from 'pinyin'
  import phoneDirectory from '@/lib/phone-directory.vue'
  export default {
    components: {
      phoneDirectory
    },
    props: {
      list: {
        type: Object,
        default: []
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showCompany: false,
        phones: {},
        currentFilter: {},
        selectTags: []
      }
    },
    computed: mapState([
      // 映射 this.filterList 为 store.state.filterList
      'filterList',
      'isPhoneX'
    ]),
    methods: {
      preventTouchMove () {

      },
      onClose() {
        this.show = false
        this.dealTags()
        this.$emit('close')
      },
      onOverClose() {
        this.showCompany = false
      },
      right(e) {
        console.log(133, e)
        this.currentFilter.selected = e
        this.currentFilter.tags.forEach(item => {
          item.checked = false
          this.currentFilter.selected.forEach(i => {
            if (i.id === item.id) {
              item.checked = true
            }
          })
        })
        console.log('331', this.currentFilter)
        this.currentFilter.showText = this.showSelectText(this.currentFilter.selected)
        this.showCompany = false
        this.$store.commit('updateFilter', {index: this.currentFilter.index, filter: this.currentFilter})
        console.log('state', this.$store.state.filterList)
      },
      initCompanyTag() {
        const labelList = Object.assign([], this.$store.state.allCompanyTags) 
        this.selectTags = this.currentFilter.selected
        const map = {}
        labelList.forEach(item => {
          this.selectTags.forEach(tag => {
            if (tag.id === item.id) {
              item.checked = true
            }
          })
          let name = pinyin(item.name, {
            segment: false,
            style: pinyin.STYLE_FIRST_LETTER
          })
          let allName = pinyin(item.name, {
            style: pinyin.STYLE_NORMAL
          })
          let firstName = name[0][0].slice(0, 1)
          if (!/[a-zA-z]/.test(firstName)) {
            firstName = 'no'
          } else {
            firstName = firstName.toUpperCase()
          }
          if (map[firstName] && map[firstName].length) {
            map[firstName].push({
              id: item.id,
              name: item.name,
              checked: item.checked,
              spell: allName.join('')
            })
          } else {
            map[firstName] = [{
              id: item.id,
              name: item.name,
              checked: item.checked,
              spell: allName.join('')
            }]
          }
        })
        let newkey = Object.keys(map).sort()
        let newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = map[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        this.phones = newObj
      },
      selectTag({tag, list, i, index}) {
        if (list.type === 'multiple') {
          return this.checkbox(tag, list, i)
        }
        list.tags.forEach(element => {
          element.checked = false
        })
        tag.checked = !tag.checked
        if (tag.checked) {
          if (index !== 0) {
            list.selected = tag
          } else {
            list.selected = null
          }
        }
        this.$store.commit('updateFilter', {index: i, filter: list})
      },
      checkbox(tag, list, i) {
        if (tag.id === 'all') {
          this.showCompany = true
          this.currentFilter = list
          this.currentFilter.index = i
          this.initCompanyTag()
          return
        }
        tag.checked = !tag.checked
        if (tag.checked) {
          list.selected.push(tag)
        } else {
          list.selected = list.selected.filter(item => item.id !== tag.id)
        }
        list.showText = this.showSelectText(list.selected)
        this.$store.commit('updateFilter', {index: i, filter: list})
      },
      showSelectText(list) {
        let text = ''
        list.forEach(item => {
          text = text + item.name + '，'
        })
        return text.slice(0, text.length - 1)
      },
      reset() {
        this.filterList.filter.forEach(item => {
          item.selected = null
          item.tags.forEach((tag, index) => {
            if (index === 0) {
              tag.checked = true
            } else {
              tag.checked = false
            }
          })
        })
        // this.show = false
        this.$store.commit('updateFilterSelect', [])
        this.$store.commit('clearFilter', this.filterList.filter)
        this.$emit('close')
      },
      sure() {
        this.show = false
        this.dealTags()
        this.$emit('close')
      },
      dealTags() {
        const tags = []
        this.filterList.filter.forEach((item, i) => {
          if (item.type === 'single') {
            if (item.selected) {
              tags.push(item.selected)
              item.selected.index = i
            }
          } else {
            if (item.selected.length) {
              item.selected.forEach(tag => {
                tags.push(tag)
                tag.index = i
              })
            }
          }
        })
        this.$store.commit('updateFilterSelect', tags)
      }
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.filter {
  .filter-body {
    width: 90vw;
    height: 100vh;
    position: relative;
    .header {
      margin-bottom: 10upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
      .selected {
        color: @primary-color;
        max-width: 450upx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .header-title {
        font-weight: bold;
        font-size: 15px;
        color: #000;
      }
    }
    .common-label {
      .cus-tag{
        width: 191upx;
        text-align: center;
        margin-top: 20upx;
        box-sizing: border-box;
        display: inline-block;
        &:nth-child(3n-1) {
          margin: 20upx 20upx 0 20upx;
        }
      }
      .sure_label {
        background: fade(@primary-color, 10%);
        border: 1px solid #1F7DDE;
      }
    }
    .filter-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #ddd;
      view {
        width: 50%;
        text-align: center;
        float: left;
        height: 86upx;
        line-height: 86upx;
      }
      .right {
        background: @primary-color;
        color: #fff;
      }
    }
  }
}
</style>
