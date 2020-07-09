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
          const tmp = this.categories.filter((category) => category.id === userCategory.categoryId);
          if (tmp[0]) {
            tmp[0].weight = userCategory.weight;
            tmp[0].active = userCategory.active;
          }
        });
        // this.categories.map((category) => {
        //   const tp = userCategories.find((userCategory) =>
        // userCategory.categoryId === category.id);
        //   if (tp) {
        //     category.active = tp.active; //eslint-disable-line
        //     category.weight = tp.weight; //eslint-disable-line
        //   }
        //   return new CategoryDto(category);
        // });
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
