import axios from 'axios';

import { bytesToImage } from '../../common/util';

const state = {
  all: [],
};

const mutations = {
  setAlbums(state, albums) {
    state.all = albums;
  },
};

const actions = {
  async fetchAlbums({ commit }) {
    const { data } = await axios.get('/albums');

    commit('setAlbums', data.map(({ albumArtFormat, albumArtBytes, ...rest }) => {
      rest.albumArt = bytesToImage(albumArtFormat, albumArtBytes);
      return rest;
    }));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
