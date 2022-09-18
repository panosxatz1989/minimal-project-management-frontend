import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import store from "@/store/index";
import { auth } from "@/firebase";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: "/login",
        name: "login",
        meta: {
            requiresAnauth: true
        },
        component: () => import("@/components/user/LoginPage.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {
            requiresAnauth: true
        },
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
    const currentUser = auth.currentUser;

    if (to.name !== "login" && to.meta.requiresAuth && !currentUser && !isLogged) {
        next('/login');
    } else if ((to.name === "login" || to.name === "register") && currentUser && isLogged) {
        next('/projects');
    } else {
        next();
    }
});

export default router;
