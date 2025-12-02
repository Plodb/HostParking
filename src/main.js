import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
createApp(App).use(router).mount('#app');
