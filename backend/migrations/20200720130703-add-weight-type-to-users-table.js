module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'weightType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'percentage',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'weightType');
  },
};
