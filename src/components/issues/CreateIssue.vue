<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="text-center">Create Issue</h2>
            <base-spinner v-if="false"></base-spinner>
            <form @submit.prevent="createIssue">
              <div class="row">
                <div class="mb-3">
                  <label class="form-label"
                    >Title<span class="text-danger">&nbsp;*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="selectedTitle"
<<<<<<< HEAD
=======
                    required
>>>>>>> 954ee40ce8315aa8dc07c0afda1288ec8bede193
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label class="form-label"
                    >Description<span class="text-danger">&nbsp;*</span></label
                  >
                  <textarea
                    cols="30"
                    rows="5"
                    class="form-control"
                    v-model="selectedDescription"
                    required
                  >
                  </textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-4 col-sm-12 mb-3">
                  <label class="form-label"
                    >Priority<span class="text-danger">&nbsp;*</span></label
                  >
                  <select class="form-select" v-model="selectedPriority">
                    <option value="-1">- Choose -</option>
                    <option
                      class="font-monospace"
                      v-for="priority in priorities"
                      :key="priority.id"
                      :value="priority.id"
                    >
                      {{ priority.name }}
                    </option>
                  </select>
                </div>
                <div class="col-lg-4 col-sm-12 mb-3">
                  <label class="form-label"
                    >Issue Type<span class="text-danger">&nbsp;*</span></label
                  >
                  <select class="form-select" v-model="selectedIssueType">
                    <option value="-1">- Choose -</option>
                    <option
                      class="font-monospace"
                      v-for="issueType in issueTypes"
                      :key="issueType.id"
                      :value="issueType.id"
                    >
                      {{ issueType.name }}
                    </option>
                  </select>
                </div>
                <div class="col-lg-4 col-sm-12 mb-3">
                  <label class="form-label"
                    >Status<span class="text-danger">&nbsp;*</span></label
                  >
                  <select class="form-select" v-model="selectedStatus">
                    <option value="-1">- Choose -</option>
                    <option
                      class="font-monospace"
                      v-for="status in statuses"
                      :key="status.id"
                      :value="status.id"
                    >
                      {{ status.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="mb-3">
                  <label class="form-label"
                    >Assign To<span class="text-danger">&nbsp;*</span></label
                  >
                  <select class="form-select" v-model="selectedUser">
                    <option value="-1">- Choose -</option>
                    <option
                      class="font-monospace"
                      v-for="user in users"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.name }} - {{ user.roles }}
                    </option>
                  </select>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-lg-12">
                  <button class="btn btn-success">Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { getDocs, query, orderBy, addDoc } from "firebase/firestore";
import { ref } from "vue";
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import useRef from "@/hooks/use-refs";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const priorities = ref([]);
    const issueTypes = ref([]);
    const statuses = ref([]);
    const users = ref([]);

    const selectedTitle = ref("");
    const selectedDescription = ref("");
    const selectedPriority = ref(-1);
    const selectedIssueType = ref(-1);
    const selectedStatus = ref(-1);
    const selectedUser = ref(-1);

    onMounted(async () => {
      // load priorities
      let q = query(useRef("priorities"), orderBy("order", "asc"));
      let querySnapshot = await getDocs(q);
      let fsPriorities = [];
      querySnapshot.forEach((doc) => {
        const priority = {
          id: doc.id,
          name: doc.data().name,
        };
        fsPriorities.push(priority);
      });
      priorities.value = fsPriorities;

      // load issue types
      querySnapshot = await getDocs(useRef("issueTypes"));
      let fsIssueTypes = [];
      querySnapshot.forEach((doc) => {
        const issueType = {
          id: doc.id,
          name: doc.data().name,
        };
        fsIssueTypes.push(issueType);
      });
      issueTypes.value = fsIssueTypes;

      // load statuses
      querySnapshot = await getDocs(useRef("statuses"));
      let fsStatuses = [];
      querySnapshot.forEach((doc) => {
        const status = {
          id: doc.id,
          name: doc.data().name,
        };
        if (doc.data().default) {
          selectedStatus.value = doc.id;
        }

        fsStatuses.push(status);
      });
      statuses.value = fsStatuses;

      // load users
      querySnapshot = await getDocs(useRef("users"));
      let fsUsers = [];
      querySnapshot.forEach(async (el) => {
        const user = {
          id: el.id,
          name: el.data().name,
          roles: el.data().roles,
        };        
        fsUsers.push(user);
      });
      users.value = fsUsers;
    });

    async function createIssue() {
      await addDoc(useRef("issues"), {
        projectId: route.params.projectId,
        title: selectedTitle.value,
        description: selectedDescription.value,
        priority: selectedPriority.value,
        issueType: selectedIssueType.value,
        status: selectedStatus.value,
        assignedTo: selectedUser.value,
        devFix: false,
        prodFix: false,
        createdAt: Date.now(),
      });

      router.push("/projects/" + route.params.projectId);
    }

    return {
      priorities,
      issueTypes,
      users,
      statuses,
      selectedTitle,
      selectedDescription,
      selectedPriority,
      selectedIssueType,
      selectedStatus,
      selectedUser,
      createIssue,
    };
  },
  components: {
    BaseSpinner,
  },
};
</script>

<style></style>
