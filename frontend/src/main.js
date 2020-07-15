import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
        tokenExpired: 'Lejárt token, az új aktiváló linket elküldtük email címedre, kérlek ellenőrizd',
        tokenInvalid: 'Érvénytelen token, ellenőrizd jó linket nyitottál-e meg',
        alreadyVerified: 'Felhasználói fiók már aktív',
      },
    },
    signIn: {
      info: {
        welcome: 'Üdvözöllek @{name}, sikeresen aktiváltad fiókodat',
        successfulRegistration: 'Sikeres regisztráció. Kérlek ellenőrizd az email fiókodat',
      },
      errors: {
        invalidCredentials: 'Érvénytelen email/jelszó vagy nem aktivált felhasználói fiók',
      },
    },
    validation: {
      emailRequired: 'Email cím megadása kötelező',
      emailValidation: 'Érvényes/létező email cím megadása kötelező',
      passwordRequired: 'Jelszó megadása kötelező',
    },
    home: {
      toastDescription: 'A kategóriánkénti súlyok összegének 100%-nak kell lennie a pontos számításhoz. Ha változtatsz az oldalon megadott súlyokon, hogy jobban tükrözzék személyes kiadásaidat, erre figyelj. Ha százalékról átváltasz forint értékre, érdemes úgy megadni az értékeket, hogy a kiadásaid összegét elosztod a kategóriák között.',
      toastTitle: 'Használati javaslat',
    },
    footer: {
      source: 'Az alkalmazás <a href="http://www.ksh.hu/docs/hun/xstadat/xstadat_evkozi/e_qsf002i.html?back=/stadat_far" target="_blank">a KSH adatait</a> használja.',
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
