export default class UserCategoryDto {
  constructor(data) {
    if (data) {
      this.userId = data.userId;
      this.categoryId = data.categoryId;
      this.percentage = data.percentage;
      this.amount = data.amount;
      this.active = data.active;
    }
  }
}
