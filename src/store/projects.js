import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

const state = {
    projects: [],
};

const actions = {
    async loadProjects({ commit }) {
        const fsProjects = [];
        onSnapshot(collection(db, "projects"), (querySnapshot) => {            
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
        })

        commit("fillProjects", fsProjects);
    },
};

const mutations = {
    fillProjects(state, projects) {
        state.projects = projects;
    },
};

const getters = {
    getProjects(state) {
        return state.projects;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
