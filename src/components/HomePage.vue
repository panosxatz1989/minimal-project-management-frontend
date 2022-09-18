<template>
  <div class="container mt-5">
    <button @click="toggle" class="btn btn-secondary mb-2">Toggle Different View</button>
    <div class="row" v-if="showInColumns">
      <div class="col border-end">
        <h4 class="font-monospace text-decoration-underline">
          Purpose of the app
        </h4>
        <p class="font-monospace text-justify">
          This app was created by me (Panagiotis Chatziantoniou) for practice.
          It's my first Vue project so go easy on me! The use of this app is for
          demo purposes only. The initial problem was that in our organization
          the issue management procedure was increasingly abandoned because of
          the tool we used, which provided a poor UX and was quite bloated. So I
          decided to create one tool that contains only the features we really
          need with (IMHO) a better UX.
        </p>
        <h4 class="font-monospace text-decoration-underline">
          How the app works
        </h4>
        <p class="font-monospace text-justify">
          First of all, it is (for the moment) designed to be used only by one
          team. In order to use the app you must register with a valid email and
          a password. Once you register, you can add your role you possess in
          the team (Manager, Developer, Tester etc). Next step is to add all the
          projects you want to manage with this app and assign roles to the
          other users too. Each project has one Project Manager, one or many
          Developers and Testers. After creating your first project feel free to
          add tasks or issues to the project. Those can be assigned to
          Developers for fix or implementation. Once the developer finishes the
          task it automatically becomes a task for the Tester(s) to check. If we
          pass that step too, then the Project Manager role can close it for
          good. If something goes wrong in the proccess it can be easily
          reassigned to the developer again.
        </p>
      </div>
      <div class="col">
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
          This app was created by me (Panagiotis Chatziantoniou) for practice.
          It's my first Vue project so go easy on me! The use of this app is for
          demo purposes only. The initial problem was that in our organization
          the issue management procedure was increasingly abandoned because of
          the tool we used, which provided a poor UX and was quite bloated. So I
          decided to create one tool that contains only the features we really
          need with (IMHO) a better UX.
        </p>
        <h4 class="font-monospace text-decoration-underline">
          How the app works
        </h4>
        <p class="font-monospace text-justify">
          First of all, it is (for the moment) designed to be used only by one
          team. In order to use the app you must register with a valid email and
          a password. Once you register, you can add your role you possess in
          the team (Manager, Developer, Tester etc). Next step is to add all the
          projects you want to manage with this app and assign roles to the
          other users too. Each project has one Project Manager, one or many
          Developers and Testers. After creating your first project feel free to
          add tasks or issues to the project. Those can be assigned to
          Developers for fix or implementation. Once the developer finishes the
          task it automatically becomes a task for the Tester(s) to check. If we
          pass that step too, then the Project Manager role can close it for
          good. If something goes wrong in the proccess it can be easily
          reassigned to the developer again.
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
import { ref } from "vue";

export default {
  setup() {
    const showInColumns = ref(true);
    const tools = ref([
      "VueJS v3.2.13 (Composition API, Vue-router, Vuex)",
      "Bootstrap v5.2.1",
      "Firebase Authentication",
      "Firestore Database",
      "Firebase Storage (not implemented yet)",
      "Visual Studio Code",
    ]);

    const toggle = () => showInColumns.value = !showInColumns.value;

    return {
      showInColumns,
      tools,
      toggle
    };
  },
};
</script>