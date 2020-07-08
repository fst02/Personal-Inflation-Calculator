import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter() { window.location.href = 'http://fullstack.braininghub.com/introduction/'; },
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue'),
  },
  {
    path: '/registration/verify',
    name: 'Verification',
    component: () => import('../views/Verification.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
