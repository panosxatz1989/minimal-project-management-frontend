import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import firebase from "@/firebase";
import { useRouter } from "vue-router";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore(firebase);

const state = {
    profile: {},
    isLoggedIn: false,
};

const actions = {
    async signUp(context, { email, password, username, name }) {
        const auth = getAuth();
        let newUser = {};
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => userCredential.user)
            .then(data => newUser = data)
            .catch(error => console.log(error.code));

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
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => userCredential.user)
            .then(data => loggedUser = data)
            .catch(error => console.log(error.code));
        
        context.commit("setUser", loggedUser);
    },
    async logout(context) {
        const auth = getAuth();
        signOut(auth).then(useRouter.push('/'));
        context.commit("logout");
    },
};

const mutations = {
    setProfile(state, user) {
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
