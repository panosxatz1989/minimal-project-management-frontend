<template>
  <div class="columns is-mobile container mx-auto">
    <div class="column" v-for="project in projects" :key="project.id">
      <div class="card has-background-white-ter">
        <header class="card-header">
          <p class="card-header-title">
            {{ project.name }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ project.description }}
          </div>
        </div>
        <footer class="card-footer">
          <router-link to="projects/1" class="card-footer-item"
            >View Details</router-link
          >
        </footer>
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
    };
  },
};
</script>
<style scoped>
.card-content {
  min-height: 100px;
}
</style>