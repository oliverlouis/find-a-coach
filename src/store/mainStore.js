import { createStore } from 'vuex';
import coachesModule from './modules/coaches/coachStore';
import requestsModule from './modules/requests/requestsStore';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  },

  state() {
    return {
      userID: 'c6'
    };
  },

  getters: {
    userID(state) {
      return state.userID;
    }
  }
});

export default store;
