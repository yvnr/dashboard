<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <CHeader position="fixed">
      <CHeaderBrand><b>Campus Job Board</b></CHeaderBrand>
      <CHeaderNav v-if ="name">
        <div class="container">
          <button type="submit" :disabled="isDisabled" href="#" @click.stop.prevent="logout">{{btnTxt}}
           <i :class="{'fa-spin fa fa-refresh' : isDisabled}"></i>
          </button>
        </div>
    </CHeaderNav>
  </CHeader>
</template>

<script lang="ts">
import {
  CHeader, CHeaderBrand,
} from '@coreui/vue';
import { defineComponent, ref, watchEffect } from 'vue';
import router from '../router';
import store from '../store';
import { auth, signOut } from '../store/helpers/firebase_auth';

// eslint-disable-next-line no-shadow
enum ButtonText {
    'LogOut' = 'Log out',
    'LoggingOut' ='Logging out'
}

export default defineComponent({
  setup() {
    const visible = ref(true);
    const name = ref('');
    const btnTxt = ref(ButtonText.LogOut);
    const isDisabled = ref(false);
    name.value = store.state.name ?? '';

    async function logout() {
      isDisabled.value = true;
      btnTxt.value = ButtonText.LoggingOut;
      if (!store.state.sessionToken) {
        isDisabled.value = false;
        btnTxt.value = ButtonText.LogOut;
        router.push('/login');
        return;
      }
      try {
        const response = await signOut(auth);
        await store.dispatch('clearSession', response);
        isDisabled.value = false;
        btnTxt.value = ButtonText.LogOut;
        router.push('/login');
        return;
      } catch (err: any) {
        btnTxt.value = ButtonText.LogOut;
        isDisabled.value = false;
      }
    }

    watchEffect(() => {
      name.value = store.state.name ?? '';
    });
    return {
      name, visible, isDisabled, btnTxt, logout,
    };
  },
  components: {
    CHeader, CHeaderBrand,
  },
});
</script>

<style lang="scss" scoped>
div {
background-color: var(--light-grey);
color: var(--dark);
margin-top: 0rem;
}

.container {
  display: flex;;
}
</style>
