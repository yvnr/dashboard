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
  ],
});

export default router;
