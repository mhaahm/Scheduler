import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from './App.vue'
import route from "./router";
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const vm = createApp(App)
vm.use(route)
vm.use(VueAxios, axios)
vm.use(BootstrapIconsPlugin)
vm.provide('$axios',axios)
vm.provide('config',{
    SERVER_URL: 'http://localhost:3000/'
})
vm.mount('#app')
