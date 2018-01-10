'use strict';

var vueApp = new Vue({
  el: '#app',
  data: {
    audioCtx: new Audio(),
  },
  mixins: [volumeCtrl, playCtrl, albumCtrl],
});
