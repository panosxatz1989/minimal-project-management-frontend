<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">{{ project.name }}</h2>
            <label class="form-label">Description</label>
            <textarea
              cols="30"
              rows="5"
              class="form-control"
              v-model="project.description"
              :readonly="!showTextarea"
            >
            </textarea>
            <hr />
            <button class="btn btn-danger float-end" @click="deleteProject">
              Delete
            </button>
          </div>
        </div>
        <router-link :to="{ name: 'projects' }" class="btn btn-secondary mt-3"
          >Back</router-link
        >
      </div>
      <div class="col-lg-9">
        <issue-list></issue-list>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import IssueList from "@/components/issues/IssueList.vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const projectId = route.params.projectId;
    const projectRef = doc(db, "projects", projectId);
    let project = reactive({});
    const showTextarea = ref(false);

    function makeDescriptionEditable() {
      showTextarea.value = !showTextarea.value;
    }

    onMounted(async () => {
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        Object.assign(project, projectSnap.data());
      }
    });

    function deleteProject() {
      if (confirm("Are you sure you want to delete the project")) {
        deleteDoc(projectRef);
        router.push("/projects");
      }
    }

    return {
      project,
      showTextarea,
      deleteProject,
      makeDescriptionEditable,
    };
  },
  components: {
    IssueList,
  },
};
</script>
