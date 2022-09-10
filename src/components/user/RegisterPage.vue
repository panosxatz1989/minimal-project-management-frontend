<template>
  <form @submit.prevent="register">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          type="text"
          class="input"
          v-model="user.username"
          placeholder="e.g. nickcoleman1989"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          type="email"
          class="input"
          v-model="user.email"
          placeholder="example@domain.com"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          type="password"
          class="input"
          v-model="user.password"
          @focus="removeErrors"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Repeat Password</label>
      <div class="control">
        <input
          type="password"
          class="input"
          v-model="passwordMatch"
          @focus="removeErrors"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          type="text"
          class="input"
          v-model="user.name"
          placeholder="e.g. Nick Coleman"
        />
      </div>
    </div>
    <article class="message is-danger" v-for="error in errors" :key="error">
      <div class="message-body">
        {{ error }}
      </div>
    </article>
    <div class="field">
      <div class="control">
        <button class="button is-primary">Register</button>
      </div>
    </div>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const user = reactive({
      username: "",
      email: "",
      password: "",
      name: "",
    });
    const passwordMatch = ref("");
    const errors = ref([]);
    const store = useStore();

    function removeErrors() {
      errors.value = [];
    }

    function validate() {
      removeErrors();
      if (user.password !== passwordMatch.value) {
        errors.value.push("Password fields do not match");
      }

      if (errors.value.length > 0) {
        return false;
      }

      return true;
    }

    function register() {
      const isValid = validate();
      if (isValid) {
        store.dispatch("auth/signUp", {
          email: user.email,
          password: user.password,
          name: user.name,
          username: user.username,
        });
      }
    }

    return {
      user,
      passwordMatch,
      errors,
      register,
      removeErrors,
    };
  },
};
</script>

<style>
</style>