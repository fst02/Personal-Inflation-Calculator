<template>
  <b-container>
    <h1>Infláció kalkulátor</h1>
    <RateComponent :categories="categories"/>
    <div>
      <b-form-text class="mb-2">
        Állitsd át a kategória csúszkát és valtoztasd meg a súlyokat
        a személyre szabott infláció számitáshoz
      </b-form-text>
    </div>
    <CardsComponent :categories="categories"/>
  </b-container>
</template>

<script>
import RateComponent from '../components/RateComponent.vue';
import CardsComponent from '../components/CardsComponent.vue';

export default {
  name: 'NewHome',
  components: {
    RateComponent,
    CardsComponent,
  },
  data: () => ({
    categories: [],
  }),
  async created() {
    await this.$store.dispatch('categories/getCategories');
    this.categories = this.$store.state.categories.categories;
  },
};
</script>

<style>
  .card-img {
  overflow: hidden;
  object-fit: cover !important;
  height: 100% !important;
}
</style>
