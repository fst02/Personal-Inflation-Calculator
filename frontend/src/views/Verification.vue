<template>
  <div>
    <b-spinner class="m-5" label="Busy" v-if="!error"></b-spinner>
    <b-alert class="mt-3 text-center" show variant="danger" v-if="error">
      {{ $t(error.message) }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'Verification',
  data: () => ({
    error: null,
  }),
  created() {
    this.verify();
  },
  methods: {
    async verify() {
      const { token } = this.$route.query;
      await this.$store.dispatch('auth/verify', token);
      if (this.$store.state.auth.error) {
        this.error = this.$store.state.auth.error;
      } else {
        this.$router.push('/signin');
      }
    },
  },
};
</script>
