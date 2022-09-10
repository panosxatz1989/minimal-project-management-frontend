<template>
    <h2>List project</h2>
</template>

<script>
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";

export default {
    setup() {
        const store = useStore();
        onBeforeMount(async () => {
            await store.dispatch("projects/loadProjects");
        });
        const data = computed(() => store.getters.getProjects);
        console.log(data);
        return {
            data
        };
    },
};
</script>

<style></style>