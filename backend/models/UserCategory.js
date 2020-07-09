const Sequelize = require('sequelize');
const User = require('./User');
const Category = require('./Category');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const UserCategory = sequelize.define('user_categories', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  weight: {
    type: Sequelize.FLOAT,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
});

UserCategory.belongsTo(User);
User.hasMany(UserCategory);
UserCategory.belongsTo(Category);
Category.hasMany(UserCategory);

module.exports = UserCategory;
