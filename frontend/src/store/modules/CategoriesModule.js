import http from '../helpers/HttpHelper';
import CategoryDto from '../../dtos/CategoryDto';

export default {
  namespaced: true,
  state: {
    categories: [],
    error: null,
    userCategories: null,
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload.map((category) => new CategoryDto(category));
      state.error = null;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUserCategories(state, payload) {
      state.userCategories = payload;
      state.error = null;
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
    async getUserCategories(context, userId) {
      try {
        const result = await http(context).get(`/userCategories?userId=${userId}`);
        context.commit('setUserCategories', result.data);
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
