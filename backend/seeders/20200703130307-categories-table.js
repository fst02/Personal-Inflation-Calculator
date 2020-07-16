const KshService = require('../services/KshService');
const ImageService = require('../services/ImageService');

module.exports = {
  up: async (queryInterface) => {
    const categories = await KshService.importStatistics();
    const processedCategories = categories.map(async (category) => {
      let path;
      try {
        await ImageService.imageExists(category.id);
        path = `image-${category.id}.jpg`;
      } catch (err) {
        path = 'default-avatar.jpg';
      }
      return Object.assign(category, {
        createdAt: new Date(),
        updatedAt: new Date(),
        imagePath: path,
      });
    });
    await queryInterface.bulkInsert('categories', await Promise.all(processedCategories));
  },
  down: (queryInterface) => queryInterface.bulkDelete('categories', null, {}),
};
