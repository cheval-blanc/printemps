import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: 'fa'
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
