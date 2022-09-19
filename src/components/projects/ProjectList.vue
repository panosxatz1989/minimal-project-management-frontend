<template>
    <div class="container mt-5">
        <base-spinner v-if="showSpinner"></base-spinner>
        <create-project></create-project>
        <div class="row" v-if="projects.length === 0">
            <div class="col-lg-12 g-3">
                <div class="card">
                    <div class="card-body">There are no projects.</div>
                </div>
            </div>
        </div>
        <div class="row" v-if="projects.length > 0">
            <div
                class="col-lg-6 g-3"
                v-for="project in projects"
                :key="project.id"
            >
                <div class="card">
                    <div class="card-header fw-bold">{{ project.name }}</div>
                    <div class="card-body">
                        <p class="card-text">
                            {{ project.description }}
                        </p>
                        <router-link
                            class="btn btn-info text-white fw-bold"
                            :to="{
                                name: 'projectDetails',
                                params: {
                                    projectId: project.id,
                                },
                            }"
                            >Details</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import CreateProject from "@/components/projects/CreateProject.vue";

export default {
    setup() {
        const projects = ref([]);
        const showSpinner = ref(true);

        onMounted(async () => {
            onSnapshot(collection(db, "projects"), (querySnapshot) => {
                const fsProjects = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const project = {
                        id: doc.id,
                        name: data.name,
                        description: data.description,
                        manager: data.manager,
                        developers: data.developers,
                    };
                    fsProjects.push(project);
                });
                projects.value = fsProjects;
            });
            showSpinner.value = false;
        });

        return {
            projects,
            showSpinner,
        };
    },
    components: {
        BaseSpinner,
        CreateProject,
    },
};
</script>
<style scoped>
.card-text {
    min-height: 100px;
}
</style>
