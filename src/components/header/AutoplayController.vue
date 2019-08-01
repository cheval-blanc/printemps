<template>
  <icon-button
    class="random-button"
    iconName="random"
    iconSize="1.4em"
    :class="{ 'turn-on': isRandom }"
    @click.native="toggleRandom"
  />
</template>

<script>
import IconButton from './IconButton.vue';

export default {
  components: {
    IconButton,
  },
  data: ()=>({
    isRandom: false,
  }),
  methods: {
    toggleRandom() {
      this.isRandom = !this.isRandom;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
$toggle-color: #EEE;

.random-button {
  width: 28px;
  height: 23px;
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
