/**
 * Maintaining the store to access the data throughout the app
 */
import { createStore, StoreOptions } from 'vuex';
import { UserCredential } from 'firebase/auth';

/**
 * Using the localStorage to save usersession related data
 * Initialising those values to vuex-store and will access to all the components
 */
const store: StoreOptions<UserState> = {
  state: {
    name: localStorage.getItem('name'), // logged in user name
    email: localStorage.getItem('email'), // user email
    univName: localStorage.getItem('univName'), // user's university
    uid: localStorage.getItem('uid'), // user uid
    univId: localStorage.getItem('univId'), // user univId
    sessionToken: localStorage.getItem('sessionToken'), // user's session
    reloadToggle: false, // used to refresh components
  },
  getters: {
    reloadToggle: (state) => state.reloadToggle,
  },
  actions: {
    /**
     * Used to save the user details into the local storage.
     * Once the local storage data is saved, we update the vuex store state
     * @param {ActionContext} context
     * @param {UserCredential} payload
     * @return void
     */
    async createSession(context, payload: UserCredential) {
      const { user } = payload;
      if (user.email) {
        localStorage.setItem('email', user.email);
      }
      if (user.displayName) {
        localStorage.setItem('name', user.displayName);
      }
      if (user.uid) {
        localStorage.setItem('uid', user.uid);
      }
      const { token, claims } = await user.getIdTokenResult();
      localStorage.setItem('sessionToken', token);
      localStorage.setItem('univId', claims.univId);
      context.commit('updateStore');
    },
    /**
     * Cleating data from local store initially, then clearing vuex store data.
     * @param {AppContext} context
     * @return void
     */
    async clearSession(context) {
      localStorage.clear();
      context.commit('clearStore');
    },
    updateToggle: (context) => {
      context.state.reloadToggle = !context.state.reloadToggle;
    },
  },
  mutations: {
    /**
     * Function used to update the vuex store data
     * @param {UserState} state
     */
    updateStore: (state: UserState) => {
      state.name = localStorage.getItem('name');
      state.email = localStorage.getItem('email');
      state.univName = localStorage.getItem('univName');
      state.uid = localStorage.getItem('uid');
      state.univId = localStorage.getItem('univId');
      state.sessionToken = localStorage.getItem('sessionToken');
    },
    /**
     * Uses for clearing the vuex store data
     * @param {UserState} state
     */
    clearStore: (state) => {
      state.name = null;
      state.email = null;
      state.univName = null;
      state.uid = null;
      state.univId = null;
      state.sessionToken = null;
    },
  },

};

export default createStore(store);
