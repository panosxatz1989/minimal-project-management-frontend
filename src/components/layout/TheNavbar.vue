<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <img src="@/assets/main-logo.svg" alt="Logo" width="30" height="30" />
        {{ name }}
        <sup
          >{{ step }}
          <sup>
            <small>{{ version }}</small>
          </sup>
        </sup>
      </router-link>
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
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/projects">Projects</router-link>
          </li>
        </ul>
        <button
          class="btn btn-primary mx-3 fw-bold btn-min-width"
          @click="login"
          v-if="!isLoggedIn"
        >
          Login
        </button>
        <button
          class="btn btn-success fw-bold btn-min-width"
          @click="register"
          v-if="!isLoggedIn"
        >
          Register
        </button>
        <button
          class="btn btn-danger fw-bold btn-min-width"
          @click="logout"
          v-if="isLoggedIn"
        >
          Logout
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
    const isLoggedIn = computed(() => store.getters["auth/isLoggedIn"]);
    const logout = () => store.dispatch("auth/logout").then(router.push("/"));
    const login = () => router.push("/login");
    const register = () => router.push("/register");

    onMounted(async () => {
      const docRef = doc(db, "config", "MTzuHLRdks5OHnLXk0nM");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const snapData = docSnap.data();
        step.value = snapData.step;
        version.value = snapData.version;
        name.value = snapData.name;
      }
    });

    return {
      logout,
      login,
      isLoggedIn,
      register,
      step,
      version,
      name,
    };
  },
};
</script>