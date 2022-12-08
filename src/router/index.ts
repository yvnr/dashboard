import { createRouter, createWebHistory } from 'vue-router';
import Applications from '../views/ApplicationsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Applications,
    },
    {
      path: '/companies',
      component: () => import('../views/CompaniesView.vue'),
    },
    {
      path: '/interviewExperiences',
      component: () => import('../views/InterviewExperiences.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    },
  ],
});

export default router;
