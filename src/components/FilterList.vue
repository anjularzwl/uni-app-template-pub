<template>
  <view class="common-label tag-row">
    <view v-for="(tag, i) in filterList.selectTags" :key="tag.id" style="position: relative;">
      <view class="tag sure_label">
        {{tag.name}}
      </view>
      <image class="close" src="../static/close-blue.svg" @click="close(tag)"></image>
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      tags: {
        type: Array,
        default: []
      }
    },
    computed: mapState([
      // 映射 this.filterList 为 store.state.filterList
      'filterList'
    ]),
    methods: {
      close(tag) {
        // this.dealList(tag)
        const filter = this.filterList.filter[tag.index]
        this.filterList.selectTags = this.filterList.selectTags.filter(item => item.id !== tag.id)
        if (filter.type === 'single') {
          filter.selected = null
          filter.tags.forEach(i => {
            i.checked = false
          })
        } else {
          filter.selected = filter.selected.filter(i => i.id !== tag.id)
          filter.showText = this.showSelectText(filter.selected)
          filter.tags.forEach(i => {
            if (i.id === tag.id) {
              i.checked = false
            }
          })
        }
        this.$store.commit('updateFilterSelect', this.filterList.selectTags)
        this.$store.commit('updateFilter', {index: tag.index, filter: filter})
        console.log(331, this.$store.state.filterList)
        this.$emit('deleteTag')
      },
      showSelectText(list) {
        let text = ''
        list.forEach(item => {
          text = text + item.name + '，'
        })
        return text.slice(0, text.length - 1)
      },
    }
  }
</script>

<style lang="less">
@import '../common/less/common.less';
.common-label.tag-row {
  background: #fff;
  height: 100upx;
  padding: 0 25upx;
  align-items: center;
  flex-wrap: nowrap;
  overflow: auto;
  margin-bottom: 8upx;
  .tag {
    padding: 0 20upx;
    height: 50upx !important;
  }
  .sure_label {
    margin-right: 20upx;
    border: 1px solid @primary-color;
    background: fade(@primary-color, 10%);
  }
  .close {
    width: 30upx;
    height: 30upx;
    position: absolute;
    top: -10upx;
    right: 12upx;
  }
}
</style>
