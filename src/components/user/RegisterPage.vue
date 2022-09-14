<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-6 mx-auto">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Register Form</h2>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label class="label">Name</label>
                <div class="input-group">
                  <span
                    class="
                      input-group-text
                      fa fa-user
                      register-icon
                      border-end-0
                    "
                  ></span>
                  <input
                    type="text"
                    class="form-control border-start-0"
                    v-model="user.name"
                    placeholder="e.g. Nick Coleman"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="label">Email</label>
                <div class="input-group">
                  <span
                    class="
                      input-group-text
                      fa fa-envelope
                      register-icon
                      border-end-0
                    "
                  ></span>
                  <input
                    type="email"
                    class="form-control border-start-0"
                    v-model="user.email"
                    placeholder="example@domain.com"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="label">Password</label>
                <div class="input-group">
                  <span
                    class="
                      input-group-text
                      fas
                      fa-key
                      register-icon
                      border-end-0
                    "
                  ></span>
                  <input
                    type="password"
                    class="form-control border-start-0"
                    v-model="user.password"
                    @focus="removeErrors"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="label">Repeat Password</label>
                <div class="input-group">
                  <span class="input-group-text fas fa-repeat register-icon border-end-0"></span>
                  <input
                    type="password"
                    class="form-control border-start-0"
                    v-model="passwordMatch"
                    @focus="removeErrors"
                    required
                  />
                </div>
              </div>
              <p v-if="registerError" class="text-danger">
                {{ registerError }}
              </p>
              <button class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = reactive({
      email: "",
      password: "",
      name: "",
    });
    const passwordMatch = ref("");
    const errors = ref([]);
    const store = useStore();
    const router = useRouter();
    const registerError = ref("");

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

    async function register() {
      const isValid = validate();
      if (isValid) {
        try {
          await store.dispatch("auth/signUp", {
            email: user.email,
            password: user.password,
            name: user.name,
          });
          router.push("/profile");
        } catch (err) {
          registerError.value = err.message;
        }
      }
    }

    return {
      user,
      passwordMatch,
      errors,
      registerError,
      register,
      removeErrors,
    };
  },
};
</script>

<style scoped>
.register-icon {
  line-height: 1.5;
  background-color: white;
}
</style>
