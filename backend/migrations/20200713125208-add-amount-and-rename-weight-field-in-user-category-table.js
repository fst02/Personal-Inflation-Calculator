module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('user_categories', 'weight', 'percentage');
    await queryInterface.addColumn('user_categories', 'amount', {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('user_categories', 'amount');
    await queryInterface.renameColumn('user_categories', 'percentage', 'weight');
  },
};
