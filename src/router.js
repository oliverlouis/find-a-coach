import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail';
import CoachList from './pages/coaches/CoachList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import RequestReceived from './pages/requests/RequestReceived';
import ContactCoach from './pages/requests/ContactCoach';
import NotFound from './pages/NotFound';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      children: [{ path: '/coaches/:id/contact', component: ContactCoach }]
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestReceived },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
