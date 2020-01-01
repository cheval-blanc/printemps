<template>
  <div class="card-face">
    <div class="placeholder">
      <img
        class="album-art"
        :src="`/images/${albumArt}`"
        @click="$emit('flipOver')"
      />
    </div>

    <div class="album-desc">
      <p class="album-title">{{ albumTitle }}</p>
      <p class="pub-year">{{ pubYear }}</p>
      <p class="artist">{{ artist }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albumArt: {
      type: String,
      default: '',
    },
    albumTitle: {
      type: String,
      default: '',
    },
    pubYear: {
      type: Number,
      default: 0,
    },
    artist: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.card-face {
  @include card-style();
  transform: rotateY(0deg);
  display: flex;
  flex-direction: column;

  .placeholder {
    flex: none;
    width: 100%;
    padding-top: 100%;
    background-color: #eee;
    border-radius: $card-border-radius $card-border-radius 0 0;

    .album-art {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: inherit;
      cursor: pointer;
    }
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
      font-size: 1.4rem;
      font-weight: 600;
    }
    .pub-year {
      font-size: 1.1rem;
      color: $primary-color;
    }
    .artist {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 1.3rem;
    }
  }
}
</style>
