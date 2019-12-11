<template>
  <icon-button
    class="shuffle-button"
    icon-name="random"
    icon-size="20px"
    :class="{ 'turn-on': isShuffle }"
    @click.native="toggleShuffle"
  />
</template>

<script>
import IconButton from './IconButton.vue';
import { mapState } from 'vuex';

export default {
  components: {
    IconButton,
  },
  computed: mapState('playingAlbum', ['isShuffle']),
  methods: {
    toggleShuffle() {
      this.$store.commit('playingAlbum/toggleShuffle');

      if (this.isShuffle) {
        this.$store.dispatch('playingAlbum/shuffleQueue');
      } else {
        this.$store.dispatch('playingAlbum/sortQueue');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
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
