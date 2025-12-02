import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseLayout from '../layouts/BaseLayout.vue'
import Home from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
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
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
