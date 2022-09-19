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
            <slot name="header">Default Title</slot>
          </h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body">No Content Provided</slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            data-bs-dismiss="modal"
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
