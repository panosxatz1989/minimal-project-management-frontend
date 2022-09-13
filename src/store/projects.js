
const state = {
    projects: [],
};

const actions = {
    async loadProjects() {
    },    
};

const mutations = {
    fillProjects(state, projects) {
        state.projects.push(projects);
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
