import { createStore, StoreOptions } from 'vuex';
import { UserCredential } from 'firebase/auth';

const store: StoreOptions<UserState> = {
  state: {
    name: undefined,
    email: undefined,
    univName: undefined,
    uid: undefined,
    univId: undefined,
    sessionToken: undefined,
  },
  actions: {
    async populateUser(context, payload: UserCredential) {
      const { state } = context;
      const { user } = payload;
      state.email = user.email as string;
      state.name = user.displayName as string;
      state.uid = user.uid;
      const { token, claims } = await user.getIdTokenResult();
      state.univId = claims.univId;
      state.sessionToken = token;
    },
  },
};

export default createStore(store);
