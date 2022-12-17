import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/** initialising the app with router and storeq */
createApp(App).use(store).use(router).mount('#app');
