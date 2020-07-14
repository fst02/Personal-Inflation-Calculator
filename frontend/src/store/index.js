import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import AuthModule from './modules/AuthModule';
import CategoriesModule from './modules/CategoriesModule';

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
});

export default new Vuex.Store({
  modules: {
    categories: CategoriesModule,
    auth: AuthModule,
  },
  plugins: [
    persistence.plugin,
  ],
});
