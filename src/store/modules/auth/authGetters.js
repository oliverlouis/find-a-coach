export default {
  userID(state) {
    return state.userID;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  }
};
