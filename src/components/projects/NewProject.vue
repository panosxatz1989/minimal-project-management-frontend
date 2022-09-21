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
    <div class="mb-3">
      <label class="form-label">Project Manager</label>
      <select class="form-select" v-model="selectedProjectManager" required>
        <option value="">- Choose -</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary float-end">
      Create Project
    </button>
  </form>
</template>
<script>
import { onMounted, ref } from "vue";
import { addDoc, query, where, getDocs } from "firebase/firestore";
import useRef from "@/components/hooks/use-refs";

export default {
  setup() {
    const projectName = ref("");
    const projectDescription = ref("");
    const selectedProjectManager = ref("");
    const users = ref([]);

    onMounted(async () => {
      // only managers
      let q = query(useRef("users"), where("roles", "array-contains", "vjgi8e1ZbBjymull8tEZ"));
      const querySnapshot = await getDocs(q);
      let fsPmUsers = [];
      querySnapshot.forEach(doc => {
        const user = {
          id: doc.id,
          name: doc.data().name
        }
        fsPmUsers.push(user);
      });
      users.value = fsPmUsers;
    })

    async function create() {
      if (projectName.value === "") return;
      await addDoc(useRef("projects"), {
        name: projectName.value,
        description: projectDescription.value,
        projectManager: selectedProjectManager.value
      });

      document.getElementsByClassName("btn-close")[0].click();
    }

    return {
      projectName,
      projectDescription,
      selectedProjectManager,
      users,
      create,
    };
  },
};
</script>
