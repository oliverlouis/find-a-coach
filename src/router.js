import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail';
import CoachList from './pages/coaches/CoachList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import RequestReceived from './pages/requests/RequestReceived';
import ContactCoach from './pages/requests/ContactCoach';
import NotFound from './pages/NotFound';
import UserAuth from './pages/auth/UserAuth';
import store from './store/mainStore'; //Store imported in order to access isAuthenticated value

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

//Add navigation guards......first route meta data is applied to the guarded routes...See above ('meta')
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
    //'/auth' redirects navigation to auth  page prior to desired route if above parameters are true
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next(); // allow navigation to desired page
  }
});

export default router;
