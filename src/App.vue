<template>
  <TheNavbar />
  <router-view class="main container"></router-view>
</template>

<script>
import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
</script>


<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
