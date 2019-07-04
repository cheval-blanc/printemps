<template>
  <div class="album-card">
    <div class="flipper" :class="{ flip: isFlipped }">
      <card-face
        :albumArt="album.albumArt"
        :albumTitle="album.title"
        :pubYear="album.year"
        :artist="album.artist"
      />
      <card-back
        :albumArt="album.albumArt"
        :albumTitle="album.title"
        :artist="album.artist"
        :tracks="album.tracks"
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
  props: [
    'album',
  ],
  data: ()=>({
    isFlipped: false,
  }),
}
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
  transition: 1.0s;
  transform-style: preserve-3d;

  &.flip {
    transform: rotateY(180deg);
  }

  & > div {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
