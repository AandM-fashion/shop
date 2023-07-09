


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { collection, getDocs } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyDLy8P9_XTngBJlalWtG8N1quJSGmE8wvQ",
  authDomain: "aandm-database-b891c.firebaseapp.com",
  projectId: "aandm-database-b891c",
  storageBucket: "aandm-database-b891c.appspot.com",
  messagingSenderId: "628585045570",
  appId: "1:628585045570:web:8db2c5889b4f90bcfb17db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;