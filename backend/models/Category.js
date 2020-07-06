const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Category = sequelize.define('categories', {
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
  imagePath: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Category;
