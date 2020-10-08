import { createStore } from 'vuex';
import coachesModule from './modules/coaches/coachStore';
import requestsModule from './modules/requests/requestsStore';
import authModule from './modules/auth/authStore';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule
  }
});

export default store;
