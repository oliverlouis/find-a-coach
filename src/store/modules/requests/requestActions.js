export default {
  CONTACT_COACH(context, payload) {
    const newRequest = {
      id: payload.id, //Add an ID to the request itself in order to track it
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };
    context.commit('addRequest', newRequest);
  }
};
