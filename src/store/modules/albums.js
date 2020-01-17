import { createNamespacedHelpers } from 'vuex';
import axios from 'axios';

const state = {
  all: [],
  isFetched: true,
  isEnd: false,
  isError: false,
};

const getters = {
  albums: state => state.all,
  isBusy: state => !state.isFetched || state.isEnd || state.isError,
};

const mutations = {
  appendAlbums(state, albums) {
    state.all = state.all.concat(albums);
  },
  toggleFlipped(state, albumIndex) {
    state.all[albumIndex].isFlipped = !state.all[albumIndex].isFlipped;
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
  async fetchAlbums({ state, commit, dispatch }, reqCount) {
    if (!state.isFetched || state.isEnd) {
      return;
    }

    try {
      commit('setFetched', false);
      await dispatch('requestAlbums', reqCount);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setFetched', true);
    }
  },
  async requestAlbums({ state, commit }, reqCount) {
    const { data } = await axios.get(`/albums/${state.all.length}/${reqCount}`);

    if (!Array.isArray(data)) {
      commit('setError', true);
      throw `Server error: ${data.errmsg}`;
    }

    if (data.length === 0) {
      commit('setEnd', true);
    } else {
      commit(
        'appendAlbums',
        data.map(({ ...rest }) => {
          rest.isFlipped = false;
          return rest;
        }),
      );
    }
  },
};

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} = createNamespacedHelpers('albums');

export { mapState, mapGetters, mapMutations, mapActions };
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
