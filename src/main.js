import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';

import App from './App.vue';
import router from '@/router/routes';
import AppPreset from '@/assets/AppPreset';

import './assets/main.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

// Prime Vue 설정
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: AppPreset,
  },
});
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
app.use(ToastService);

app.mount('#app');
