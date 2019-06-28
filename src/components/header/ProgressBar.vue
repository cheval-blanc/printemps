<template>
  <div class="progress-bar">
    <div class="scrubber" :style="{ width: scrubberWidth }"></div>

    <span class="play-time current">{{ currentTime }}</span>
    <span class="play-time remain">{{ remainTime }}</span>
  </div>
</template>

<script>
export default {
  data: ()=>({
    scrubberWidth: '40%',
    currentTime: '0:34',
    remainTime: '5:67:89',
  }),
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/variables';

.progress-bar {
  position: relative;
  width: 100%;
  height: $progress-bar-height;
  background-color: rgba(137, 135, 140, 0.1);
  cursor: pointer;

  .scrubber {
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    background-color: #DA1C31;
  }

  .play-time {
    position: absolute;
    top: -16px;
    color: $bold-color;
    font-size: 0.9em;
    cursor: default;

    &.current { left: 3px; }
    &.remain { right: 3px; }
  }
}
</style>
