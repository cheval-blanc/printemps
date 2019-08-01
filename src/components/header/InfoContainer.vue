<template>
  <div class="info-container">
    <div class="thumbnail" v-if="albumArt === null"></div>
    <img
      class="thumbnail"
      :src="albumArt"
      v-else
    />

    <playing-track />
    <autoplay-controller />
  </div>
</template>

<script>
import PlayingTrack from './PlayingTrack.vue';
import AutoplayController from './AutoplayController.vue';
import { mapState } from 'vuex';

export default {
  components: {
    PlayingTrack,
    AutoplayController,
  },
  computed: mapState('trackManager', [
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
  padding: 0 10px;

  .thumbnail {
    flex: none;
    $thumbnail-size: 64px;
    width: $thumbnail-size;
    height: $thumbnail-size;
    border-radius: 3px;
    background-color: #EEE;
  }
}
</style>
