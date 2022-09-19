<template>
  <form @submit.prevent="create">
    <div class="mb-3">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="projectName" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea
        class="form-control"
        cols="30"
        rows="5"
        v-model="projectDescription"
      ></textarea>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";

export default {
    setup() {
        const projectName = ref('');
        const projectDescription = ref('');

        return {
            projectName,
            projectDescription
        }
    }
}
</script>
