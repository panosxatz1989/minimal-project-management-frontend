import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const state = {
    profile: {},
    isLoggedIn: false,
};

const actions = {
    async signUp(context, { email, password, username, name }) {
        const auth = getAuth();
        let newUser = {};
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => userCredential.user)
            .then((data) => (newUser = data))
            .catch((error) => console.log(error.code));

        const profile = {
            id: newUser.uid,
            email: newUser.email,
            username,
            name,
        };
        addDoc(collection(db, "users"), profile);
        context.commit("setProfile", profile);
    },
    async login(context, { email, password }) {
        const auth = getAuth();
        let loggedUser = {};
        let error = "";
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => userCredential.user)
            .then((data) => (loggedUser = data))
            .catch((returnedError) => {
                error = returnedError;
            });
        if (error) {
            return;
        }
        context.commit("setProfile", loggedUser);
    },
    async logout(context) {
        const auth = getAuth();
        await signOut(auth);
        context.commit("logout");
    },
};

const mutations = {
    setProfile(state, user) {
        console.log(user);
        state.profile = user;
        state.isLoggedIn = true;
    },
    logout(state) {
        state.profile = {};
        state.isLoggedIn = false;
    },
};

const getters = {
    isLoggedIn(state) {
        return state.isLoggedIn;
    },
    getProfile(state) {
        return state.profile;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
