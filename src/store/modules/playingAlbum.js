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
    const trackTitle = queue[playingIndex].title;

    if(state.albumTitle !== albumTitle || state.artist !== artist) {
      commit('setQueue', queue);
      commit('setAlbumTitle', albumTitle);
      commit('setAlbumArt', albumArt);
      commit('setArtist', artist);
    }

    commit('setPlayingIndex', playingIndex);
    commit('setTrackTitle', trackTitle);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
