<template>
  <view class="mask-container" @click="$emit('clickMask')"></view>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.mask-container {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 1;
}
</style>
