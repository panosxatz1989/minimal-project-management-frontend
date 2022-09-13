<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-6 mx-auto">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Login Form</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'border-danger': invalidUsername }"
                  v-model="username"
                  @focus="removeErrors('username')"
                />
                <p v-if="invalidUsername" class="text-danger">
                  {{ invalidUsernameMessage }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  class="form-control"
                  :class="{ 'border-danger': invalidPassword }"
                  type="password"
                  v-model="password"
                  @focus="removeErrors('password')"
                />
                <p v-if="invalidPassword" class="text-danger">
                  {{ invalidPasswordMessage }}
                </p>
              </div>
              <p v-if="loginError" class="text-danger">
                {{ loginError }}
              </p>
              <p>
                Don't you have an account? Register
                <router-link to="/register">here</router-link>
              </p>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const invalidUsername = ref(false);
    const invalidPassword = ref(false);
    const invalidUsernameMessage = ref("");
    const invalidPasswordMessage = ref("");
    const loginError = ref("");

    const store = useStore();
    const router = useRouter();

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

    async function login() {
      if (username.value === "") {
        invalidUsernameMessage.value = "Username cannot be empty";
        invalidUsername.value = true;
      }

      if (password.value === "") {
        invalidPasswordMessage.value = "Password cannot be empty";
        invalidPassword.value = true;
      }

      if (invalidUsername.value || invalidPassword.value) {
        return;
      }

      try {
        await store
          .dispatch("auth/login", {
            email: username.value,
            password: password.value,
          });
          router.push("/projects");
      } catch (err) {
        loginError.value = err.message;
      }
    }

    return {
      username,
      password,
      invalidUsername,
      invalidPassword,
      invalidUsernameMessage,
      invalidPasswordMessage,
      loginError,
      login,
      removeErrors,
    };
  },
};
</script>

<style></style>
