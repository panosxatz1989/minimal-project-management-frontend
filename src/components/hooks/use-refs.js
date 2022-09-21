import { db } from "@/firebase";
import { collection } from "firebase/firestore";

export default (fsCollection) => collection(db, fsCollection);