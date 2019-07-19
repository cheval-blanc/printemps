import Vue from 'vue';
import Vuex from 'vuex';

import albums from './modules/albums';
import audioCtx from './modules/audioCtx';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    albums,
    audioCtx,
  },
  strict: debug,
});
