import app from './firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(app);

export default { db, collection, addDoc };