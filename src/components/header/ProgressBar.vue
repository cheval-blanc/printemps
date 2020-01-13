<template>
  <div ref="progressBar" class="progress-bar" @click="movePlayTime($event)">
    <div class="scrubber" :style="{ width: `${scrubberRatio}%` }"></div>

    <span class="play-time current">{{ currentTime }}</span>
    <span class="play-time remain">{{ remainTime }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { formatSec } from '../../common/util';

let progressUpdater = null;

export default {
  data: () => ({
    scrubberRatio: 0,
    currentTime: formatSec(),
    remainTime: formatSec(),
  }),
  computed: mapState('audioCtx', ['audio', 'paused']),
  watch: {
    paused() {
      if (this.paused) {
        clearInterval(progressUpdater);
        return;
      }

      progressUpdater = setInterval(() => {
        if (this.audio.ended) {
          clearInterval(progressUpdater);
          this.scrubberRatio = 0;

          this.$store.commit('audioCtx/setPaused', true);
          this.$store.dispatch('playingAlbum/requestNextTrack');
        } else {
          this.updateProgress();
        }
      }, 30);
    },
  },
  created() {
    this.$root.$on('changeCurrentTime', this.updateProgress);
  },
  methods: {
    updateProgress() {
      const { currentTime, duration } = this.audio;

      this.scrubberRatio = (currentTime / duration) * 100;
      this.currentTime = formatSec(currentTime);
      this.remainTime = formatSec(duration - currentTime);
    },
    movePlayTime({ pageX }) {
      if (this.audio.src.length === 0) {
        return;
      }

      this.$store.commit(
        'audioCtx/setCurrentTime',
        this.audio.duration * (pageX / this.$refs.progressBar.clientWidth),
      );
      this.updateProgress();
    },
  },
};
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
    background-color: #c73838;
    transition: width 0.05s ease-out;
  }

  .play-time {
    position: absolute;
    top: -17px;
    color: $bold-color;
    font-size: 1.3rem;
    cursor: default;

    &.current {
      left: 4px;
    }
    &.remain {
      right: 4px;
    }
  }
}
</style>
