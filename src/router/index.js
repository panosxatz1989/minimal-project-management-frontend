import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";

const routes = [
    {
        path: "/",
        redirect: "/login",
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
        component: () => import("@/components/user/ProfilePage.vue"),
    },
    {
        path: "/projects",
        name: "projects",
        component: () => import("@/components/projects/ProjectList.vue"),
    },
    {
        path: "/projects/:projectId",
        name: "projectDetails",
        component: () => import("@/components/projects/ProjectDetails.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
