<template>
  <div class="album-card">
    <div class="flipper" :class="{ flip: album.isFlipped }">
      <card-face
        :album-art="album.albumArt"
        :album-title="album.title"
        :pub-year="album.year"
        :artist="album.artist"
        @flipOver="$emit('flipOver', albumIndex)"
      />
      <card-back
        :album-art="album.albumArt"
        :album-title="album.title"
        :artist="album.artist"
        :tracks="album.tracks"
        @flipBack="$emit('flipBack', albumIndex)"
      />
    </div>
  </div>
</template>

<script>
import CardFace from './CardFace.vue';
import CardBack from './CardBack.vue';

export default {
  components: {
    CardFace,
    CardBack,
  },
  props: {
    album: {
      type: Object,
      default: null,
    },
    albumIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.album-card {
  position: relative;
  width: 100%;
  padding-top: 133%;
  perspective: 1000px;
}

.flipper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.8s ease-in-out;
  transform-style: preserve-3d;

  &.flip {
    transform: rotateY(180deg);
    will-change: contents;
  }

  & > div {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
