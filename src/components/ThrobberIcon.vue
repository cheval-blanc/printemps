<template>
  <div v-if="!isFetched" class="throbber-container">
    <v-icon size="3.2rem">fa-hourglass-start fa-spin</v-icon>
  </div>
</template>

<script>
import * as albums from '@/store/modules/albums';

export default {
  computed: albums.mapState(['isFetched']),
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.throbber-container {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  color: $primary-color;
}
</style>
