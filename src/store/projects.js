import firebase from "@/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase);

const state = {
    projects: []
}

const actions = {
    async loadProjects(context) {
        const projectsRef = doc(db, 'projects/pLIYu6R9f3UjA3Yao4G8');
        const projects = (await getDoc(projectsRef)).data();
        context.commit('fillProjects', projects);
    }
};

const mutations = {
    fillProjects(state, projects) {
        state.projects.push(projects);
    }
};

const getters = {
    getProjects(state) {
        return state.projects;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}