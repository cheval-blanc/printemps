import axios from 'axios';

import { bytesToImage } from '../../common/util';

const state = {
  all: [],
  pageNumber: 0,
  isFetched: true,
  isEnd: false,
  isError: false,
};

const getters = {
  isBusy(state) {
    return !state.isFetched || state.isError;
  },
};

const mutations = {
  appendAlbums(state, albums) {
    state.all = state.all.concat(albums);
  },
  toggleFlipped(state, albumIndex) {
    state.all[albumIndex].isFlipped = !state.all[albumIndex].isFlipped;
  },
  increasePageNumber(state) {
    state.pageNumber += 1;
  },
  setFetched(state, isFetched) {
    state.isFetched = isFetched;
  },
  setEnd(state, isEnd) {
    state.isEnd = isEnd;
  },
  setError(state, isError) {
    state.isError = isError;
  },
};

const actions = {
  async fetchAlbums({ state, commit, dispatch }, itemCount) {
    try {
      if (state.isEnd) {
        return;
      }

      commit('setFetched', false);
      await dispatch('requestAlbums', itemCount);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setFetched', true);
    }
  },
  async requestAlbums({ state, commit }, itemCount) {
    const { data } = await axios.get(
      `/albums/${state.pageNumber}/${itemCount}`,
    );

    if (!Array.isArray(data)) {
      commit('setError', true);
      throw `Server error: ${data.errmsg}`;
    }

    if (data.length === 0) {
      commit('setEnd', true);
    } else {
      commit('increasePageNumber');
      commit(
        'appendAlbums',
        data.map(({ albumArtFormat, albumArtBytes, ...rest }) => {
          rest.albumArt = bytesToImage(albumArtFormat, albumArtBytes);
          rest.isFlipped = false;
          return rest;
        }),
      );
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
