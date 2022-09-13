<template>
  <TheNavbar />
  <router-view></router-view>
</template>

<script>
import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
</script>