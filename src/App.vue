<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <div class="app">
      <LeftNavigationBar v-if="userAuthenticated"/>
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
  <FooterComponent />
  </div>
</template>

<script lang="ts">
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { defineComponent, watchEffect, ref } from 'vue';
import store from './store';
import LeftNavigationBar from './components/LeftNavigationBar.vue';
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const userAuthenticated = ref(!!store.state.sessionToken);
    watchEffect(() => {
      userAuthenticated.value = !!store.state.sessionToken;
    });
    return { userAuthenticated };
  },
  components: {
    LeftNavigationBar,
    FooterComponent,
    HeaderComponent,
  },
});
</script>

<style lang="scss">
:root {
  --primary: #50ad72;
  --grey: #64748b;
  --light-grey:  #e3e5e7;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

// for arrow in SideBar
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0%;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
