export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHPA35XUO9kW3iR-FGug67Whpbq3zk1YQ';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHPA35XUO9kW3iR-FGug67Whpbq3zk1YQ';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate');
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      });
    }
  },

  async SIGN_UP(context, payload) {
    return context.dispatch('auth', {
      //Return because the auth action returns a promise. Therefore components can keep track of promise status
      ...payload,
      mode: 'signup'
    });
  },

  async login(context, payload) {
    return context.dispatch('auth', {
      //Return because the auth action returns a promise. Therefore components can keep track of promise status
      ...payload,
      mode: 'login'
    });
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
