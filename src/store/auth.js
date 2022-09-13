import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
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
            .catch((error) => {
                const code = error.code
                switch (code) {
                    case 'auth/email-already-in-use':
                        throw new Error('Email already taken')
                    case 'auth/weak-password':
                        throw new Error('Password is weak')
                }
                throw new Error(code)
            });

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
        const auth = getAuth();
        let loggedUser = {};
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => userCredential.user)
            .then((data) => (loggedUser = data))
            .catch((error) => {
                const code = error.code
                switch (code) {
                    case 'auth/wrong-password':
                        throw new Error('Invalid credentials provided.')
                    case 'auth/too-many-requests':
                        throw new Error('Too many login requests attempted. Try again later.')
                }                
            })

        const q = query(
            collection(db, "users"),
            where("email", "==", loggedUser.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            loggedUser = doc.data();
        });
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
