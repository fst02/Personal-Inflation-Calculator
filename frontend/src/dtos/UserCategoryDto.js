export default class UserCategoryDto {
  constructor(data) {
    if (data) {
      this.userId = data.userId;
      this.categoryId = data.categoryId;
      this.percentage = data.percentage ?? 0;
      this.amount = data.amount ?? 0;
      this.active = data.active;
    }
  }
}
