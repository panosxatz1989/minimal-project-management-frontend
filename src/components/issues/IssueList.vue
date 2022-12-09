<template>
  <div class="card">
    <div class="card-header">
      <h2 class="text-center">Issues</h2>
      <router-link
        class="btn btn-warning text-white"
        :to="{
          name: 'projectIssuesAddition',
        }"
        >Create Issue</router-link
      >
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-lg-12" v-if="issueList.length === 0">
          There are no issues yet.
        </div>
        <div class="col-lg-12" v-if="issueList.length > 0">
          <div class="card mb-3" v-for="issue in issueList" :key="issue.id">
            <div class="card-body">
              <h5 class="card-title">{{ issue.title }} <small>({{ issue.createdAt }})</small></h5>
              <p class="card-text">{{ issue.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="issueList.length > 0">
        <div class="col-lg-12">
          <nav aria-label="Page navigation example">
            <ul class="pagination mb-0 justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#">Previous</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useRef from "@/hooks/use-refs";
import useDate from "@/hooks/use-date";
import { onSnapshot } from "@firebase/firestore";

export default {
  setup() {
    const issueList = ref([]);
    const showSpinner = ref(true);

    onMounted(async () => {
      onSnapshot(useRef("issues"), (querySnapshot) => {
        const fsIssues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const issue = {
            id: doc.id,
            title: data.title,
            description: data.description,
            assignedTo: data.assignedTo,
            createdAt: useDate(data.createdAt),
          };
          fsIssues.push(issue);
        });
        issueList.value = fsIssues;
      });
      showSpinner.value = false;
    });

    return {
      issueList,
    };
  },
};
</script>