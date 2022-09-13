<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">Internal Management Tool</a>
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
                        <router-link class="nav-link active" to="projects"
                            >Projects</router-link
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <a class="dropdown-item" href="#">Action</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#"
                                    >Another action</a
                                >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <a class="dropdown-item" href="#"
                                    >Something else here</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
                <button
                    class="btn btn-primary"
                    @click="login"
                    v-if="!isLoggedIn"
                >
                    Login
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

        return {
            logout,
            login,
            isLoggedIn,
            profile,
        };
    },
};
</script>
