<template>
    <h2>List project</h2>
    <p>{{ data }}</p>
</template>

<script>
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";

export default {
    setup() {
        const store = useStore();
        onBeforeMount(() => {
            store.dispatch("projects/loadProjects");
        });
        const data = computed(() => store.getters.getProjects);
        return {
            data
        };
    },
};
</script>

<style></style>