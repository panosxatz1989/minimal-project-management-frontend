<template>
    <form @submit.prevent="register">
        <div class="col-lg-6 mx-auto">
            <div class="mb-3">
                <label class="label">Username</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="user.username"
                    placeholder="e.g. nickcoleman1989"
                />
            </div>
            <div class="mb-3">
                <label class="label">Email</label>
                <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    placeholder="example@domain.com"
                />
            </div>
            <div class="mb-3">
                <label class="label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    @focus="removeErrors"
                />
            </div>
            <div class="mb-3">
                <label class="label">Repeat Password</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="passwordMatch"
                    @focus="removeErrors"
                />
            </div>
            <div class="mb-3">
                <label class="label">Name</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="user.name"
                    placeholder="e.g. Nick Coleman"
                />
            </div>
            <article
                class="message is-danger"
                v-for="error in errors"
                :key="error"
            >
                <div class="message-body">
                    {{ error }}
                </div>
            </article>
            <div class="mb-3">
                <button class="btn btn-primary">Register</button>
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

<style></style>
