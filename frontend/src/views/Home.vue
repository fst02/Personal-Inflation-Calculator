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
    <CategoryComponent v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>

<script>
import RateComponent from '../components/RateComponent.vue';
import CategoryComponent from '../components/CategoryComponent.vue';

export default {
  name: 'Home',
  components: {
    RateComponent,
    CategoryComponent,
  },
  data: () => ({
    categories: [],
  }),
  async created() {
    await this.$store.dispatch('categories/getCategories');
    this.categories = this.$store.state.categories.categories;
    if (this.$store.state.auth.user) {
      await this.$store.dispatch('auth/verifyToken');
      if (this.$store.state.auth.token) {
        await this.$store.dispatch('categories/getUserCategories', this.$store.state.auth.user.id);
        const { userCategories } = this.$store.state.categories;
        userCategories.forEach((userCategory) => {
          this.categories
            .filter((category) => category.id === userCategory.categoryId)
            .forEach((item) => {
              // eslint-disable-next-line no-param-reassign
              item.weight = userCategory.weight;
              // eslint-disable-next-line no-param-reassign
              item.active = userCategory.active;
            });
        });
      }
    }
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
