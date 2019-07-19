const state = {
  audioCtx: new Audio(),
  paused: true,
};

const mutations = {
  setPaused(state, paused) {
    state.paused = paused;
  },
  setAudioSrc(state, arrayBuffer) {
    const src = (window.URL || window.webkitURL).createObjectURL(new Blob(arrayBuffer));
    state.audioCtx.src = src;
  },
  pauseAudio(state) {
    if(state.audioCtx.src !== null) {
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
