import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgX9z4RGY14FunYf0hDQ91ZITMzQ4OkP8",
    authDomain: "internal-project-management.firebaseapp.com",
    projectId: "internal-project-management",
    storageBucket: "internal-project-management.appspot.com",
    messagingSenderId: "122981040058",
    appId: "1:122981040058:web:e6b736370934386f10e783"
};


//export default initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }