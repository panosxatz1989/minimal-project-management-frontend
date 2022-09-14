import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase";
import useError from "@/components/hooks/error";

const state = {
    profile: {},
    isLoggedIn: false,
};

const actions = {
    async signUp(context, { email, password, username, name }) {
        let newUser = {};
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => userCredential.user)
            .then((data) => (newUser = data))
            .catch((error) => { throw new Error(useError(error.code)) });

        const profile = {
            id: newUser.uid,
            email: newUser.email,
            username,
            name,
        };
        const newProfile = await addDoc(collection(db, "users"), profile);
        profile.uid = newProfile.id;
        context.commit("setProfile", profile);
    },
    async login(context, { email, password }) {
        let loggedUser =  await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => userCredential.user)
            .catch((error) => { throw new Error(useError(error.code))})

        const q = query(collection(db, "users"), where("email", "==", loggedUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            loggedUser = doc.data();
        });
        context.commit("setProfile", loggedUser);
    },
    async logout(context) {
        await signOut(auth);
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
