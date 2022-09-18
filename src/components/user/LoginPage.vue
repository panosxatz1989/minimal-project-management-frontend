<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-6 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center">Login Form</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <div class="input-group">
                  <span class="input-group-text fa fa-envelope login-icon border-end-0"
                  :class="{ 'border border-danger text-danger': invalidUsername }"></span>
                  <input
                    type="email"
                    class="form-control border-start-0" 
                    :class="{ 'border border-danger': invalidUsername }"                   
                    v-model="username"
                    @focus="removeErrors('username')"
                  />
                </div>
                <p v-if="invalidUsername" class="text-danger">
                  {{ invalidUsernameMessage }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text fas fa-key login-icon border-end-0"
                  :class="{ 'border border-danger text-danger': invalidPassword }"></span>
                  <input
                    class="form-control border-start-0"
                    :class="{ 'border border-danger': invalidPassword }"
                    type="password"
                    v-model="password"
                    @focus="removeErrors('password')"
                  />
                </div>
                <p v-if="invalidPassword" class="text-danger">
                  {{ invalidPasswordMessage }}
                </p>
              </div>
              <p v-if="loginError" class="text-danger">
                {{ loginError }}
              </p>
              <p>
                Don't you have an account? Register
                <router-link to="/register">here</router-link>.
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
    const username = ref("panosxatz.1989@gmail.com");
    const password = ref("str@1989");
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
        await store.dispatch("auth/login", {
          email: username.value,
          password: password.value,
        });
        router.push("/");
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

<style scoped>
.login-icon {
  line-height: 1.5;
  background-color: white;
}
</style>