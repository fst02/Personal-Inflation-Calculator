export default class UserCategoryDto {
  constructor(data) {
    if (data) {
      this.userId = data.userId;
      this.categoryId = data.categoryId;
      this.weight = data.weight;
      this.active = data.active;
    }
  }
}
