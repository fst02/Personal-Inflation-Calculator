<template>
  <div class="home">
    <b-input-group v-for="category in categories" :key="category.id" :prepend="category.name">
      <b-input-group-prepend is-text>
        <b-form-checkbox switch class="mr-n2" v-model="category.active" />
      </b-input-group-prepend>
      <b-form-input type="number" v-model="category.weight" />
    </b-input-group>
    <p v-if="!isNaN(rate)">Személyes inflációd: {{rate}}%</p>
    {{categories}}
  </div>
</template>

<script>
import CategoryDto from '../dtos/CategoryDto';

export default {
  name: 'Home',
  data: () => ({
    categories: [],
  }),
  created() {
    this.categories.push(new CategoryDto({
      id: '10-17',
      name: 'Élelmiszerek',
      weight: 26.4,
      value: 108.4,
      active: false,
    }));
    this.categories.push(new CategoryDto({
      id: '18-19',
      name: 'Szeszes italok, dohány áruk',
      weight: 10.27,
      value: 106.7,
      active: false,
    }));
    this.categories.push(new CategoryDto({
      id: '3',
      name: 'Ruházkodási cikkek',
      weight: 3.7,
      value: 98.9,
      active: false,
    }));
  },
  computed: {
    rate() {
      const selectedCategories = this.categories.filter(
        (category) => category.active === true,
      );
      const weights = selectedCategories.map((element) => parseFloat(element.weight))
        .reduce((a, b) => a + b, 0);
      const sum = selectedCategories.map((element) => parseFloat(element.weight) * element.value)
        .reduce((a, b) => a + b, 0);
      return Math.round((sum / weights) * 100) / 100;
    },
  },
  methods: {
  },
};
</script>
