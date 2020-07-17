import UserCategoryDto from './UserCategoryDto';

export default class CategoryDto {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.value = data.value;
      this.percentage = data.percentage;
      this.amount = data.amount;
      this.active = data.active;
      this.imagePath = data.imagePath;
      this.children = data.children?.map((category) => new CategoryDto(category));
      if (data.user_categories && data.user_categories[0]) {
        this.userCategory = new UserCategoryDto(data.user_categories[0]);
      } else {
        this.userCategory = new UserCategoryDto({
          percentage: this.percentage,
          categoryId: this.id,
          active: this.active,
        });
      }
    }
  }
}
