<template>
  <div ref="volumeBar" class="volume-bar" @click="updateVolume($event)">
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
import { mapState } from 'vuex';

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
    ...mapState('audioCtx', ['audio']),
    halfIconSize() {
      return (this.iconSize / 2) * -1;
    },
  },
  mounted() {
    this.handlePos = this.audio.volume * this.$refs.volumeBar.clientWidth;

    this.$root.$on('mMoveVolume', this.mMoveVolume);
    this.$root.$on('mUpVolume', this.mUpVolume);
  },
  methods: {
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
      this.$store.commit('audioCtx/setVolume', clamped);
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
