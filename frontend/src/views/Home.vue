<template>
  <div>
    <h1>Infláció kalkulátor</h1>
    <RateComponent :categories="categories" />
    <div>
      <b-form-text class="mb-2">
        Állitsd át a kategória csúszkát és valtoztasd meg a súlyokat
        a személyre szabott infláció számitáshoz
      </b-form-text>
    </div>
    <div class="pretty p-switch">
        <input type="radio" name="weightType" v-model="weightType" value="percentage" />
        <div class="state p-info">
            <label>Százalék</label>
        </div>
    </div>
    <div class="pretty p-switch">
        <input type="radio" name="weightType" v-model="weightType" value="amount" />
        <div class="state p-info">
            <label>Érték</label>
        </div>
    </div>
    <CategoryComponent
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :weightType="weightType"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RateComponent from '../components/RateComponent.vue';
import CategoryComponent from '../components/CategoryComponent.vue';

export default {
  name: 'Home',
  components: {
    RateComponent,
    CategoryComponent,
  },
  data: () => ({
    weightType: 'percentage',
  }),
  async created() {
    await this.$store.dispatch('categories/getUserCategories');
  },
  computed: mapState({
    categories: (state) => state.categories.categories,
  }),
};
</script>

<style>
  .card-img {
  overflow: hidden;
  object-fit: cover !important;
  height: 100% !important;
}
</style>
