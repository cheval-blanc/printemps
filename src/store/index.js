import Vue from 'vue';
import Vuex from 'vuex';

import albums from './modules/albums';
import audioCtx from './modules/audioCtx';
import trackManager from './modules/trackManager';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    albums,
    audioCtx,
    trackManager,
  },
  strict: debug,
});
