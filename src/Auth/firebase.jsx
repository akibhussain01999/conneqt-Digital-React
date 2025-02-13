import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChil4T3G-Zy0ZpNQKVzPychMRcVvRIJY0",
  authDomain: "insurance-door.firebaseapp.com",
  projectId: "insurance-door",
  storageBucket: "insurance-door.appspot.com",
  messagingSenderId: "31699270785",
  appId: "1:31699270785:web:9c5b4663da66ff95a8a180",
  measurementId: "G-JRPDX211Z0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
