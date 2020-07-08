import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueI18n);

Vue.config.productionTip = false;

const messages = {
  hu: {
    validationErrors: {
      nickname: 'A felhasználónév már foglalt',
      email: 'Az email cím már foglalt',
      general: 'Sikertelen regisztráció',
    },
    verification: {
      errors: {
        tokenExpired: 'Érvénytelen vagy lejárt token',
        alreadyVerified: 'Felhasználói fiók már aktív',
      },
    },
    signIn: {
      info: {
        welcome: 'Üdvözöllek @{name}, sikeresen aktiváltad fiókodat',
        successfulRegistration: 'Sikeres regisztráció. Kérlek ellenőrizd az email fiókodat',
      },
    },
    validation: {
      emailRequired: 'Email cím megadása kötelező',
      emailValidation: 'Érvényes/létező email cím megadása kötelező',
      passwordRequired: 'Jelszó megadása kötelező',
    },
  },
};

const i18n = new VueI18n({
  locale: 'hu',
  messages,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
