<template>
  <div class="card-face">
    <img class="album-art" src="https://via.placeholder.com/400" />

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.card-face {
  @include card-style();
  transform: rotateY(0deg);
  z-index: 1;

  .album-art {
    width: 100%;
    border-radius: $card-border-radius $card-border-radius 0 0;
  }
}
</style>
