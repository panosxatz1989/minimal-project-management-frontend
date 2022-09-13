<template>
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
                        id="dismiss-button"
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
</template>

<script>
import { ref } from "vue";

export default {
    emits: ["addProject"],
    props: ["hideModal"],
    setup(props, context) {
        const projectName = ref("");
        const projectDescription = ref("");

        function addProject() {
            context.emit("addProject", {
                name: projectName.value,
                description: projectDescription.value,
            });
        }

        return {
            addProject,
            projectName,
            projectDescription,
        };
    },
};
</script>
