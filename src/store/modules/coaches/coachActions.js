export default {
  ADD_COACH(context, payload) {
    const newCoach = {
      id: context.rootGetters.userID,
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };
    context.commit('addCoach', newCoach);
  }
};
