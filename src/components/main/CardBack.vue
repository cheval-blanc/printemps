<template>
  <div class="card-back"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins';

.card-back {
  @include card-style();
  transform: rotateY(180deg);
}
</style>
