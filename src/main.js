import Vue from 'vue';
import InfiniteScroll from 'vue-infinite-scroll';
import GlobalEvents from 'vue-global-events';

import vuetify from './plugins/vuetify';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(InfiniteScroll);
Vue.component('global-events', GlobalEvents);

new Vue({
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
