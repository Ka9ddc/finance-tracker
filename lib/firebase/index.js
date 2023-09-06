// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUTQ2NzsI4l3SguP-S_rohD__VH_i3drI",
  authDomain: "finance-tracker-e96cb.firebaseapp.com",
  projectId: "finance-tracker-e96cb",
  storageBucket: "finance-tracker-e96cb.appspot.com",
  messagingSenderId: "447956433899",
  appId: "1:447956433899:web:4e3cc38e0aee5fde5977ae",
  measurementId: "G-WWS6VX456D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {app, db, auth}