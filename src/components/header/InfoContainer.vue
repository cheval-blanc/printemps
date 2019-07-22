<template>
  <div class="info-container">
    <img
      class="thumbnail"
      v-if="albumArt !== null"
      :src="albumArt"
    />
    <playing-track />
  </div>
</template>

<script>
import PlayingTrack from './PlayingTrack.vue';
import { mapState } from 'vuex';

export default {
  components: {
    PlayingTrack,
  },
  computed: mapState('playingAlbum', [
    'albumArt',
  ]),
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
