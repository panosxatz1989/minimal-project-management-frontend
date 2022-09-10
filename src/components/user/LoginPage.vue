<template>
    <form @submit.prevent="login">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input
            class="input"
            :class="{ 'is-danger': invalidUsername }"
            type="text"
            placeholder="Username"
            v-model="username"
            @focus="removeErrors('username')"
          />
        </div>
        <p v-if="invalidUsername" class="help is-danger">
          {{ invalidUsernameMessage }}
        </p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            :class="{ 'is-danger': invalidPassword }"
            type="password"
            placeholder="Password"
            v-model="password"
            @focus="removeErrors('password')"
          />
        </div>
        <p v-if="invalidPassword" class="help is-danger">
          {{ invalidPasswordMessage }}
        </p>
      </div>
      <p>Don't you have an account? Register <router-link to="/register">here</router-link></p>
      <div class="field">
        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const invalidUsername = ref(false);
    const invalidPassword = ref(false);
    const invalidUsernameMessage = ref("");
    const invalidPasswordMessage = ref("");

    const store = useStore();

    function removeErrors(target) {
      if (target === "username") {
        invalidUsername.value = "";
        invalidUsernameMessage.value = "";
      }

      if (target === "password") {
        invalidPassword.value = "";
        invalidPasswordMessage.value = "";
      }
    }

    function login() {
      if (username.value === "") {
        invalidUsernameMessage.value = "Username cannot be empty";
        invalidUsername.value = true;
      }

      if (password.value === "") {
        invalidPasswordMessage.value = "Password cannot be empty";
        invalidPassword.value = true;
      }
      store.dispatch("auth/login", {
        email: username.value,
        password: password.value
      });
    }

    return {
      username,
      password,
      invalidUsername,
      invalidPassword,
      invalidUsernameMessage,
      invalidPasswordMessage,
      login,
      removeErrors,
    };
  },
};
</script>

<style>
</style>