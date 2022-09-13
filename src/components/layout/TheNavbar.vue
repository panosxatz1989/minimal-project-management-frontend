<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/"
                >Internal Management Tool<sup>Beta</sup></a
            >
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="profile"
                            >Profile</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="projects"
                            >Projects</router-link
                        >
                    </li>
                </ul>
                <button
                    class="btn btn-primary mx-2"
                    @click="login"
                    v-if="!isLoggedIn"
                >
                    Login
                </button>
                <button
                    class="btn btn-success"
                    @click="register"
                    v-if="!isLoggedIn"
                >
                    Register
                </button>
                <button
                    class="btn btn-danger"
                    @click="logout"
                    v-if="isLoggedIn"
                >
                    <strong>Logout</strong>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const isLoggedIn = computed(() => {
            return store.getters["auth/isLoggedIn"];
        });

        const profile = computed(() => {
            return store.getters["auth/getProfile"];
        });

        function logout() {
            store.dispatch("auth/logout").then(router.push("/"));
        }

        function login() {
            router.push("/login");
        }

        function register() {
            router.push("/register");
        }

        return {
            logout,
            login,
            isLoggedIn,
            profile,
            register,
        };
    },
};
</script>
