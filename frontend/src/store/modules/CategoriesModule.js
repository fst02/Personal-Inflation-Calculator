import http from '../helpers/HttpHelper';
import CategoryDto from '../../dtos/CategoryDto';

export default {
  namespaced: true,
  state: {
    categories: [],
    error: null,
  },
  mutations: {
    setCategories(state, payload) {
      console.log(payload);
      state.categories = payload.map((categoryData) => new CategoryDto(categoryData));
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async getAll(context) {
      try {
        const result = await http(context).get('/categories');
        context.commit('setCategories', result.data);
      } catch (err) {
        context.commit('setError', err.response?.data || err);
      }
    },
    async setUserSpecific(context, userCategory) {
      try {
        await http(context).post('/userCategories/edit', userCategory);
      } catch (err) {
        context.commit('setError', err.response?.data || err);
      }
    },
  },
};
