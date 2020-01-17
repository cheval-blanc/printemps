<template>
  <div class="action-container"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/scss/mixins';

.action-container {
  @include flex-vertical-align();
  flex: initial;
  width: 417px;
  min-width: 200px;
  justify-content: flex-end;
  padding-right: 15px;
}
</style>
