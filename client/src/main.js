import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from './App.vue'
import route from "./router";
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Popper from "vue3-popper";

const vm = createApp(App)
vm.use(route)
vm.use(VueAxios, axios)
vm.use(BootstrapIconsPlugin)
vm.use(VueSweetalert2)
vm.provide('$axios',axios)
vm.component("Popper", Popper);
let config = {
    SERVER_URL: 'http://localhost:3000/'
}
document.querySelector("#app").setAttribute('SERVER_URL',config.SERVER_URL)
vm.provide('config',config)
vm.mount('#app')

window.config = config