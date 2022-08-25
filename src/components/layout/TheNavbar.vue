<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home', params: {quote: 'hey'} }">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Logo"
                 width="112"
                 height="28">
            
        </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-primary" @click="login" v-if="!isLoggedIn">
              <strong>Sign up with Google</strong>
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
import { mapActions, mapGetters } from "vuex";

export default {
  methods: mapActions("auth", ["login", "logout"]),
  computed: mapGetters("auth", ["isLoggedIn"]),
};
</script>