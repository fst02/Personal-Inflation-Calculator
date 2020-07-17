module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_categories', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_categories', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
