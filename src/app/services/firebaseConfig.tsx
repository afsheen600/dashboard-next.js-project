// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFBA_AqA16zXowhKG46qLMPNWToiSavxo",
  authDomain: "dashboard-in-next-js-c1f19.firebaseapp.com",
  projectId: "dashboard-in-next-js-c1f19",
  storageBucket: "dashboard-in-next-js-c1f19.firebasestorage.app",
  messagingSenderId: "598257709830",
  appId: "1:598257709830:web:d28b06784589f481e9a487",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
