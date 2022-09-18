import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import store from "@/store/index";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/components/user/LoginPage.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/components/user/RegisterPage.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        meta: {
            requiresAuth: true
        },
        component: () => import("@/components/user/ProfilePage.vue"),
    },
    {
        path: "/projects",
        name: "projects",
        meta: {
            requiresAuth: true
        },
        component: () => import("@/components/projects/ProjectList.vue"),
    },
    {
        path: "/projects/:projectId",
        name: "projectDetails",
        meta: {
            requiresAuth: true
        },
        component: () => import("@/components/projects/ProjectDetails.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(function (to, from, next) {
    const isLogged = store.getters['auth/isLoggedIn'];
    console.log(isLogged, to.name);
    if (to.name !== 'login' && to.meta.requiresAuth && !isLogged) {
        next('/login')
    } else if (to.name === "home" && !isLogged) {
        next('/login')
    } else {
        next();
    }
});

export default router;
