<template>
  <main
    ref="main"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="isBusy"
    infinite-scroll-distance="40"
  >
    <album-card
      v-for="(album, i) in albums"
      :key="album._id"
      :album="album"
      :album-index="i"
      @flipOver="flipOver"
      @flipBack="flipBack"
    />
  </main>
</template>

<script>
import AlbumCard from './AlbumCard.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    AlbumCard,
  },
  data: () => ({
    flippedIndex: -1,
    lastWidth: 0,
    lastResizedTime: 0,
  }),
  computed: {
    ...mapState({
      albums: state => state.albums.all,
    }),
    ...mapGetters('albums', ['isBusy']),
  },
  mounted() {
    this.lastWidth = document.body.clientWidth;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    ...mapMutations('albums', ['toggleFlipped']),
    loadMore() {
      const reqCount = this.getReqCount();
      this.$store.dispatch('albums/fetchAlbums', reqCount);
    },
    getReqCount() {
      const mainStyle = window.getComputedStyle(this.$refs.main, null);
      const columnCount = mainStyle
        .getPropertyValue('grid-template-columns')
        .split(' ').length;

      return columnCount * 2;
    },
    flipOver(albumIndex) {
      if (this.flippedIndex !== -1) {
        this.toggleFlipped(this.flippedIndex);
      }

      this.flippedIndex = albumIndex;
      this.toggleFlipped(albumIndex);
    },
    flipBack(albumIndex) {
      this.flippedIndex = -1;
      this.toggleFlipped(albumIndex);
    },
    handleResize() {
      const currentTime = Date.now();
      const { clientWidth, scrollTop } = document.body;

      if (
        currentTime - this.lastResizedTime > 500 &&
        clientWidth > this.lastWidth &&
        scrollTop === 0
      ) {
        this.loadMore();
      }

      this.lastResizedTime = currentTime;
      this.lastWidth = clientWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

main {
  @include responsive-grid-columns();

  width: 100%;
  padding: ($lg-pad + $masthead-height) $lg-pad 50px;
  box-sizing: border-box;

  display: grid;
  grid-gap: 16px;
  align-items: center;
}
</style>
