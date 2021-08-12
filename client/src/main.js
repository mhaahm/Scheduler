import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from './App.vue'
import route from "./router";
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

createApp(App).use(route).use(BootstrapIconsPlugin).mount('#app')
