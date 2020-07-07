import Vue from 'vue';
import Vuex from 'vuex';
import CategoriesModule from './modules/CategoriesModule';
import AuthModule from './modules/AuthModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories: CategoriesModule,
    auth: AuthModule,
  },
});
