import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import store from './store';
import './assets/styles/reset.css';
import './assets/styles/all.scss';

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .mount('#app');
