import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '../layouts/BaseLayout.vue';
import Home from '../pages/Home.vue';
const routes = [
    {
        path: '/',
        component: BaseLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
