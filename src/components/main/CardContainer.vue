<template>
  <main>
    <album-card
      v-for="album in albums"
      :key="album._id"
      :album="album"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex';

import AlbumCard from './AlbumCard.vue';

export default {
  components: {
    AlbumCard,
  },
  computed: mapState({
    albums: state => state.albums.all,
  }),
  beforeCreate() {
    this.$store.dispatch('albums/fetchAlbums');
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

main {
  width: 100%;
  padding: ($lg-pad + $masthead-height) $lg-pad 30px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 16px;
  align-items: center;
}
</style>
