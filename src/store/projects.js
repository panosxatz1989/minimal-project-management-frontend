import firebase from "@/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase);

const state = {
    projects: []
}

const actions = {
    async loadProjects(context) {
        const projects = doc(db, 'projects/pLIYu6R9f3UjA3Yao4G8');
        context.state.projects.push((await getDoc(projects)).data());
    }
};

const mutations = {};

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