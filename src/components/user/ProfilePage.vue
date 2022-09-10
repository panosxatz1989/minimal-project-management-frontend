<template>
  <h2>User Edit Profile</h2>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const user = store.getters('auth/getProfile');
    console.log(user);
  },
};
</script>

<style>
</style>