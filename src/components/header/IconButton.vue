<template>
  <v-icon :size="iconSize">fa-{{ iconName }}</v-icon>
</template>

<script>
export default {
  props: {
    iconSize: {
      type: String,
      default: '1.2rem',
    },
    iconName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.v-icon {
  color: $primary-color;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  backface-visibility: hidden;

  &:hover,
  &:active {
    color: $bold-color;
    transform: scale(1.2);
  }
}
</style>
