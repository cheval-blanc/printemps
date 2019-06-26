<template>
  <header>

  </header>
</template>

<script>
export default {
  name: 'Masthead',
  components: {

  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

header {
  position: fixed;
  width: 100%;
  height: $masthead-height;
  border-bottom: 1px solid #CCC;
  background: rgba(250, 250, 250, 0.85);
  box-sizing: border-box;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  z-index: 1;
}
</style>
