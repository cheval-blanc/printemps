<template>
  <main>
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
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    AlbumCard,
  },
  data: () => ({
    flippedIndex: -1,
  }),
  computed: mapState({
    albums: state => state.albums.all,
  }),
  beforeCreate() {
    this.$store.dispatch('albums/fetchAlbums');
  },
  methods: {
    ...mapMutations('albums', ['toggleFlipped']),
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

main {
  @include responsive-grid-columns();

  width: 100%;
  padding: ($lg-pad + $masthead-height) $lg-pad 30px;
  box-sizing: border-box;

  display: grid;
  grid-gap: 16px;
  align-items: center;
}
</style>
