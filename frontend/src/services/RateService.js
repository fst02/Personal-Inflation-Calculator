const RateService = {
  sumOfWeights: (categories, weightType) => categories
    .filter((category) => category.userCategory.active)
    .map((category) => parseFloat(category.userCategory[weightType] ?? 0))
    .reduce((a, b) => a + b, 0),
  sumOfRates: (categories, weightType) => categories
    .filter((category) => category.userCategory.active)
    .map((category) => parseFloat(category.userCategory[weightType] ?? 0) * category.value)
    .reduce((a, b) => a + b, 0),
  getWeightedAverage: (categories, weightType) => {
    const weights = RateService.sumOfWeights(categories, weightType);
    const sum = RateService.sumOfRates(categories, weightType);
    return Math.round((sum / weights) * 100) / 100;
  },
  getFlattenedCategories: (categories) => {
    const selectedCategories = [];
    categories
      .filter((category) => category.userCategory.active)
      .forEach((category) => {
        if (!category.userCategory.childrenActive) {
          selectedCategories.push(category);
          return;
        }
        category.children
          .filter((childCategory) => childCategory.userCategory.active)
          .forEach((childCategory) => selectedCategories.push(childCategory));
      });
    return selectedCategories;
  },
};

export default RateService;
