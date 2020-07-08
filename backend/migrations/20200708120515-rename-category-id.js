module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'id');
    await queryInterface.renameColumn('categories', 'categoryId', 'id');
    await queryInterface.changeColumn('categories', 'id', {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('categories', 'PRIMARY');
    await queryInterface.changeColumn('categories', 'id', {
      type: Sequelize.STRING,
      primaryKey: false,
      allowNull: true,
    });
    await queryInterface.renameColumn('categories', 'id', 'categoryId');
    await queryInterface.addColumn('categories', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  },
};
