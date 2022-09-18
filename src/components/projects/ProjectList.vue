<template>
  <div class="container mt-5">
    <base-spinner v-if="showSpinner"></base-spinner>
    <div class="row">
      <div class="col-lg-2">
        <button
          class="btn btn-warning text-white fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Project
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 g-3" v-for="project in projects" :key="project.id">
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
    <base-modal @addProject="addProject" :hideModal="hideModal">
      <template v-slot:header>Add New Project Form</template>
    </base-modal>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import BaseModal from "@/components/base/BaseModal.vue";

export default {
  setup() {
    const projects = ref([]);
    const hideModal = ref(false);
    const showSpinner = ref(true);

    async function addProject(data) {
      await addDoc(collection(db, "projects"), {
        name: data.name,
        description: data.description,
      });
      hideModal.value = true;
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
      showSpinner.value = false;
    });

    return {
      projects,
      showSpinner,
      addProject,
      hideModal,
    };
  },
  components: {
    BaseModal,
  },
};
</script>
<style scoped>
.card-text {
  min-height: 100px;
}
</style>
