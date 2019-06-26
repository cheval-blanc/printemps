<template>
  <div class="info-control-wrapper">

  </div>
</template>

<script>
export default {
  name: 'InfoControlWrapper',
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.info-control-wrapper {
  width: auto;
  height: $masthead-height - $progress-bar-height;
  padding: 0 $lg-pad;
  display: flex;
}
</style>
