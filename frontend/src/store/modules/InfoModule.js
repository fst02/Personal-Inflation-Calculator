export default {
  namespaced: true,
  state: {
    viewed: false,
  },
  mutations: {
    setViewed(state) {
      state.viewed = true;
    },
  },
};
