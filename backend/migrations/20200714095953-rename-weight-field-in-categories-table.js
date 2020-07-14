module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('categories', 'weight', 'percentage');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('categories', 'percentage', 'weight');
  },
};
