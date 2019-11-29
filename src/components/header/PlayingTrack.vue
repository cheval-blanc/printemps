<template>
  <div class="playing-track">
    <div class="track-title">{{ trackTitle }}</div>

    <div v-if="trackTitle.length !== 0" class="hashtag-wrapper">
      <v-icon class="hashtag">fa-hashtag</v-icon>
      <span class="track-info">{{ albumTitle }}</span>

      <v-icon class="hashtag last">fa-hashtag</v-icon>
      <span class="track-info">{{ artist }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('playingAlbum', ['trackTitle', 'albumTitle', 'artist']),
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.playing-track {
  @include flex-vertical-align();
  flex: 1;
  flex-direction: column;
  margin: 0 5px;
  overflow: hidden;

  .track-title,
  .track-info {
    color: $bold-color;
  }

  .track-title {
    @include text-overflow-ellipsis();
    text-align: center;
    margin-bottom: 5px;
    font-size: 1.2em;
  }

  .hashtag-wrapper {
    @include flex-vertical-align();

    .hashtag {
      margin-right: 2px;
      color: $primary-color;
      font-size: 0.8em;
      &.last {
        margin-left: $md-pad;
      }
    }

    .track-info {
      font-size: 0.9em;
    }
  }
}
</style>
