<template>
  <div class="play-controller">
    <global-events
      @keyup.k="pauseOrPlay"
      @keyup.l="seekForward"
      @keyup.39="seekForward"
      @keyup.j="seekBackward"
      @keyup.37="seekBackward"
    />

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
import { mapState, mapMutations } from 'vuex';

const seekingSec = 10;

export default {
  components: {
    IconButton,
  },
  data: () => ({
    iconSize: '3.4rem',
  }),
  computed: mapState('audioCtx', ['audio', 'paused']),
  methods: {
    ...mapMutations('audioCtx', ['setCurrentTime']),

    pauseOrPlay() {
      if (this.paused) {
        this.$store.dispatch('audioCtx/playAudio');
      } else {
        this.$store.commit('audioCtx/pauseAudio');
      }
    },
    playNext() {
      this.$store.dispatch('playingAlbum/requestNextTrack');
    },
    playPrevious() {
      if (this.audio.currentTime > seekingSec) {
        this.setCurrentTime(0);
      } else {
        this.$store.dispatch('playingAlbum/requestPreviousTrack');
      }
    },
    seekForward() {
      if (this.audio.src.length > 0) {
        this.setCurrentTime(this.audio.currentTime + seekingSec);
        this.emitChangeCurrentTime();
      }
    },
    seekBackward() {
      if (this.audio.src.length > 0) {
        this.setCurrentTime(this.audio.currentTime - seekingSec);
        this.emitChangeCurrentTime();
      }
    },
    emitChangeCurrentTime() {
      if (this.paused) {
        this.$root.$emit('changeCurrentTime');
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
