import http from '../helpers/HttpHelper';

export default {
  namespaced: true,
  state: {
    categories: null,
    error: null,
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async getCategories(context) {
      try {
        const result = await http(context).get('/categories');
        context.commit('setCategories', result.data);
      } catch (err) {
        context.commit('setError', err);
        console.log(err);
      }
    },
  },
};
