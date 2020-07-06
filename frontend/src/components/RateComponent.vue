<template>
  <div class="mx-auto inflationBox align-items-center mb-4 sticky-top" v-if="!isNaN(rate)">
    <h4 class="align-self-center">
      Személyes {{(rate &lt; 100) ? "deflációd" : "inflációd"}}: {{rate}}%
    </h4>
  </div>
</template>

<script>
export default {
  name: 'RateComponent',
  props: {
    categories: Array,
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
};
</script>

<style scoped>
  .inflationBox {
    width: 50%;
    height: 10vh;
    display: flex;
    justify-content: center;
    background-color: #f3faf7;
    -webkit-box-shadow: 19px 13px 22px -9px rgba(98,146,163,1);
    -moz-box-shadow: 19px 13px 22px -9px rgba(98,146,163,1);
    box-shadow: 19px 13px 22px -9px rgba(98,146,163,1);
  }
  @media only screen and (max-width: 720px) {
  .inflationBox {
    height: 15vh;
  }
  }
</style>
