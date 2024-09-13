
import { createRouter, createWebHistory }  from 'vue-router';
import NotFound from '@/pages/errors/404.vue'
import Dashboard from '@/pages/dashboard/MainView.vue'
import DetailProduct from '@/pages/detail/MainView.vue'
import Login from '@/pages/auth/Login.vue'
import { useUserStore } from '@/stores/store'

const routes = [
    {
        path:'/',
        redirect: { name: 'dashboard' },
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        },
        // children: [{
        //     path: '/dashboard/movies',
        //     name: 'dashboard.movies',
        //     // component: page('dashboard/MovieView.vue'),
        //     component: './components/dashboard/MovieView.vue',
        // }],
    },
    {
        path: "/",
        name: "login",
        component: Login,
        meta: {
            requiresAuth: false
        },
    },
    {
        path: '/detail/:id_detail',
        name: 'detail_products',
        component: DetailProduct,
        meta: {
            requiresAuth: true
        },
    },
    { 
        path: '/:pathMatch(.*)*', 
        name : "notfound",
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const store = useUserStore()
    if (to.meta.requiresAuth && store.getToken === "" ) next({ name: 'login' })
    else next()
})

export default router;