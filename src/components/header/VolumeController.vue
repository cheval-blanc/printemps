<template>
  <div class="volume-controller">
    <global-events @keyup.m="muteVolume" />

    <icon-button
      class="volume-status"
      :icon-name="`volume-${volumeStatus}`"
      :icon-size="`${volumeSize}px`"
      :style="{ width: `${volumeSize + 3}px` }"
      @click.native="muteVolume"
    />

    <volume-slider @changeVolume="updateVolumeStatus" />
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
import VolumeSlider from './VolumeSlider.vue';
import * as audioCtx from '@/store/modules/audioCtx';

export default {
  components: {
    IconButton,
    VolumeSlider,
  },
  data: () => ({
    volumeStatus: null,
    volumeSize: 20,
  }),
  computed: audioCtx.mapState(['audio', 'muted']),
  mounted() {
    this.updateVolumeStatus();
  },
  methods: {
    ...audioCtx.mapMutations(['toggleMuted']),

    muteVolume() {
      this.toggleMuted();

      if (this.muted) {
        this.volumeStatus = 'mute';
      } else {
        this.updateVolumeStatus();
      }
    },
    updateVolumeStatus(volume = this.audio.volume) {
      if (!this.muted) {
        this.volumeStatus = volume === 0 ? 'off' : volume < 0.5 ? 'down' : 'up';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';
@import '@/scss/mixins';

.volume-controller {
  @include flex-vertical-align();

  .volume-status {
    justify-content: left;
    margin-right: $md-pad;
  }
}
</style>
