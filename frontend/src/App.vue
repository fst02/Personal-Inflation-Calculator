<template>
  <div id="app">
    <b-navbar>
      <b-navbar-nav class="mx-auto">
        <b-nav-item to="/">Főoldal</b-nav-item>
        <b-nav-item to="/about">Rólunk</b-nav-item>
        <b-nav-item v-if="!user" to="/registration">Regisztráció</b-nav-item>
        <b-nav-item v-if="!user" to="/signIn">Bejelentkezés</b-nav-item>
        <b-nav-item v-if="user" @click="logout()">Kijelentkezés</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState({ user: (state) => state.auth.user }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
label.btn.btn-outline-info:hover {
  background-color: #65b768 !important;
}
.btn-group-vertical > .btn {
  box-shadow: none !important;
}
</style>
