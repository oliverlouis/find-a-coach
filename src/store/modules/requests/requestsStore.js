import requestActions from './requestActions';
import requestMutations from './requestMutations';
import requestGetters from './requestGetters';

export default {
  namespaced: true,

  state() {
    return {
      requests: []
    };
  },

  actions: requestActions,
  mutations: requestMutations,
  getters: requestGetters
};
