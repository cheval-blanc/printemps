const state = {
  audio: new Audio(),
  paused: true,
  muted: false,
};

const mutations = {
  setAudioSrc(state, arrayBuffer) {
    state.audio.src = (window.URL || window.webkitURL).createObjectURL(
      new Blob(arrayBuffer),
    );
  },
  setCurrentTime(state, currentTime) {
    state.audio.currentTime = currentTime;
  },
  setVolume(state, volume) {
    state.audio.volume = volume;
  },
  setPaused(state, paused) {
    state.paused = paused;
  },
  toggleMuted(state) {
    state.audio.muted = state.muted = !state.muted;
  },
  pauseAudio(state) {
    if (state.audio.src.length > 0) {
      state.audio.pause();
      state.paused = true;
    }
  },
};

const actions = {
  playAudio({ state, commit }) {
    const playPromise = state.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          commit('setPaused', false);
        })
        .catch(err => {
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
};
