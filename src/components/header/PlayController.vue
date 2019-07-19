<template>
  <div class="play-controller">
    <icon-button
      class="play-icon"
      :iconSize="iconSize"
      iconName="backward"
    />
    <icon-button
      class="play-icon"
      :iconSize="iconSize"
      :iconName="paused ? 'play' : 'pause'"
      @click.native="pauseOrPlay()"
    />
    <icon-button
      class="play-icon"
      :iconSize="iconSize"
      iconName="forward"
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
  computed: mapState({
    audioCtx: state => state.audioCtx.audioCtx,
    paused: state => state.audioCtx.paused,
  }),
  data: ()=>({
    iconSize: '2.5em',
  }),
  methods: {
    pauseOrPlay() {
      if(this.paused) {
        this.$store.dispatch('audioCtx/playAudio');
      } else {
        this.$store.commit('audioCtx/pauseAudio');
      }
    },
  },
}
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
