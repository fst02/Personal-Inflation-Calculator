<template>
  <div
    v-if="!isNaN(rate)"
    class="mx-auto inflationBox align-items-center mb-4 sticky-top"
    :class="{ 'hundred-percent': isHundredPercent }"
  >
    <h4 class="align-self-center">
      Személyes {{(rate &lt; 100) ? "deflációd" : "inflációd"}}: {{rate}}%
    </h4>
    <h5 class="align-self-center" v-if="weightType === 'percentage'">
      Százaléksúlyok összege: {{percentageSum}}%
    </h5>
    <h5 v-else>

    </h5>
  </div>
</template>

<script>
import RateService from '../services/RateService';

export default {
  name: 'RateComponent',
  props: {
    categories: Array,
    weightType: String,
  },
  computed: {
    percentageSum() {
      const selectedCategories = this.categories.filter(
        (category) => category.userCategory.active,
      );
      const percentageSum = selectedCategories
        .map((category) => parseFloat(category.userCategory.percentage))
        .reduce((a, b) => a + b, 0);
      return Math.round(percentageSum);
    },
    isHundredPercent() {
      return this.percentageSum === 100;
    },
    rate() {
      const selectedCategories = [];
      this.categories
        .filter((category) => category.userCategory.active)
        .forEach((category) => {
          if (!category.userCategory.childrenActive) {
            selectedCategories.push(category);
            return;
          }
          category.children
            .filter((childCategory) => childCategory.userCategory.active)
            .forEach((childCategory) => selectedCategories.push(childCategory));
        });
      return RateService.getWeightedAverage(selectedCategories, this.weightType);
    },
  },
};
</script>

<style scoped>
.inflationBox {
  padding: 6px;
  width: 50%;
  background-color: rgb(248, 226, 226);
  -webkit-box-shadow: 19px 13px 22px -9px rgba(98,146,163,1);
  -moz-box-shadow: 19px 13px 22px -9px rgba(98,146,163,1);
  box-shadow: 19px 13px 22px -9px rgba(98,146,163,1);
}
@media only screen and (max-width: 720px) {
  .inflationBox {
    width: auto;
  }
}
.hundred-percent {
  background-color: #e4f8eb;
}
</style>
