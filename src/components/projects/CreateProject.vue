<template>
  <div class="row">
    <div class="col-lg-2 g-3">
      <button
        class="btn btn-warning text-white fw-bold"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Project
      </button>
    </div>
  </div>
  <base-modal @addProject="addProject">
    <template v-slot:header>Add New Project</template>
    <template v-slot:body>
      <new-project></new-project>
    </template>
  </base-modal>
</template>

<script>
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import BaseModal from "@/components/base/BaseModal.vue";
import NewProject from "@/components/projects/NewProject.vue";

export default {
  setup() {
    async function addProject(data) {
      if (data.name === "") return;
      await addDoc(collection(db, "projects"), {
        name: data.name,
        description: data.description,
      });
    }
    return {
      addProject,
    };
  },
  components: {
    BaseModal,
    NewProject,
  },
};
</script>

<style></style>
