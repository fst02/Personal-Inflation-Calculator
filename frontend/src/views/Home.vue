<template>
  <div class="home">
    <b-input-group v-for="category in categories" :key="category.id" :prepend="category.name">
      <b-input-group-prepend is-text>
        <b-form-checkbox switch class="mr-n2" v-model="category.active" />
      </b-input-group-prepend>
      <b-form-input type="number" v-model="category.weight" />
    </b-input-group>
    <p v-if="!isNaN(rate)">Személyes inflációd: {{rate}}%</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    categories: [],
  }),
  async created() {
    await this.$store.dispatch('categories/getCategories');
    this.categories = this.$store.state.categories.categories;
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
