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
import * as audioCtx from '@/store/modules/audioCtx';
import * as playingAlbum from '@/store/modules/playingAlbum';

const seekingSec = 10;

export default {
  components: {
    IconButton,
  },
  data: () => ({
    iconSize: '3.4rem',
  }),
  computed: audioCtx.mapState(['audio', 'paused']),
  methods: {
    ...audioCtx.mapMutations(['setCurrentTime', 'pauseAudio']),
    ...audioCtx.mapActions(['playAudio']),
    ...playingAlbum.mapActions(['requestNextTrack', 'requestPreviousTrack']),

    pauseOrPlay() {
      if (this.paused) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    },
    playNext() {
      this.requestNextTrack();
    },
    playPrevious() {
      if (this.audio.currentTime > seekingSec) {
        this.setCurrentTime(0);
      } else {
        this.requestPreviousTrack();
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
@import '@/scss/variables';

.play-controller {
  margin-right: 30px;

  .play-icon {
    margin: 0 $md-pad;
  }
}
</style>
