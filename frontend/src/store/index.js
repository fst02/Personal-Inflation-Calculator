import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import AuthModule from './modules/AuthModule';
import CategoriesModule from './modules/CategoriesModule';
import InfoModule from './modules/InfoModule';

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth', 'info'],
});

export default new Vuex.Store({
  modules: {
    categories: CategoriesModule,
    auth: AuthModule,
    info: InfoModule,
  },
  plugins: [
    persistence.plugin,
  ],
});
