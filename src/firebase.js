import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase config when available
const firebaseConfig = {
  apiKey: "dummy-api-key",
  authDomain: "dummy-domain.firebaseapp.com",
  projectId: "dummy-project-id",
  storageBucket: "dummy-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
