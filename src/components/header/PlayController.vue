<template>
  <div class="play-controller">
    <icon-button
      class="play-icon"
      iconName="backward"
      :iconSize="iconSize"
    />
    <icon-button
      class="play-icon"
      :iconName="paused ? 'play' : 'pause'"
      :iconSize="iconSize"
      @click.native="pauseOrPlay()"
    />
    <icon-button
      class="play-icon"
      iconName="forward"
      :iconSize="iconSize"
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
  computed: mapState('audioCtx', [
    'paused',
  ]),
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
