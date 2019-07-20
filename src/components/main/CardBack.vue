<template>
  <div class="card-back">
    <div class="album-desc">
      <img class="sm-album-art" :src="albumArt" @click="$emit('flipCard')" />

      <div class="album-summary">
        <p class="album-title">{{ albumTitle }}</p>
        <p class="artist">{{ artist }}</p>
      </div>
    </div>

    <track-list :tracks="tracks" />
  </div>
</template>

<script>
import TrackList from './TrackList.vue';

export default {
  components: {
    TrackList,
  },
  props: [
    'albumArt',
    'albumTitle',
    'artist',
    'tracks',
  ],
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.card-back {
  @include card-style();
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}

.card-back > .album-desc {
  @include flex-vertical-align();
  padding: $sm-pad;

  .sm-album-art {
    flex: none;
    width: 45px;
    margin-right: $sm-pad;
    border-radius: 50%;
    cursor: pointer;
  }

  .album-summary {
    flex: 1;
    overflow: hidden;

    p {
      @include text-overflow-ellipsis();
      color: $bold-color;
      font-size: 0.9em;
    }
    .album-title {
      margin-bottom: 2px;
      font-weight: 600;
    }
  }
}
</style>
