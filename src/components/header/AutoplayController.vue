<template>
  <icon-button
    class="shuffle-button"
    icon-name="random"
    icon-size="20px"
    :class="{ 'turn-on': isShuffle }"
    @click.native="clickShuffleButton"
  />
</template>

<script>
import IconButton from './IconButton.vue';
import * as playingAlbum from '@/store/modules/playingAlbum';

export default {
  components: {
    IconButton,
  },
  computed: playingAlbum.mapState(['isShuffle']),
  methods: {
    ...playingAlbum.mapMutations(['toggleShuffle']),
    ...playingAlbum.mapActions(['shuffleQueue', 'sortQueue']),

    clickShuffleButton() {
      this.toggleShuffle();

      if (this.isShuffle) {
        this.shuffleQueue();
      } else {
        this.sortQueue();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.shuffle-button {
  color: #dbdbdb;

  &:hover,
  &:active {
    color: #c2c2c2;
  }
}

.turn-on {
  color: $toggle-color;

  &:hover,
  &:active {
    color: $toggle-color;
  }
}
</style>
