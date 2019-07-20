<template>
  <div class="volume-controller">
    <icon-button
      class="volume-status"
      :iconName="`volume-${volumeStatus}`"
      :iconSize="volumeSize"
      :style="{ width: volumeSize + 3 }"
      @click.native="muteVolume"
    />
    <volume-slider />
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
import VolumeSlider from './VolumeSlider.vue';
import { mapState } from 'vuex';

export default {
  components: {
    IconButton,
    VolumeSlider,
  },
  computed: mapState({
    audioCtx: state => state.audioCtx.audioCtx,
    muted: state => state.audioCtx.muted,
  }),
  data: ()=>({
    volumeStatus: null,
    volumeSize: 20,
  }),
  mounted() {
    this.volumeStatus = this.getVolumeStatus();
  },
  methods: {
    muteVolume() {
      this.$store.commit('audioCtx/toggleMuted');
      this.volumeStatus = this.muted ? 'mute' : this.getVolumeStatus();
    },
    getVolumeStatus(volume = this.audioCtx.volume) {
      return (volume === 0) ? 'off' : (volume < 0.5) ? 'down' : 'up';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.volume-controller {
  @include flex-vertical-align();

  .volume-status {
    margin-right: $lg-pad;
  }
}
</style>
