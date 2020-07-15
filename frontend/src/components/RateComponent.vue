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
  </div>
</template>

<script>
export default {
  name: 'RateComponent',
  props: {
    categories: Array,
    weightType: String,
  },
  computed: {
    percentageSum() {
      const selectedCategories = this.categories.filter(
        (category) => category.active === true,
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
      const selectedCategories = this.categories.filter(
        (category) => category.active === true,
      );
      const weights = selectedCategories
        .map((category) => parseFloat(category.userCategory[this.weightType]))
        .reduce((a, b) => a + b, 0);
      const sum = selectedCategories
        .map((category) => parseFloat(category.userCategory[this.weightType]) * category.value)
        .reduce((a, b) => a + b, 0);
      return Math.round((sum / weights) * 100) / 100;
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
