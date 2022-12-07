import { createRouter, createWebHistory } from 'vue-router'
import Applications from '../views/Applications.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Applications
    },
    {
      path: '/companies',
      component: () => import('../views/Companies.vue')
    },
    {
      path: '/interviewExperiences',
      component: () => import('../views/InterviewExperiences.vue')
    },
  ],
})

export default router