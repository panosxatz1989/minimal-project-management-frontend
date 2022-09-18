<template>
  <div class="container mt-5">
    <base-spinner v-if="showSpinner"></base-spinner>
    <div class="row" v-if="!showSpinner">
      <div class="col-lg-2">
        <button @click="toggle" class="btn btn-secondary mb-2">
          Toggle Different View
        </button>
      </div>
    </div>
    <div class="row" v-if="showInColumns && !showSpinner">
      <div class="col-lg-6 col-sm-12 border-end">
        <h4 class="font-monospace text-decoration-underline">
          Purpose of the app
        </h4>
        <p class="font-monospace text-justify">
          {{ purposeText }}
        </p>
        <h4 class="font-monospace text-decoration-underline">
          How the app works
        </h4>
        <p class="font-monospace text-justify">
          {{ workFlowText }}
        </p>
      </div>
      <div class="col-lg-6 col-sm-12">
        <h4 class="font-monospace text-decoration-underline">
          Tools &amp; Libraries used
        </h4>
        <ul class="list-group">
          <li
            v-for="tool in tools"
            :key="tool"
            class="list-group-item font-monospace"
          >
            {{ tool }}
          </li>
        </ul>
        <a
          href="https://github.com/panosxatz1989/internal-project-management"
          class="text-white btn btn-info mt-2"
          target="_blank"
        >
          Explore project in GitHub <i class="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
    <div class="row" v-if="!showInColumns">
      <div class="col mx-auto">
        <h4 class="font-monospace text-decoration-underline">
          Purpose of the app
        </h4>
        <p class="font-monospace text-justify">
          {{ purposeText }}
        </p>
        <h4 class="font-monospace text-decoration-underline">
          How the app works
        </h4>
        <p class="font-monospace text-justify">
          {{ workFlowText }}
        </p>
        <h4 class="font-monospace text-decoration-underline">
          Tools &amp; Libraries used
        </h4>
        <ul class="list-group">
          <li
            v-for="tool in tools"
            :key="tool"
            class="list-group-item font-monospace"
          >
            {{ tool }}
          </li>
        </ul>
        <a
          href="https://github.com/panosxatz1989/internal-project-management"
          class="text-white btn btn-info mt-2"
          target="_blank"
        >
          Explore project in GitHub <i class="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import BaseSpinner from "@/components/base/BaseSpinner.vue";

export default {
  components: {
    BaseSpinner,
  },
  setup() {
    const showInColumns = ref(true);
    const showSpinner = ref(true);
    const tools = ref([]);
    const purposeText = ref("");
    const workFlowText = ref("");

    const toggle = () => (showInColumns.value = !showInColumns.value);

    onMounted(async () => {
      const docRef = doc(db, "config", "MTzuHLRdks5OHnLXk0nM");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const snapData = docSnap.data();
        purposeText.value = snapData.purposeText;
        workFlowText.value = snapData.workFlowText;
        tools.value = snapData.tools;
      }
      showSpinner.value = false;
    });

    return {
      purposeText,
      workFlowText,
      showInColumns,
      showSpinner,
      tools,
      toggle,
    };
  },
};
</script>