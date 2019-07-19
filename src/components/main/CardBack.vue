<template>
  <div class="card-back">
    <div class="album-desc">
      <img class="sm-album-art" :src="albumArt" @click="$emit('flipCard')" />

      <div class="album-summary">
        <p class="album-title">{{ albumTitle }}</p>
        <p class="artist">{{ artist }}</p>
      </div>
    </div>

    <ul class="track-container">
      <li class="track" v-for="t in tracks" :key="t._id" @dblclick="requestTrack(t)">
        <div class="track-number">{{ t.trackNumber }}</div>
        <div class="track-title">{{ t.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { emit } from '../../common/binaryClient';

export default {
  props: [
    'albumArt',
    'albumTitle',
    'artist',
    'tracks',
  ],
  methods: {
    requestTrack({ filePath }) {
      emit(filePath);
    },
  },
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

.card-back > .track-container {
  @include custom-scroll();
  overflow-y: overlay;
  padding: 0 $sm-pad 4px;
  flex: 1;

  .track {
    @include flex-vertical-align();
    margin-bottom: 3px;
    cursor: pointer;

    &:hover .track-title {
      font-weight: 600;
    }

    .track-number {
      flex: none;
      width: 16px;
      margin-right: 4px;
      text-align: center;
      font-size: 0.8em;
      color: $primary-color;
    }

    .track-title {
      @include text-overflow-ellipsis();
      flex: 1;
      font-size: 1.0em;
      color: $bold-color;
    }
  }
}
</style>
