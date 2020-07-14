import http from '../helpers/HttpHelper';
import CategoryDto from '../../dtos/CategoryDto';
import UserCategoryDto from '../../dtos/UserCategoryDto';

export default {
  namespaced: true,
  state: {
    categories: [],
    error: null,
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload.map((categoryData) => {
        const category = new CategoryDto(categoryData);
        if (categoryData.user_categories[0]) {
          category.userCategory = new UserCategoryDto(categoryData.user_categories[0]);
        } else {
          category.userCategory = new UserCategoryDto({
            percentage: category.percentage,
            categoryId: category.id,
            active: category.active,
          });
        }
        return category;
      });
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
