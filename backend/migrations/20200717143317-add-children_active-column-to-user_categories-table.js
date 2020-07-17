module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_categories', 'childrenActive', {
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('user_categories', 'childrenActive');
  },
};
