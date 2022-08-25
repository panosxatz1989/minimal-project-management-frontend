import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { _ } from "@/db";

const state = {
    user: {},
    isLoggedIn: false
}

const actions = {
    async login(context) {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
        const { displayName, email, uid } = result.user;
        const user = {
            displayName,
            email,
            uid,
            created_at: null
        };
        console.log(user);
        context.commit('login', user);


    },
    async logout(context) {
        const auth = getAuth();
        auth.signOut();
        context.commit('logout');
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;
    },
    logout(state) {
        state.user = {};
        state.isLoggedIn = false;
    }
}

const getters = {
    isLoggedIn(state) {
        return state.isLoggedIn;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}