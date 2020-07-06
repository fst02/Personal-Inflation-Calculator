export default class CategoryDto {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.categoryId = data.categoryId;
      this.name = data.name;
      this.value = data.value;
      this.weight = data.weight;
      this.active = data.active;
      this.imagePath = data.imagePath;
    }
  }
}
