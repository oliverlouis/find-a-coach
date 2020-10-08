export default {
  async ADD_COACH(context, payload) {
    const userID = context.rootGetters.userID;
    const newCoach = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://find-a-coach-67042.firebaseio.com/coaches/${userID}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      //Error
    }

    context.commit('addCoach', {
      ...newCoach,
      id: userID
    });
  },

  async LOAD_COACHES(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://find-a-coach-67042.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch.');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
