<template>
  <div ref="volumeBar" class="volume-bar" @click="updateVolume($event)">
    <global-events @mousemove="mMoveVolume($event)" @mouseup="mUpVolume" />

    <icon-button
      class="volume-handle"
      icon-name="circle"
      :icon-size="`${iconSize}px`"
      :style="{ top: halfIconSize + 1.5, left: halfIconSize + handlePos }"
      @mousedown.native="mDownVolume"
    />
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
import * as audioCtx from '@/store/modules/audioCtx';

let volumeDragging = false;

export default {
  components: {
    IconButton,
  },
  data: () => ({
    iconSize: 15,
    handlePos: 0,
  }),
  computed: {
    ...audioCtx.mapState(['audio']),
    halfIconSize() {
      return (this.iconSize / 2) * -1;
    },
  },
  mounted() {
    this.handlePos = this.audio.volume * this.$refs.volumeBar.clientWidth;
  },
  methods: {
    ...audioCtx.mapMutations(['setVolume']),

    mDownVolume() {
      volumeDragging = true;
    },
    mMoveVolume($event) {
      if (volumeDragging) {
        this.updateVolume($event);
      }
    },
    mUpVolume() {
      if (volumeDragging) {
        volumeDragging = false;
      }
    },
    updateVolume({ pageX }) {
      const { clientWidth, offsetLeft } = this.$refs.volumeBar;

      const ratio = (pageX - offsetLeft) / clientWidth;
      const clamped = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

      this.handlePos = clamped * clientWidth;
      this.setVolume(clamped);

      this.$emit('changeVolume', clamped);
    },
  },
};
</script>

<style lang="scss" scoped>
.volume-bar {
  position: relative;
  width: 80px;
  height: 2px;
  background-color: #b9b9b9;
  cursor: pointer;

  .volume-handle {
    position: absolute;
  }
}
</style>
