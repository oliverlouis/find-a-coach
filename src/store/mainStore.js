import { createStore } from 'vuex';
import coachesModule from './modules/coaches/coachStore';

const store = createStore({
  modules: {
    coaches: coachesModule
  }
});

export default store;
