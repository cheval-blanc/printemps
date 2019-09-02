<template>
  <icon-button
    class="random-button"
    icon-name="random"
    icon-size="18px"
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
  computed: mapState('trackManager', ['isShuffle']),
  methods: {
    toggleShuffle() {
      this.$store.commit('trackManager/toggleShuffle');

      if (this.isShuffle) {
        this.$store.dispatch('trackManager/shuffleQueue');
      } else {
        this.$store.dispatch('trackManager/sortQueue');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
$toggle-color: #eee;

.random-button {
  width: 25px;
  height: 21px;
  padding: 2px 0;
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
