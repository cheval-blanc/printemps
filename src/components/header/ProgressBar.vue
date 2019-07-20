<template>
  <div class="progress-bar" ref="progressBar" @click="movePlayTime($event)">
    <div class="scrubber" :style="{ width: `${scrubberRatio}%` }"></div>

    <span class="play-time current">{{ currentTime }}</span>
    <span class="play-time remain">{{ remainTime }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { secToHms } from '../../common/util';

let progressUpdater = null;

export default {
  computed: mapState({
    audioCtx: state => state.audioCtx.audioCtx,
    paused: state => state.audioCtx.paused,
  }),
  data: ()=>({
    scrubberRatio: 0,
    currentTime: secToHms(),
    remainTime: secToHms(),
  }),
  watch: {
    paused() {
      if(this.paused) {
        clearInterval(progressUpdater);
        return;
      }

      progressUpdater = setInterval(() => {
        if(this.audioCtx.ended) {
          clearInterval(progressUpdater);
        } else {
          this.updateProgress();
        }
      }, 30);
    },
  },
  methods: {
    updateProgress() {
      const current = this.audioCtx.currentTime;
      const duration = this.audioCtx.duration;

      this.scrubberRatio = current / duration * 100;
      this.currentTime = secToHms(current);
      this.remainTime = secToHms(duration - current);
    },
    movePlayTime({ pageX }) {
      if(this.audioCtx.src.length === 0) { return; }

      const playTime = this.audioCtx.duration * (pageX / this.$refs.progressBar.clientWidth);
      this.$store.commit('audioCtx/setCurrentTime', playTime);

      this.updateProgress();
    },
  },
}
</script>

<style lang="scss" scoped>
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

    &.current { left: 4px; }
    &.remain { right: 4px; }
  }
}
</style>
