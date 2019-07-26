import { emit } from '../../common/binaryClient';

const state = {
  queue: [],
  playingIndex: 0,
  albumTitle: '',
  albumArt: null,
  artist: '',
  trackTitle: '',
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
};

const actions = {
  fetchPlayingAlbum({ state, commit }, albumData) {
    const { queue, playingIndex, albumTitle, albumArt, artist } = albumData;

    if(state.albumTitle !== albumTitle || state.artist !== artist) {
      commit('setQueue', queue);
      commit('setAlbumTitle', albumTitle);
      commit('setAlbumArt', albumArt);
      commit('setArtist', artist);
    }

    commit('setPlayingIndex', playingIndex);
    commit('setTrackTitle', queue[playingIndex].title);
  },
  requestNextTrack({ state, commit, dispatch }) {
    if(state.queue.length === 0) { return; }

    commit('goForwardTrack');
    dispatch('requestTrack');
  },
  requestPreviousTrack({ state, commit, dispatch }) {
    if(state.queue.length === 0) { return; }

    commit('goBackwardTrack');
    dispatch('requestTrack');
  },
  requestTrack({ state, commit }) {
    const { filePath, title } = state.queue[state.playingIndex];
    emit(filePath);
    commit('setTrackTitle', title);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
