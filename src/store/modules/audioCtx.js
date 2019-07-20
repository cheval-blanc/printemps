const state = {
  audioCtx: new Audio(),
  paused: true,
  muted: false,
};

const mutations = {
  setAudioSrc(state, arrayBuffer) {
    const src = (window.URL || window.webkitURL).createObjectURL(new Blob(arrayBuffer));
    state.audioCtx.src = src;
  },
  setCurrentTime(state, currentTime) {
    state.audioCtx.currentTime = currentTime;
  },
  setPaused(state, paused) {
    state.paused = paused;
  },
  toggleMuted(state) {
    state.muted = !state.muted;
    state.audioCtx.muted = state.muted;
  },
  pauseAudio(state) {
    if(state.audioCtx.src.length > 0) {
      state.audioCtx.pause();
      state.paused = true;
    }
  },
};

const actions = {
  playAudio({ commit }) {
    const playPromise = state.audioCtx.play();

    if(playPromise !== undefined) {
      playPromise.then(() => {
        commit('setPaused', false);
      }).catch(err => {
        console.error(err);
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
