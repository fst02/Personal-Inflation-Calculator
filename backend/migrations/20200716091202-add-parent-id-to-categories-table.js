module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'parentId', {
      type: Sequelize.STRING,
      references: {
        model: 'categories',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('categories', 'parentId');
  },
};
