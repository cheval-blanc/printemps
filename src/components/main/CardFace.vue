<template>
  <div class="card-face">
    <img class="album-art" src="https://via.placeholder.com/400" />

    <div class="album-desc">
      <p class="album-title">{{ albumTitle }}</p>
      <p class="pub-year">{{ pubYear }}</p>
      <p class="artist">{{ artist }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=>({
    albumTitle: 'Lorem ipsum dolor sit amet',
    pubYear: '2019',
    artist: 'Lorem ipsum',
  }),
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.card-face {
  @include card-style();
  transform: rotateY(0deg);
  z-index: 1;
  display: flex;
  flex-direction: column;

  .album-art {
    flex: none;
    width: 100%;
    border-radius: $card-border-radius $card-border-radius 0 0;
  }

  .album-desc {
    flex: 1;
    position: relative;
    margin: 6px $md-pad;

    & > p {
      @include text-ellipsis();
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
