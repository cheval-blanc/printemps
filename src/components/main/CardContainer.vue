<template>
  <main>

  </main>
</template>

<script>
export default {
  components: {

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
  grid-template-columns: repeat(1, 1fr);
  grid-gap: $md-pad;
  justify-items: center;
  align-items: center;
}
</style>
