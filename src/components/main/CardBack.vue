<template>
  <div class="card-back">
    <div class="album-desc">
      <img
        class="sm-album-art"
        :src="`/images/${albumArt}`"
        @click="$emit('flipBack')"
      />

      <div class="album-summary">
        <p class="album-title">{{ albumTitle }}</p>
        <p class="artist">{{ artist }}</p>
      </div>
    </div>

    <track-list :tracks="tracks" @fetchQueue="fetchQueue" />
  </div>
</template>

<script>
import TrackList from './TrackList.vue';
import * as audioCtx from '@/store/modules/audioCtx';
import * as playingAlbum from '@/store/modules/playingAlbum';

export default {
  components: {
    TrackList,
  },
  props: {
    albumArt: {
      type: String,
      default: '',
    },
    albumTitle: {
      type: String,
      default: '',
    },
    artist: {
      type: String,
      default: '',
    },
    tracks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: playingAlbum.mapState({
    __albumTitle: state => state.albumTitle,
    __trackTitle: state => state.trackTitle,
  }),
  methods: {
    ...audioCtx.mapMutations(['setCurrentTime']),
    ...playingAlbum.mapActions(['fetchAlbumData', 'fetchPlayingIndex']),

    fetchQueue(trackTitle, trackNumber) {
      if (this.isSameTrack(trackTitle)) {
        this.setCurrentTime(0);
      } else {
        this.fetchAlbumData({
          queue: this.tracks,
          albumTitle: this.albumTitle,
          albumArt: this.albumArt,
          artist: this.artist,
        });

        this.fetchPlayingIndex(trackNumber);
      }
    },
    isSameTrack(trackTitle) {
      return (
        this.__albumTitle === this.albumTitle &&
        this.__trackTitle === trackTitle
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';
@import '@/scss/mixins';

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
      font-size: 1.3rem;
    }
    .album-title {
      font-weight: 600;
    }
  }
}
</style>
