<template>
  <icon-button
    class="random-button"
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
$toggle-color: #eee;

.random-button {
  width: 26px;
  height: 24px;
  border-radius: 3px;
  text-align: center;
}

.turn-on {
  color: $toggle-color;
  background-color: $primary-color;

  &:hover,
  &:active {
    color: $toggle-color;
  }
}
</style>
