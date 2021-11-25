import {createWebHistory, createRouter} from "vue-router";
import Collector from "../components/Collector";
import CollectorForm from "../components/CollectorForm";
import Collection from "../components/Collection";
import CollectionList from "../components/CollectionList";
import crontablist from "../components/crontablist";

const routes = [
    {
        path: '/Collector',
        name: 'collector',
        component: Collector
    },
    {
        path: '/newCollector',
        name: 'newCollector',
        component: CollectorForm
    },
    {
        path: '/editCollector/:id',
        name: 'editCollector',
        component: CollectorForm
    },{
        path: '/editCollection/:id',
        name: 'editCollection',
        component: Collection,
        props:true
    },
    {
        path: '/collection/new',
        name: 'newCollection',
        component: Collection
    },
    {
        path: '/collection/list',
        name: 'collectionList',
        component: CollectionList
    },
    {
        path: '/crontab/list',
        name: 'crontab_list',
        component: crontablist
    }
]

const route = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default route