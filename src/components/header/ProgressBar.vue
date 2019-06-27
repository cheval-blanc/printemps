<template>
  <div class="progress-bar">

  </div>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.progress-bar {
  width: 100%;
  height: $progress-bar-height;
  background-color: rgba(137, 135, 140, 0.1);
  cursor: pointer;
}
</style>
