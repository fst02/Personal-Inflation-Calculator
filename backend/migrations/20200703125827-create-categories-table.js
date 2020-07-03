module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'categories',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      categoryId: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_hungarian_ci',
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('categories'),
};
