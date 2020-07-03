<template>
  <div class="home">
     <b-form-group label="">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        stacked
        buttons
      ></b-form-checkbox-group>
    </b-form-group>
    <div>{{rate}}</div>
  </div>
</template>

<script>
import CategoryDto from '../dtos/CategoryDto';

export default {
  name: 'Home',
  data: () => ({
    categories: [],
    selected: [],
    options: [],
  }),
  created() {
    this.categories.push(new CategoryDto({
      id: '10-17',
      name: 'Élelmiszerek',
      weight: 26.4,
      value: 108.4,
    }));
    this.categories.push(new CategoryDto({
      id: '18-19',
      name: 'Szeszes italok, dohány áruk',
      weight: 10.27,
      value: 106.7,
    }));
    this.categories.push(new CategoryDto({
      id: '3',
      name: 'Ruházkodási cikkek',
      weight: 3.7,
      value: 98.9,
    }));
    this.categories.forEach((category) => {
      this.options.push({ text: category.name, value: category.id });
    });
  },
  computed: {
    rate() {
      const { selected } = this;
      const selectedCategories = this.categories.filter(
        (category) => selected.includes(category.id),
      );
      const weights = selectedCategories.map((element) => element.weight)
        .reduce((a, b) => a + b, 0);
      const sum = selectedCategories.map((element) => element.weight * element.value)
        .reduce((a, b) => a + b, 0);
      return sum / weights;
    },
  },
  methods: {
  },
};
</script>
