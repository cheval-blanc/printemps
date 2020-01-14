<template>
  <div class="info-container">
    <div v-if="albumArt === null" class="thumbnail"></div>
    <img v-else class="thumbnail" :src="`/images/${albumArt}`" />

    <playing-track />
    <autoplay-controller />
  </div>
</template>

<script>
import PlayingTrack from './PlayingTrack.vue';
import AutoplayController from './AutoplayController.vue';
import * as playingAlbum from '@/store/modules/playingAlbum';

export default {
  components: {
    PlayingTrack,
    AutoplayController,
  },
  computed: playingAlbum.mapState(['albumArt']),
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixins';

.info-container {
  @include flex-vertical-align();
  flex: 1;
  overflow: hidden;
  padding: 0 10px;

  .thumbnail {
    flex: none;
    $thumbnail-size: 64px;
    width: $thumbnail-size;
    height: $thumbnail-size;
    border-radius: 3px;
    background-color: #eee;
  }
}
</style>
