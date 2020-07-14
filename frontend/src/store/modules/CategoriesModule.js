import http from '../helpers/HttpHelper';
import CategoryDto from '../../dtos/CategoryDto';
import UserCategoryDto from '../../dtos/UserCategoryDto';

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
      state.userCategories = payload.map((category) => new UserCategoryDto(category));
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
    async getUserCategories(context) {
      try {
        const result = await http(context).get('/userCategories');
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
