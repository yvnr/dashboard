<template>
  <div class="app">
    <LeftNavigationBar />
    <router-view />
  </div>
</template>

<script>
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftNavigationBar from './components/LeftNavigationBar.vue';

export default {
  name: 'App',
  components: {
    LeftNavigationBar,
  },
};
</script>

<style lang="scss">
:root {
  --primary: #50ad72;
  --grey: #64748b;
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
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
