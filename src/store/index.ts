import { createStore, StoreOptions } from 'vuex';
import { UserCredential } from 'firebase/auth';

const store: StoreOptions<UserState> = {
  state: {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    univName: localStorage.getItem('univName'),
    uid: localStorage.getItem('uid'),
    univId: localStorage.getItem('univId'),
    sessionToken: localStorage.getItem('sessionToken'),
  },
  actions: {
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
    async deleteSession(context) {
      localStorage.clear();
      context.commit('clearStore');
    },
  },
  mutations: {
    updateStore: (state) => {
      state.name = localStorage.getItem('name');
      state.email = localStorage.getItem('email');
      state.univName = localStorage.getItem('univName');
      state.uid = localStorage.getItem('uid');
      state.univId = localStorage.getItem('univId');
      state.sessionToken = localStorage.getItem('sessionToken');
    },
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
