<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a href="/" class="navbar-item">Internal Management Tool</a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-primary" @click="login" v-if="!isLoggedIn">
              <strong>Login</strong>
            </button>
            <button class="button is-light" @click="logout" v-if="isLoggedIn">
              <strong>Logout</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    login() {
      this.$router.replace("login");
    },
  },
  computed: mapGetters("auth", ["isLoggedIn"]),
};
</script>