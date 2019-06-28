<template>
  <div class="playing-track">
    <div class="track-title">{{ trackTitle }}</div>

    <div class="hashtag-wrapper">
      <v-icon class="hashtag">fa-hashtag</v-icon>
      <span class="sub-title">{{ artist }}</span>

      <v-icon class="hashtag last">fa-hashtag</v-icon>
      <span class="sub-title">{{ album }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=>({
    trackTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    artist: 'Lorem ipsum',
    album: 'Lorem ipsum',
  }),
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.playing-track {
  @include flex-vertical-align();
  flex: 1;
  flex-direction: column;

  .track-title, .sub-title {
    color: $bold-color;
  }

  .track-title {
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
    .sub-title {
      font-size: 0.9em;
    }
  }
}
</style>
