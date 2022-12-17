/** This file handles the routing for entire application
* When a user tries to access a particluar page if authorized lands on the page
* else redirected to login page
*/

import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
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

/**
 * Every route handle goes through this function.
 * if user is not logged in, all routes are redirected to login route except when for the register route
 * if user is logged in, and if login route is requested, they are redirected to home page('/')
 */
router.beforeEach((to, from, next) => {
  if (store?.state?.sessionToken) { // user logged in
    if (to.path === '/register' || to.path === '/login') {
      return next({ path: '/' });
    }
    return next();
  }
  if (to.path === '/register' || to.path === '/login') {
    return next();
  }
  return next({ path: '/login' });
});

export default router;
