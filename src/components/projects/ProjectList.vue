<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-2">
                <button
                    class="btn btn-warning text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Add Project
                </button>
            </div>
        </div>
        <div class="row">
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
                            class="btn btn-info text-white"
                            to="/projects"
                            >Details</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Modal title
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="projectName"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea
                                class="form-control"
                                cols="30"
                                rows="10"
                                v-model="projectDescription"
                            ></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="addProject"
                        >
                            Save changes
                        </button>
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

export default {
    setup() {
        const projects = ref([]);
        const projectName = ref("");
        const projectDescription = ref("");
        function addProject() {
            console.log(projectName.value, projectDescription.value);
        }

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
        });

        return {
            projects,
            projectName,
            projectDescription,
            addProject,
        };
    },
};
</script>
<style scoped>
.card-text {
    min-height: 100px;
}
</style>
