import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs,query, where ,addDoc,updateDoc,deleteDoc, doc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VITE_GOOGLE_API_KEY, // Securely stored in .env
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export { auth , db, getDocs, collection, query, where, addDoc, updateDoc, deleteDoc, doc}