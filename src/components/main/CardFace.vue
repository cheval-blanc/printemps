<template>
  <div class="card-face">
    <img class="album-art" :src="albumArt" @click="clickAlbumArt" />

    <div class="album-desc">
      <p class="album-title">{{ albumTitle }}</p>
      <p class="pub-year">{{ pubYear }}</p>
      <p class="artist">{{ artist }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'albumArt',
    'albumTitle',
    'pubYear',
    'artist',
  ],
  methods: {
    clickAlbumArt() {
      this.$emit('flipCard');
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.card-face {
  @include card-style();
  display: flex;
  flex-direction: column;

  .album-art {
    flex: none;
    width: 100%;
    border-radius: $card-border-radius $card-border-radius 0 0;
    cursor: pointer;
  }

  .album-desc {
    flex: 1;
    position: relative;
    margin: 6px $md-pad 8px;

    & > p {
      @include text-overflow-ellipsis();
      color: $bold-color;
    }

    .album-title {
      margin-bottom: 3px;
      font-size: 1.0em;
      font-weight: 600;
    }
    .pub-year {
      font-size: 0.8em;
      color: $primary-color;
    }
    .artist {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 0.9em;
    }
  }
}
</style>
