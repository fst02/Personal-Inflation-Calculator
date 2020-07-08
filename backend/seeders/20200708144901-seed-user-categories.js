const userCategories = require('./userCategories.json');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('user_categories', userCategories.map((userCategory) => Object.assign(userCategory, { createdAt: new Date(), updatedAt: new Date() }))),

  down: (queryInterface) => queryInterface.bulkDelete('user_categories', null, {}),
};
