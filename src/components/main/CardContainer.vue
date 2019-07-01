<template>
  <main>
    <album-card />
  </main>
</template>

<script>
import AlbumCard from './AlbumCard.vue';

export default {
  components: {
    AlbumCard,
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

main {
  width: 100%;
  padding: ($lg-pad + $masthead-height) $lg-pad $lg-pad;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: $md-pad;
  align-items: center;
}
</style>
