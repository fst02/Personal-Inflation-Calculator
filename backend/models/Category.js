const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Category = sequelize.define('categories', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  value: {
    type: Sequelize.FLOAT,
  },
  percentage: {
    type: Sequelize.FLOAT,
  },
  imagePath: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
  parentId: {
    type: Sequelize.STRING,
  },
});

Category.belongsTo(Category, { as: 'parent' });
Category.hasMany(Category, { as: 'parent' });

module.exports = Category;
