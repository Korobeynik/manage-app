const register = {
  state() {
    return {
      isAuthenticated: false,
      userData: null,
    };
  },
  mutations: {
    authenticate(state, userCredential) {
      state.isAuthenticated = true;
      state.userCredentials = userCredential;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setUser(state, data) {
      state.userData = data;
    },
  },
  actions: {
    authenticate({ commit }, userCredential) {
      // make an API call to authenticate the user
      // if the user is successfully authenticated, commit the 'authenticate' mutation
      commit("authenticate", userCredential);
    },
    logout({ commit }) {
      // make an API call to log out the user
      // if the user is successfully logged out, commit the 'logout' mutation
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.userData,
  },
};

export default register;
