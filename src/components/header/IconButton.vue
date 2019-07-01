<template>
  <v-icon :size="iconSize">fa-{{ iconName }}</v-icon>
</template>

<script>
export default {
  props: ['iconSize', 'iconName']
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.v-icon {
  color: $primary-color;
  cursor: pointer;
  transition: all .2s ease-in-out;
  backface-visibility: hidden;

  &:hover {
    color: $bold-color;
    transform: scale(1.2);
  }
}
</style>
