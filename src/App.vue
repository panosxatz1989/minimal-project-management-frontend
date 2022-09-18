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
<style>
.btn-min-width {
  min-width: 100px;
}

.text-justify {
  text-align: justify;
}
</style>