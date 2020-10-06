export default {
  coaches(state) {
    return state.coaches;
  },

  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },

  isCoach(_, getters, _2, rootGetters) {
    //underscores negate non needed arguments
    const coaches = getters.coaches;
    const userID = rootGetters.userID;
    return coaches.some(coach => coach.id === userID); //returns true if some coach matches callback parameters
  },

  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  }
};
