<template>
  <div>
    <b-icon id="info" icon="info-circle" @click="showDescriptionToast"/>
    <b-toast id="info-toast" variant="info" @hidden="hideDescriptionToast" no-auto-hide >
      <template v-slot:toast-title>
        {{ $t('home.toastTitle') }}
      </template>
      {{ $t('home.toastDescription') }}
    </b-toast>
    <h1>Infláció kalkulátor</h1>
    <RateComponent :categories="categories" :weightType="user ? user.weightType : weightType" />
    <div>
      <b-form-text class="mb-2">
        Állitsd át a kategória csúszkát és valtoztasd meg a súlyokat
        a személyre szabott infláció számitáshoz
      </b-form-text>
    </div>
    <div class="pretty p-switch">
      <input
        v-if="user"
        @change="saveWeightType"
        type="radio"
        name="weightType"
        v-model="user.weightType"
        value="percentage"
      />
      <input v-else type="radio" name="weightType" v-model="weightType" value="percentage" />
      <div class="state p-info">
        <label>Százalék</label>
      </div>
    </div>
    <div class="pretty p-switch">
      <input
        v-if="user"
        @change="saveWeightType"
        type="radio"
        name="weightType"
        v-model="user.weightType"
        value="amount"
      />
      <input v-else type="radio" name="weightType" v-model="weightType" value="amount" />
      <div class="state p-info">
        <label>Érték</label>
      </div>
    </div>
    <CategoryComponent
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :weightType="user ? user.weightType : weightType"
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
    await this.$store.dispatch('categories/getAll');
  },
  mounted() {
    if (!this.isInfoViewed) {
      this.showDescriptionToast();
    }
  },
  computed: mapState({
    categories: (state) => state.categories.categories,
    isInfoViewed: (state) => state.info.viewed,
    user: (state) => state.auth.user,
  }),
  methods: {
    showDescriptionToast() {
      this.$bvToast.show('info-toast');
    },
    hideDescriptionToast() {
      console.log('ok');
      this.$store.commit('info/setViewed');
    },
    saveWeightType() {
      this.$store.dispatch('auth/saveWeightType', this.user.weightType);
    },
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
