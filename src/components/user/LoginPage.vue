<template>
    <form @submit.prevent="login">
        <div class="col-lg-6 mx-auto">
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
            <p>
                Don't you have an account? Register
                <router-link to="/register">here</router-link>
            </p>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </div>
    </form>
    <!-- <form @submit.prevent="login">
      s
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
    </form> -->
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    setup() {
        const username = ref("panosxatzakos.1989@gmail.com");
        const password = ref("");
        const invalidUsername = ref(false);
        const invalidPassword = ref(false);
        const invalidUsernameMessage = ref("");
        const invalidPasswordMessage = ref("");

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

        function login() {
            if (username.value === "") {
                invalidUsernameMessage.value = "Username cannot be empty";
                invalidUsername.value = true;
            }

            if (password.value === "") {
                invalidPasswordMessage.value = "Password cannot be empty";
                invalidPassword.value = true;
            }

            store
                .dispatch("auth/login", {
                    email: username.value,
                    password: password.value,
                })
                .then(router.push("/projects"));
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

<style></style>
