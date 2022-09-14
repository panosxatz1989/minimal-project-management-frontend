<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">{{ project.name }}</h2>
          </div>
          <div class="card-body">
            <p class="text-justify">
              <i class="fa fa-user"></i>
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default {
  setup() {
    const route = useRoute();
    const projectId = route.params.projectId;
    const projectRef = doc(db, "projects", projectId);
    let project = reactive({});

    onMounted(async () => {
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        Object.assign(project, projectSnap.data());        
      }
    });

    function deleteProject() {
      deleteDoc(projectRef);
    }

    return {
      project,
      deleteProject
    };
  },
};
</script>