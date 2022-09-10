import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword /*, signInWithPopup, GoogleAuthProvider*/
} from "firebase/auth";
//import { db, collection, addDoc } from '@/db';
//import { _ } from "@/db";
import firebase from "@/firebase";
import {
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore";
const db = getFirestore(firebase);

const state = {
    user: {},
    isLoggedIn: false
}

const actions = {
    async signUp(context, {
        email,
        password
    }) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user);
            }).catch(error => console.log(error.code));
        context.commit('setUser', {
            email,
            password
        });
    },
    async login(context, {
        email,
        password
    }) {
        // const provider = new GoogleAuthProvider();
        // const auth = getAuth();
        // const result = await signInWithPopup(auth, provider);

        // const { displayName, email, uid } = result.user;
        // const user = {
        //     name: displayName,
        //     email,
        //     uid,
        //     created_at: Math.floor(Date.now() / 1000)
        // };
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user);
            }).catch(error => console.log(error.code));
        context.commit('setUser', {
            email,
            password
        });
        const newUser = await addDoc(collection(db, 'users'), {
            email,
            password
        });
        console.log("Document written with ID: ", newUser.id);
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