import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCccBOGbycqTH4EOfq37quBya4dn_V7XO4",
  authDomain: "expoproject-ae6d0.firebaseapp.com",
  databaseURL: "https://expoproject-ae6d0-default-rtdb.firebaseio.com",
  projectId: "expoproject-ae6d0",
  storageBucket: "expoproject-ae6d0.appspot.com",
  messagingSenderId: "264670336860",
  appId: "1:264670336860:web:70c6261931d3f870631399",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
