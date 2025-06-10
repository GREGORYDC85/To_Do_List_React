// Import de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYxtCjSfyr06oy8VqxGjMHWdbtNHEzhVo",
  authDomain: "ma-to-do-list.firebaseapp.com",
  projectId: "ma-to-do-list",
  storageBucket: "ma-to-do-list.appspot.com",
  messagingSenderId: "344639709946",
  appId: "1:344639709946:web:abc123xyz456",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Exportation de l'authentification et de la base de données
export const auth = getAuth(app);
export const db = getFirestore(app);
