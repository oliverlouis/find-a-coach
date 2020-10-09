import authMutations from './authMutations';
import authActions from './authActions';
import authGetters from './authGetters';

export default {
  state() {
    return {
      token: null,
      userId: null,
      didAutoLogout: false
    };
  },

  actions: authActions,
  mutations: authMutations,
  getters: authGetters
};
