module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'user_categories',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      categoryId: {
        type: Sequelize.STRING,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_hungarian_ci',
    },
  ),

  down: (queryInterface) => queryInterface.dropTable('user_categories'),
};
