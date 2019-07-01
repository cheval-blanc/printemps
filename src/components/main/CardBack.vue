<template>
  <div class="card-back">
    <div class="album-desc">
      <img class="sm-album-art" src="https://via.placeholder.com/100" />

      <div class="album-summary">
        <p class="album-title">{{ albumTitle }}</p>
        <p class="artist">{{ artist }}</p>
      </div>
    </div>

    <ul class="track-container">
      <li class="track" v-for="t in tracks" :key="t.number">
        <div class="track-number">{{ t.number }}</div>
        <div class="track-title">{{ t.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: ()=>({
    albumTitle: 'Lorem ipsum dolor sit amet',
    artist: 'Lorem ipsum',
    tracks: [
      { number: 1, title: 'Lorem ipsum dolor sit amet' },
      { number: 2, title: 'Lorem ipsum dolor sit amet' },
    ],
  }),
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
  flex: initial;
  display: flex;
  margin: $sm-pad;

  .sm-album-art {
    margin-right: 4px;
    width: 45px;
    border-radius: 50%;
  }

  .album-summary {
    @include flex-vertical-align();
    flex-direction: column;
    flex: 1;
    padding: 5px 0;

    p {
      @include text-ellipsis();
      color: $bold-color;
      font-size: 0.9em;
    }
  }
}

.card-back > .track-container {
  @include custom-scroll();
  overflow-y: auto;
  padding: 0 $sm-pad;
  flex: 1;

  .track {
    @include flex-vertical-align();
    @include text-ellipsis();

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
      font-size: 1.0em;
      color: $bold-color;
    }
  }
}
</style>
