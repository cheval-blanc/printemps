<template>
  <div class="volume-controller">
    <icon-button
      class="volume-status"
      :iconName="`volume-${volumeStatus}`"
      :iconSize="volumeSize"
      :style="{ width: volumeSize + 3 }"
      @click.native="muteVolume"
    />
    <volume-slider
      @changeVolume="updateVolumeStatus"
    />
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
  computed: mapState('audioCtx', [
    'audio',
    'muted',
  ]),
  data: ()=>({
    volumeStatus: null,
    volumeSize: 20,
  }),
  mounted() {
    this.updateVolumeStatus();
  },
  methods: {
    muteVolume() {
      this.$store.commit('audioCtx/toggleMuted');

      if(this.muted) {
        this.volumeStatus = 'mute';
      } else {
        this.updateVolumeStatus();
      }
    },
    updateVolumeStatus(volume = this.audio.volume) {
      if(!this.muted) {
        this.volumeStatus =  (volume === 0) ? 'off' : (volume < 0.5) ? 'down' : 'up';
      }
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
    margin-right: $md-pad;
  }
}
</style>
