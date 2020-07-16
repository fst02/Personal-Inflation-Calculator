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
    }
  }
}
