<template>
  <b-form-text id="footer" class="mb-2" v-html="$t('footer.source')" />
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style>
  #footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
</style>
