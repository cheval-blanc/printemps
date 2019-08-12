<template>
  <icon-button
    class="random-button"
    iconName="random"
    iconSize="18px"
    :class="{ 'turn-on': isShuffle }"
    @click.native="toggleShuffle"
  />
</template>

<script>
import IconButton from './IconButton.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    IconButton,
  },
  computed: mapState('trackManager', [
    'isShuffle',
  ]),
  methods: {
    ...mapMutations('trackManager', [
      'toggleShuffle',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
$toggle-color: #EEE;

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

  &:hover, &:active {
    color: $toggle-color;
  }
}
</style>
