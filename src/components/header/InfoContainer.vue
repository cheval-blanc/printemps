<template>
  <div class="info-container">
    <img class="thumbnail" src="https://via.placeholder.com/100" />
    <playing-track />
  </div>
</template>

<script>
import PlayingTrack from './PlayingTrack.vue';

export default {
  components: {
    PlayingTrack,
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins';

.info-container {
  @include flex-vertical-align();
  flex: 1;
  overflow: hidden;

  .thumbnail {
    flex: none;
    $thumbnail-size: 63px;
    width: $thumbnail-size;
    height: $thumbnail-size;
    border-radius: 2px;
    margin-right: 5px;
  }
}
</style>
