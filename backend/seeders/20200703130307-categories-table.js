const categories = require('./categories.json');
const ImageService = require('../services/ImageService');

module.exports = {
  up: async (queryInterface) => {
    const processedCategories = categories.map(async (category) => {
      let path;
      try {
        await ImageService.imageExists(category.categoryId);
        path = `image-${category.categoryId}.jpg`;
      } catch (err) {
        path = 'default-avatar.jpg';
      }
      return Object.assign(category, {
        createdAt: new Date(),
        updatedAt: new Date(),
        imagePath: path,
      });
    });
    queryInterface.bulkInsert('categories', await Promise.all(processedCategories));
  },
  down: (queryInterface) => queryInterface.bulkDelete('categories', null, {}),
};
