import { createStore, StoreOptions } from 'vuex';
import { UserCredential } from 'firebase/auth';

const store: StoreOptions<UserState> = {
  state: {
    name: sessionStorage.getItem('name'),
    email: sessionStorage.getItem('email'),
    univName: sessionStorage.getItem('univName'),
    uid: sessionStorage.getItem('uid'),
    univId: sessionStorage.getItem('univId'),
    sessionToken: sessionStorage.getItem('sessionToken'),
  },
  actions: {
    async createSession(context, payload: UserCredential) {
      const { user } = payload;
      if (user.email) {
        sessionStorage.setItem('email', user.email);
      }
      if (user.displayName) {
        sessionStorage.setItem('name', user.displayName);
      }
      if (user.uid) {
        sessionStorage.setItem('uid', user.uid);
      }
      const { token, claims } = await user.getIdTokenResult();
      sessionStorage.setItem('sessionToken', token);
      sessionStorage.setItem('univId', claims.univId);
      context.commit('updateStore');
    },
    async deleteSession(context) {
      sessionStorage.clear();
      context.commit('clearStore');
    },
  },
  mutations: {
    updateStore: (state) => {
      state.name = sessionStorage.getItem('name');
      state.email = sessionStorage.getItem('email');
      state.univName = sessionStorage.getItem('univName');
      state.uid = sessionStorage.getItem('uid');
      state.univId = sessionStorage.getItem('univId');
      state.sessionToken = sessionStorage.getItem('sessionToken');
    },
    clearStore: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.univName = undefined;
      state.uid = undefined;
      state.univId = undefined;
      state.sessionToken = undefined;
    },
  },

};

export default createStore(store);
