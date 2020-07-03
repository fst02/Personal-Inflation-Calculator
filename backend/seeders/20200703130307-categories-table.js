const categories = require('./categories.json');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('categories', categories.map((category) => Object.assign(category, { createdAt: new Date(), updatedAt: new Date() }))),

  down: (queryInterface) => queryInterface.bulkDelete('categories', null, {}),
};
