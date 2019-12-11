import { emit } from '../../common/binaryClient';
import { shuffleQueue, sortQueue } from '../../common/util';

const state = {
  queue: [],
  playingIndex: 0,
  albumTitle: '',
  albumArt: null,
  artist: '',
  trackTitle: '',
  isShuffle: false,
};

const mutations = {
  setQueue(state, queue) {
    state.queue = queue;
  },
  setPlayingIndex(state, index) {
    state.playingIndex = index;
  },
  goForwardTrack(state) {
    const forward = state.playingIndex + 1;
    state.playingIndex = forward > state.queue.length - 1 ? 0 : forward;
  },
  goBackwardTrack(state) {
    const backward = state.playingIndex - 1;
    state.playingIndex = backward < 0 ? state.queue.length - 1 : backward;
  },
  setAlbumTitle(state, albumTitle) {
    state.albumTitle = albumTitle;
  },
  setAlbumArt(state, albumArt) {
    state.albumArt = albumArt;
  },
  setArtist(state, artist) {
    state.artist = artist;
  },
  setTrackTitle(state, trackTitle) {
    state.trackTitle = trackTitle;
  },
  toggleShuffle(state) {
    state.isShuffle = !state.isShuffle;
  },
};

const actions = {
  fetchAlbumData({ state, commit, dispatch }, albumData) {
    const { queue, albumTitle, albumArt, artist } = albumData;

    if (state.albumTitle !== albumTitle || state.artist !== artist) {
      if (state.isShuffle) {
        dispatch('shuffleQueue', queue);
      } else {
        commit('setQueue', queue);
      }

      commit('setAlbumTitle', albumTitle);
      commit('setAlbumArt', albumArt);
      commit('setArtist', artist);
    }
  },
  fetchPlayingIndex({ state, commit, dispatch }, trackNumber) {
    const playingIndex = state.queue.findIndex(e => {
      return e.trackNumber === trackNumber;
    });

    commit('setPlayingIndex', playingIndex);
    dispatch('requestTrack');
  },

  requestNextTrack({ state, commit, dispatch }) {
    if (state.queue.length > 0) {
      commit('goForwardTrack');
      dispatch('requestTrack');
    }
  },
  requestPreviousTrack({ state, commit, dispatch }) {
    if (state.queue.length > 0) {
      commit('goBackwardTrack');
      dispatch('requestTrack');
    }
  },
  requestTrack({ state, commit }) {
    const { filePath, title } = state.queue[state.playingIndex];
    emit(filePath);
    commit('setTrackTitle', title);
  },

  shuffleQueue({ state, commit }, queue) {
    if (state.queue.length > 0 || queue !== undefined) {
      commit(
        'setQueue',
        shuffleQueue(queue || state.queue, state.playingIndex),
      );
      commit('setPlayingIndex', 0);
    }
  },
  sortQueue({ state, commit }) {
    if (state.queue.length > 0) {
      commit(
        'setPlayingIndex',
        state.queue[state.playingIndex].trackNumber - 1,
      );
      commit('setQueue', sortQueue(state.queue));
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
