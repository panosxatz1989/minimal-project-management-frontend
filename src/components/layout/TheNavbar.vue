<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">
                {{ name }}
                <sup
                    >{{ step }}
                    <sup>
                        <small>{{ version }}</small>
                    </sup>
                </sup>
            </a>
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
                    <li class="nav-item" v-if="isLoggedIn">
                        <router-link class="nav-link" to="profile"
                            >Profile</router-link
                        >
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
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
import { computed, onMounted, ref } from "vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const step = ref("");
        const version = ref("");
        const name = ref("");

        const isLoggedIn = computed(() => {
            return store.getters["auth/isLoggedIn"];
        });

        onMounted(async () => {
            const docRef = doc(db, "config", "MTzuHLRdks5OHnLXk0nM");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                step.value = docSnap.data().step;
                version.value = docSnap.data().version;
                name.value = docSnap.data().name;
            }
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
            step,
            version,
            name,
        };
    },
};
</script>
