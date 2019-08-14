<template>
  <div class="play-controller">
    <icon-button
      class="play-icon"
      icon-name="backward"
      :icon-size="iconSize"
      @click.native="playPrevious"
    />
    <icon-button
      class="play-icon"
      :icon-name="paused ? 'play' : 'pause'"
      :icon-size="iconSize"
      @click.native="pauseOrPlay"
    />
    <icon-button
      class="play-icon"
      icon-name="forward"
      :icon-size="iconSize"
      @click.native="playNext"
    />
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
import { mapState } from 'vuex';

export default {
  components: {
    IconButton,
  },
  data: () => ({
    iconSize: '2.5em',
  }),
  computed: mapState('audioCtx', ['audio', 'paused']),
  methods: {
    pauseOrPlay() {
      if (this.paused) {
        this.$store.dispatch('audioCtx/playAudio');
      } else {
        this.$store.commit('audioCtx/pauseAudio');
      }
    },
    playNext() {
      this.$store.dispatch('trackManager/requestNextTrack');
    },
    playPrevious() {
      if (this.audio.currentTime > 10) {
        this.$store.commit('audioCtx/setCurrentTime', 0);
      } else {
        this.$store.dispatch('trackManager/requestPreviousTrack');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.play-controller {
  margin-right: 30px;

  .play-icon {
    margin: 0 $md-pad;
  }
}
</style>
