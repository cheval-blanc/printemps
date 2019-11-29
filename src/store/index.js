import Vue from 'vue';
import Vuex from 'vuex';

import audioCtx from './modules/audioCtx';
import playingAlbum from './modules/playingAlbum';
import albums from './modules/albums';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    audioCtx,
    playingAlbum,
    albums,
  },
  strict: debug,
});
