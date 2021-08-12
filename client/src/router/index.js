import {createWebHistory, createRouter} from "vue-router";
import Collector from "../components/Collector";
import CollectorForm from "../components/CollectorForm";

const routes = [
    {
        path: '/Collector',
        name: 'collector',
        component: Collector
    },
    {
        path: '/editCollector',
        name: 'editCollector',
        component: CollectorForm
    }
]

const route = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default route