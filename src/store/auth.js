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

        const { displayName, email, uid } = result.user;
        const user = {
            name: displayName,
            email,
            uid,
            created_at: Math.floor(Date.now() / 1000)
        };
        console.log(user);
        context.commit('setUser', user);


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
    },
    getUser(state) {
        return state.user;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}